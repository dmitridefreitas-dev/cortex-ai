import React from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const DocsPage = () => {
  const docs = [
    {
      version: 'V1',
      title: 'Getting Started with V1',
      description: 'Complete setup guide for basic booking and reminders',
      topics: ['Installation', 'Phone setup', 'Calendar integration', 'SMS config'],
    },
    {
      version: 'V2',
      title: 'V2 Integration Guide',
      description: 'Email and EMR integration documentation',
      topics: ['Email setup', 'EMR connection', 'Patient portal', 'Multi-language'],
    },
    {
      version: 'V3',
      title: 'V3 Advanced Features',
      description: 'Smart scheduling and payment processing',
      topics: ['No-show prediction', 'Payment setup', 'Insurance verification', 'Waitlist'],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Documentation - Cortex AI</title>
        <meta name="description" content="Complete documentation for Cortex AI. Get started quickly with our comprehensive guides." />
      </Helmet>

      <div className="relative min-h-screen">
        {/* background is global (App.jsx) */}
        
        <div className="relative py-16 px-4">
          <div className="container max-w-5xl">
            <div className="text-center mb-12">
              <h1 className="text-2xl md:text-3xl font-bold text-slateText mb-3 tracking-tight">
                Documentation
              </h1>
              <div className="flex justify-center mb-4">
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
              <p className="text-sm text-slateMuted font-light">
                Everything you need to get started with Cortex AI
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {docs.map((doc, index) => (
                <Card key={index} className="bg-card border-border hover:shadow-glow-soft hover:border-primary/30 transition-all duration-300 hover:scale-[1.02] rounded-xl flex flex-col">
                  <CardHeader className="pb-3">
                    <FileText className="h-6 w-6 text-primary mb-3" />
                    <div className="text-primary font-mono text-xs mb-1">{doc.version}</div>
                    <CardTitle className="text-sm text-slateText">{doc.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col">
                    <p className="text-xs text-slateMuted mb-4">
                      {doc.description}
                    </p>
                    <ul className="space-y-1.5 mb-6 flex-grow">
                      {doc.topics.map((topic, idx) => (
                        <li key={idx} className="text-[11px] text-slateMuted/90">
                          • {topic}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-3 border-t border-border">
                      <Button variant="outline" className="w-full text-xs text-slateMuted hover:text-primary hover:border-primary/40 h-8 rounded-md transition-all">
                        View Docs
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-card border-border rounded-xl max-w-2xl mx-auto">
              <CardContent className="p-6 text-center">
                <p className="text-sm text-slateText mb-2">
                  Full documentation provided upon setup
                </p>
                <p className="text-xs text-slateMuted font-light">
                  Our team will provide comprehensive documentation tailored to your specific version and configuration.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default DocsPage;