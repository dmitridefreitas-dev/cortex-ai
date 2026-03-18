
import React from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, Server } from 'lucide-react';
import { motion } from 'framer-motion';

const TrustPage = () => {
  return (
    <>
      <Helmet>
        <title>Security & Compliance - Cortex AI</title>
        <meta name="description" content="Learn about Cortex AI's security measures and compliance standards." />
      </Helmet>

      <div className="relative min-h-screen flex flex-col">
        {/* background is global (App.jsx) */}
        
        <div className="relative pt-20 pb-24 px-4">
          <div className="container max-w-4xl mx-auto">
            <div className="text-center mb-12 z-20 relative">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slateText mb-4 tracking-wide">
                Security & Compliance
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
                Your data security is our top priority. Built from the ground up with privacy in mind.
              </p>
            </div>

            <Card className="bg-card border-border hover:border-primary hover:shadow-glow-soft transition-all duration-500 rounded-2xl overflow-hidden mb-8 max-w-2xl mx-auto relative z-10">
              <CardHeader className="text-center pb-5 pt-6 border-b border-border bg-muted/30">
                <CardTitle className="text-xs text-slateText uppercase tracking-widest font-semibold">Status Update</CardTitle>
                <p className="text-sm text-primary mt-1.5 font-medium">Certifications in Progress</p>
              </CardHeader>
            </Card>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10 relative z-10">
              <Card className="bg-card backdrop-blur border-border hover:border-primary/40 transition-all duration-300 rounded-xl gradient-overlay">
                <CardContent className="p-5 flex flex-col items-center text-center h-full">
                  <div className="p-3 rounded-xl bg-primaryBlueSoft/70 dark:bg-transparent border border-primary/20 dark:border-transparent shadow-inner dark:shadow-none mb-4">
                    <Shield className="h-5 w-5 text-primary dark:text-white" />
                  </div>
                  <h3 className="text-sm font-semibold text-slateText mb-2">HIPAA Compliance</h3>
                  <p className="text-xs text-slateMuted leading-relaxed">Full certification process currently in progress. Architecture designed to meet all regulatory requirements.</p>
                </CardContent>
              </Card>

              <Card className="bg-card backdrop-blur border-border hover:border-primary/40 transition-all duration-300 rounded-xl gradient-overlay">
                <CardContent className="p-5 flex flex-col items-center text-center h-full">
                  <div className="p-3 rounded-xl bg-primaryBlueSoft/70 dark:bg-transparent border border-primary/20 dark:border-transparent shadow-inner dark:shadow-none mb-4">
                    <Lock className="h-5 w-5 text-primary dark:text-white" />
                  </div>
                  <h3 className="text-sm font-semibold text-slateText mb-2">Data Encryption</h3>
                  <p className="text-xs text-slateMuted leading-relaxed">All data is encrypted at rest (AES-256) and in transit (TLS 1.3) using industry-leading standards.</p>
                </CardContent>
              </Card>

              <Card className="bg-card backdrop-blur border-border hover:border-primary/40 transition-all duration-300 rounded-xl gradient-overlay col-span-2 md:col-span-1">
                <CardContent className="p-5 flex flex-col items-center text-center h-full">
                  <div className="p-3 rounded-xl bg-primaryBlueSoft/70 dark:bg-transparent border border-primary/20 dark:border-transparent shadow-inner dark:shadow-none mb-4">
                    <Server className="h-5 w-5 text-primary dark:text-white" />
                  </div>
                  <h3 className="text-sm font-semibold text-slateText mb-2">Private by Default</h3>
                  <p className="text-xs text-slateMuted leading-relaxed">Your data never leaves your designated infrastructure. We do not train our base models on your patient data.</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center pt-4 relative z-10">
              <Button className="dark-button px-8 py-6 rounded-full text-sm font-medium">
                Request Security Whitepaper
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrustPage;
