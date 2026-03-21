import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dns from 'dns';
import { promisify } from 'util';

const resolveMx = promisify(dns.resolveMx);
const app = express();

app.use(cors());
app.use(express.json());

// Google OAuth2 Nodemailer Setup
// User needs to provide their Gmail address and a Refresh Token
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: 'YOUR_GMAIL_ADDRESS@gmail.com',
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: 'YOUR_REFRESH_TOKEN',
  }
});

// Email validation helper using DNS MX records
async function isEmailValid(email) {
  const domain = email.split('@')[1];
  if (!domain) return false;
  
  try {
    const records = await resolveMx(domain);
    return records && records.length > 0;
  } catch (error) {
    return false;
  }
}

app.post('/api/contact', async (req, res) => {
  const { name, email, business, version, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ success: false, error: 'Email and message are required.' });
  }

  // 1. Validate Email Domain
  const validDomain = await isEmailValid(email);
  if (!validDomain) {
    return res.status(400).json({ success: false, error: 'Invalid email domain. Cannot find mail server.' });
  }

  // 2. Send Email
  try {
    const mailOptions = {
      from: 'YOUR_GMAIL_ADDRESS@gmail.com', // Must match 'user' above
      to: 'YOUR_GMAIL_ADDRESS@gmail.com',   // Send to yourself
      subject: `New Contact from ${name} - Cortex AI`,
      text: `
Name: ${name}
Email: ${email}
Business: ${business}
Version Interest: ${version}

Message:
${message}
      `
    };

    const info = await transporter.sendMail(mailOptions);
    res.json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ success: false, error: 'Failed to send email. Check OAuth credentials.' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
