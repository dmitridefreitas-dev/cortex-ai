
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, Lock, ArrowRight, Fingerprint, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [step, setStep] = useState('login'); // login, mfa
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep('mfa');
    }, 1500);
  };

  const handleMfa = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate MFA verification
    setTimeout(() => {
      setLoading(false);
      navigate('/portal');
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>Login | Cortex Enterprise</title>
      </Helmet>

      <div className="min-h-screen flex items-center justify-center px-4 relative">
        <div className="w-full max-w-md z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface-elevated/80 backdrop-blur-xl border border-border rounded-3xl p-8 shadow-2xl"
          >
            <div className="flex flex-col items-center mb-8">
              <div className="h-12 w-12 rounded-2xl bg-brand-primary flex items-center justify-center text-white mb-4 shadow-glow-primary">
                <Shield size={24} />
              </div>
              <h1 className="text-2xl font-bold text-text-primary tracking-tight">
                Cortex Enterprise
              </h1>
              <p className="text-text-secondary text-sm">
                Secure access to your clinical hub
              </p>
            </div>

            <AnimatePresence mode="wait">
              {step === 'login' ? (
                <motion.form
                  key="login-form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleLogin}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="email">Work Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-text-secondary" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="doctor@practice.com"
                        className="pl-10 h-11 bg-background/50"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-text-secondary" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 h-11 bg-background/50"
                        required
                      />
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full h-11 bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold rounded-xl transition-all shadow-lg shadow-brand-primary/20"
                    disabled={loading}
                  >
                    {loading ? "Verifying..." : "Continue"}
                    {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                  
                  <div className="pt-4 text-center">
                    <button type="button" className="text-xs text-brand-primary font-medium hover:underline">
                      Forgot your password?
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.form
                  key="mfa-form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleMfa}
                  className="space-y-6 text-center"
                >
                  <div className="flex justify-center">
                    <div className="h-16 w-16 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-2 border border-brand-primary/20">
                      <Fingerprint size={32} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-xl font-bold text-text-primary">Verify Identity</h2>
                    <p className="text-sm text-text-secondary max-w-[240px] mx-auto">
                      Please enter the 6-digit code sent to your registered device.
                    </p>
                  </div>
                  
                  <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <input
                        key={i}
                        type="text"
                        maxLength="1"
                        className="w-10 h-12 text-center text-lg font-bold bg-background/50 border border-border rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all"
                        autoFocus={i === 1}
                      />
                    ))}
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-11 bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold rounded-xl transition-all shadow-lg shadow-brand-primary/20"
                    disabled={loading}
                  >
                    {loading ? "Authorizing..." : "Complete Secure Login"}
                  </Button>
                  
                  <button 
                    type="button" 
                    onClick={() => setStep('login')}
                    className="text-xs text-text-secondary hover:text-text-primary transition-colors"
                  >
                    Back to login
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
          
          <p className="mt-8 text-center text-xs text-text-secondary opacity-60">
            HIPAA Compliant Environment • AES-256 Encrypted Session
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
