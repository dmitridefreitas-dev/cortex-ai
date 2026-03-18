
import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const BlogCard = ({ post }) => (
  <Card className="bg-card/95 backdrop-blur border-border hover:border-primary/30 hover:shadow-glow-soft transition-all duration-300 rounded-xl blog-card-compact group cursor-pointer">
    <CardHeader className="pb-2 pt-4 px-4 sm:px-5">
      <div className="flex items-center justify-between mb-2 gap-2">
        <span className="inline-flex items-center rounded-full border border-border bg-muted/40 px-2 py-0.5 text-[10px] font-medium text-primary whitespace-nowrap">
          {post.version}
        </span>
        <div className="pl-4">
          <span className="text-[9px] text-slateMuted bg-muted border border-border px-2 py-0.5 rounded-full uppercase tracking-wide whitespace-nowrap overflow-hidden text-ellipsis">
            {post.category}
          </span>
        </div>
      </div>
      <CardTitle className="text-sm md:text-base text-slateText leading-snug group-hover:text-primary transition-colors line-clamp-2 pr-4">{post.title}</CardTitle>
    </CardHeader>
    <CardContent className="px-4 sm:px-5 pb-4 flex-grow flex flex-col">
      <p className="text-xs text-slateMuted mb-4 flex-grow leading-relaxed line-clamp-4 pr-4">
        {post.description}
      </p>
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
        <div className="flex items-center gap-1.5 text-slateMuted/80 text-[10px] pr-4">
          <Calendar className="h-3 w-3" />
          <span>{post.date}</span>
        </div>
        <span className="text-[10px] text-[#1E3A8A] group-hover:text-[#1D4ED8] dark:text-[#BFDBFE] dark:group-hover:text-white transition-colors font-medium pl-5">
          Read More →
        </span>
      </div>
    </CardContent>
  </Card>
);

const MobileBlogCard = ({ post }) => (
  <div className="carousel-card group cursor-pointer hover:border-primary hover:shadow-glow-soft transition-all duration-300">
    <div className="flex items-center justify-between mb-3 gap-2">
      <span className="inline-flex items-center rounded-full border border-border bg-muted/40 px-2 py-0.5 text-[10px] font-medium text-primary whitespace-nowrap">
        {post.version}
      </span>
      <div className="pl-4">
        <span className="text-[9px] text-slateMuted bg-muted border border-border px-2 py-0.5 rounded-full uppercase tracking-wide whitespace-nowrap overflow-hidden text-ellipsis">
          {post.category}
        </span>
      </div>
    </div>
    <h3 className="text-sm text-slateText font-bold mb-2 group-hover:text-primary transition-colors pr-4 leading-snug">{post.title}</h3>
    <p className="text-xs text-slateMuted mb-4 pr-4 leading-relaxed">
      {post.description}
    </p>
    <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
      <div className="flex items-center gap-1.5 text-slateMuted/80 text-[10px] pr-4">
        <Calendar className="h-3 w-3" />
        <span>{post.date}</span>
      </div>
      <span className="text-[10px] text-[#1E3A8A] group-hover:text-[#1D4ED8] dark:text-[#BFDBFE] dark:group-hover:text-white transition-colors font-medium pl-5">
        Read More →
      </span>
    </div>
  </div>
);

const BlogPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const resumeTimeoutRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleInteractionStart = () => {
    setIsPaused(true);
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
  };

  const handleInteractionEnd = () => {
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    resumeTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 1200); // 1.2 seconds delay
  };

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  const posts = [
    {
      version: 'V1',
      title: 'V1 Case Study',
      description: 'How City Medical reduced missed calls to zero and improved patient satisfaction.',
      date: 'Coming Soon',
      category: 'Case Study',
    },
    {
      version: 'V2',
      title: 'V2 Email Integration',
      description: 'Announcing seamless Gmail and Outlook integration for automated follow-ups.',
      date: 'Coming Soon',
      category: 'Product Update',
    },
    {
      version: 'V2',
      title: 'Tester Spotlight',
      description: 'Dr. Reynolds shares his first week with Cortex and the impact on his staff.',
      date: 'Coming Soon',
      category: 'Customer Story',
    },
    {
      version: 'V3',
      title: 'V3 Smart Scheduling Preview',
      description: 'How AI predicts and prevents no-shows before they happen.',
      date: 'Coming Soon',
      category: 'Feature Preview',
    },
    {
      version: 'V3',
      title: 'V3 Feature Deep Dive',
      description: 'The science and machine learning models behind no-show prediction.',
      date: 'Coming Soon',
      category: 'Technical',
    },
    {
      version: 'V4-V6',
      title: 'Enterprise Roadmap',
      description: 'A look ahead at what\'s next for Cortex AI and full practice autonomy.',
      date: 'Coming Soon',
      category: 'Roadmap',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Blog & News - Cortex AI</title>
        <meta name="description" content="Latest updates, case studies, and insights from Cortex AI." />
      </Helmet>

      <div className="relative min-h-screen flex flex-col overflow-hidden">
        {/* background is global (App.jsx) */}
        
        <div className="relative pt-20 pb-24 px-4 flex-grow flex flex-col">
          <div className="container max-w-7xl mx-auto flex-grow flex flex-col">
            
            <div className="text-center mb-12 z-20 relative">
              <h1
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slateText mb-4 tracking-wide"
              >
                Blog & News
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
              <p className="text-base text-slateMuted font-light max-w-2xl mx-auto leading-relaxed">
                Stay informed about new features, case studies, and product updates
              </p>
            </div>

            {/* Desktop Horizontal Carousel */}
            {!isMobile && (
              <div className="hidden md:block relative w-full overflow-hidden py-8 mask-edges-x flex-grow">
                <div className="carousel-track-x pause-on-hover">
                  <div className="flex gap-8 pr-8 w-max">
                    {posts.map((post, index) => (
                      <BlogCard key={`d1-${index}`} post={post} />
                    ))}
                  </div>
                  <div className="flex gap-8 pr-8 w-max">
                    {posts.map((post, index) => (
                      <BlogCard key={`d2-${index}`} post={post} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Vertical Carousel (uses shared vertical tape animation) */}
            {isMobile && (
              <div className="md:hidden relative w-full flex-grow flex justify-center mask-edges-y py-4">
                <div className="carousel-container w-full flex justify-center overflow-hidden">
                  <div
                    className={`carousel-track-y ${isPaused ? 'carousel-paused' : ''}`}
                    onTouchStart={handleInteractionStart}
                    onTouchEnd={handleInteractionEnd}
                    onMouseEnter={handleInteractionStart}
                    onMouseLeave={handleInteractionEnd}
                  >
                    <div className="flex flex-col gap-4">
                      {posts.map((post, index) => (
                        <MobileBlogCard key={`m1-${index}`} post={post} />
                      ))}
                    </div>
                    <div className="flex flex-col gap-4">
                      {posts.map((post, index) => (
                        <MobileBlogCard key={`m2-${index}`} post={post} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="text-center mt-12 z-20 relative pb-8">
              <Button className="dark-button px-8 py-6 rounded-full text-sm font-medium">
                Subscribe for Updates
              </Button>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPage;
