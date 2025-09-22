import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

/**
 * About 페이지의 히어로 섹션 컴포넌트
 * 메인 타이틀과 화살표 패턴 배경
 */
interface AboutHeroProps {
  className?: string;
}

const AboutHero: React.FC<AboutHeroProps> = ({ className }) => {
  return (
    <section className={clsx('relative min-h-screen bg-primary flex items-center justify-center overflow-hidden', className)}>
      {/* 화살표 패턴 배경 */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="grid grid-cols-8 gap-4 opacity-20">
            {Array.from({ length: 64 }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.02,
                  ease: 'easeOut' 
                }}
                className="w-8 h-8 flex items-center justify-center"
              >
                <div className="w-6 h-6 bg-white rounded-sm transform rotate-45" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 메인 타이틀 */}
      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="space-y-4"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            나를 통해
            <br />
            우리가 되고
            <br />
            우리 안에서
            <br />
            나를 본다
          </h1>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHero;
