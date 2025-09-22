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
    <section
      className={clsx('relative overflow-hidden', className)}
      style={{
        width: '100%',
        height: '680px', //나중에 수정필요
        opacity: 1,
        paddingLeft: '32px',
        paddingRight: '32px'
      }}
    >
      {/* 영상 배경 - 임시 회색 */}
      <div className="absolute inset-0 z-0 bg-gray-200" />
    </section>
  );
};

export default AboutHero;
