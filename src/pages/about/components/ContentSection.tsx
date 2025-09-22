import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

/**
 * About 페이지의 콘텐츠 섹션 컴포넌트
 * ME, Visual Identity, 인사말 등 텍스트 콘텐츠
 */
interface ContentSectionProps {
  title: string;
  content: string;
  author?: string;
  className?: string;
}

const ContentSection: React.FC<ContentSectionProps> = ({ 
  title, 
  content, 
  author, 
  className 
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-100px' }}
      className={clsx('py-16 sm:py-20', className)}
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* 제목 */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              {title}
            </h2>
          </div>
          
          {/* 콘텐츠 */}
          <div className="lg:col-span-2">
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {content}
              </p>
              {author && (
                <p className="mt-6 text-sm text-muted-foreground font-medium">
                  {author}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ContentSection;
