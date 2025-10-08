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
  console.log('AboutHero 렌더링됨');

  return (
    <section
      id="hero"
      className={clsx('relative overflow-hidden w-full h-full', className)}
      style={{
        width: '100%',
        height: '100vh',
        opacity: 1,
        paddingLeft: '32px',
        paddingRight: '32px',
        backgroundColor: '#e5e7eb' // 회색 배경 강제 적용
      }}
    >
      {/* 영상 배경 - 임시 회색 */}
      <div
        className="absolute inset-0 z-0"
        style={{ backgroundColor: '#e5e7eb' }}
      />

      {/* 히어로 콘텐츠 */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-xl text-gray-600">
            추후 영상 넣을 예정
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
