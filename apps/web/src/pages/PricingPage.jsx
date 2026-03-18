import React from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

const PricingPage = () => {
  const pricingTiers = [
    {
      version: 'V1',
      name: 'Starter',
      price: '$1,200',
      period: '/mo',
      features: ['24/7 phone answering', 'Appointment booking', 'SMS reminders', 'Basic calendar sync'],
    },
    {
      version: 'V2',
      name: 'Professional',
      price: '$1,500',
      period: '/mo',
      features: ['Everything in V1', 'Email integration', 'Basic EMR sync', 'Patient portal'],
    },
    {
      version: 'V3',
      name: 'Advanced',
      price: '$2,000',
      period: '/mo + 2%',
      features: ['Everything in V2', 'No-show prediction', 'Payment processing', 'Insurance verification'],
    },
    {
      version: 'V4',
      name: 'Enterprise',
      price: '$2,500',
      period: '/mo + $50/prov',
      features: ['Everything in V3', 'Multi-channel comms', 'Full EMR integration', 'Telehealth'],
    },
    {
      version: 'V5',
      name: 'Analytics',
      price: '$3,000',
      period: '/mo',
      features: ['Everything in V4', 'Predictive analytics', 'Revenue optimization', 'Staff scheduling AI'],
    },
    {
      version: 'V6',
      name: 'Autonomous',
      price: '$3,500',
      period: '/mo + 1%',
      features: ['Everything in V5', 'Full autonomy', 'Provider AI assistant', 'Clinical decision support'],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Pricing - Cortex AI</title>
        <meta name="description" content="Simple, transparent pricing for Cortex AI. Choose the plan that fits your practice." />
      </Helmet>

      <div className="relative min-h-screen">
        {/* background is global (App.jsx) */}
        
        <div className="relative py-16 px-4">
          <div className="container max-w-6xl">
            <div className="text-center mb-12">
              <h1 className="text-2xl md:text-3xl font-bold text-slateText mb-3 tracking-tight">
                Simple, transparent pricing
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
              <p className="text-sm text-slateMuted max-w-xl mx-auto font-light">
                No hidden fees. No surprises. Just powerful AI for your practice.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {pricingTiers.map((tier, index) => (
                <Card key={index} className="bg-card border-border hover:shadow-glow-soft hover:border-primary/30 transition-all duration-300 hover:scale-[1.02] rounded-xl flex flex-col h-full">
                  <CardHeader className="p-5 pb-3">
                    <div className="text-primary font-mono text-xs mb-1">{tier.version}</div>
                    <CardTitle className="text-base text-slateText">{tier.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 pt-0 flex-grow flex flex-col">
                    <ul className="space-y-2.5 mb-6 flex-grow">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="h-3.5 w-3.5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-slateMuted leading-tight">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-4 border-t border-border">
                      <div className="mb-4">
                        <span className="text-xl font-semibold text-slateText">{tier.price}</span>
                        <span className="text-xs text-slateMuted ml-1">{tier.period}</span>
                      </div>
                      <Button variant="outline" className="w-full text-sm text-slateMuted hover:text-primary hover:border-primary/40 h-9 rounded-md transition-all">
                        Get Started
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="text-sm border border-primary/30 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-full transition-all">
                Start Free Trial
              </Button>
              <Button variant="outline" className="text-sm text-slateMuted hover:text-primary hover:border-primary/50 px-6 py-2">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PricingPage;