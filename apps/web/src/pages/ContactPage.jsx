
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';

const ContactPage = () => {
  const [selectedVersion, setSelectedVersion] = useState('V1');
  const versions = ['V1', 'V2', 'V3', 'V4', 'V5', 'V6'];

  return (
    <>
      <Helmet>
        <title>Contact - Cortex AI</title>
        <meta name="description" content="Get in touch with Cortex AI. We're here to help with any questions." />
      </Helmet>

      <div className="relative min-h-screen">
        {/* background is global (App.jsx) */}
        
        <div className="relative pt-20 pb-24 px-4">
          <div className="container max-w-2xl mx-auto">
            <div className="text-center mb-12 z-20 relative">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slateText mb-4 tracking-wide">
                Talk to our team
              </h1>
              <div className="flex justify-center mb-6">
                <motion.svg
                  className="w-28 h-6"
                  viewBox="0 0 120 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="0"
                    y1="12"
                    x2="120"
                    y2="12"
                    stroke="rgba(148,163,184,0.6)"
                    strokeWidth="1.1"
                    strokeLinecap="round"
                  />
                  <motion.path
                    d="M0 12 L10 12 L18 4 L26 18 L34 6 L42 16 L50 12 L60 12"
                    stroke="var(--primary-accent)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0, x: -60 }}
                    animate={{ pathLength: 1, opacity: [0, 1, 0.8, 0], x: 120 }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                      filter: 'drop-shadow(0 0 10px var(--cortex-glow))',
                    }}
                  />
                </motion.svg>
              </div>
              <p className="text-base text-slateMuted font-light max-w-xl mx-auto leading-relaxed">
                We'd love to hear from you. Fill out the form below and we'll get back to you shortly.
              </p>
            </div>

            <Card className="bg-card border-border shadow-xl rounded-2xl mb-10 overflow-hidden relative z-10">
              <CardContent className="p-5 md:p-6">
                <form className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm text-slateText font-medium block">Name</label>
                      <Input
                        placeholder="Maya Chen"
                        className="bg-background text-foreground placeholder:text-slateMuted border-border focus-visible:ring-primary focus-visible:border-primary h-10 rounded-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-slateText font-medium block">Email</label>
                      <Input
                        type="email"
                        placeholder="maya@example.com"
                        className="bg-background text-foreground placeholder:text-slateMuted border-border focus-visible:ring-primary focus-visible:border-primary h-10 rounded-lg"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm text-slateText font-medium block">Practice / Business</label>
                    <Input
                      placeholder="Meridian Medical"
                      className="bg-background text-foreground placeholder:text-slateMuted border-border focus-visible:ring-primary focus-visible:border-primary h-10 rounded-lg"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm text-slateText font-medium block">Version Interest</label>
                    <div className="flex flex-wrap gap-2">
                      {versions.map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setSelectedVersion(v)}
                          className={`px-3 py-1.5 text-xs rounded-lg border transition-all duration-200 font-medium ${
                            selectedVersion === v 
                              ? 'border-primary text-primary bg-primary/10' 
                              : 'border-border text-slateMuted hover:border-primary/50 hover:text-slateText bg-muted/30'
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-slateText font-medium block">Message</label>
                    <Textarea
                      placeholder="Tell us more about your needs..."
                      rows={4}
                      className="bg-background text-foreground placeholder:text-slateMuted border-border focus-visible:ring-primary focus-visible:border-primary resize-none rounded-lg"
                    />
                  </div>
                  
                  <div className="pt-2">
                    <Button className="w-full dark-button h-11 rounded-lg text-sm font-medium">
                      Send Message
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center relative z-10">
              <div className="p-4 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors flex flex-col justify-center">
                <h3 className="text-xs sm:text-sm font-medium text-slateText mb-1">General</h3>
                <p className="text-xs text-primary">hello@cortex.ai</p>
              </div>
              <div className="p-4 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors flex flex-col justify-center">
                <h3 className="text-xs sm:text-sm font-medium text-slateText mb-1">Sales</h3>
                <p className="text-xs text-primary">sales@cortex.ai</p>
              </div>
              <div className="col-span-2 md:col-span-1 p-4 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors flex flex-col justify-center">
                <h3 className="text-xs sm:text-sm font-medium text-slateText mb-1">Support</h3>
                <p className="text-xs text-primary">support@cortex.ai</p>
                <p className="text-[10px] text-slateMuted mt-1">(V3+ customers)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
