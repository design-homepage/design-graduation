import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * About 페이지의 타임라인 스크롤 애니메이션 컴포넌트
 * 
 * 구조:
 * - Section A (Intro): 큰 텍스트 normal flow
 * - Section B (Pin Zone): 텍스트 sticky, 화살표 위로 이동
 * - Section C (Outro): 텍스트 normal flow로 전환, 다음 섹션
 */
const TimelineScroll = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    // 스크롤 진행도 추적 (Pin Zone 구간)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // 화살표 애니메이션: 0%에서 100%로 위로 이동
    const arrowY = useTransform(scrollYProgress, [0, 1], ["100%", "-100%"]);
    const arrowOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

    return (
        <div className="relative">
            {/* Section B: Pin Zone - 텍스트 sticky, 화살표 애니메이션 */}
            <div ref={containerRef} className="relative" style={{ height: '300vh' }}>
                {/* Sticky 텍스트 */}
                <div className="sticky top-0 h-screen flex items-center justify-center z-20 w-full">
                    <div className="text-center w-full px-10">
                        <div className="flex flex-col space-y-0">
                            <div
                                className="text-black text-left"
                                style={{
                                    fontFamily: 'Pretendard',
                                    fontWeight: 700,
                                    letterSpacing: '0%',
                                    fontSize: '130px'
                                }}
                            >
                                나를 통해
                            </div>
                            <div
                                className="text-black text-center"
                                style={{
                                    fontFamily: 'Pretendard',
                                    fontWeight: 700,
                                    letterSpacing: '0%',
                                    fontSize: '130px'
                                }}
                            >
                                우리가 되고
                            </div>
                            <div
                                className="text-black text-center"
                                style={{
                                    fontFamily: 'Pretendard',
                                    fontWeight: 700,
                                    letterSpacing: '0%',
                                    fontSize: '130px'
                                }}
                            >
                                우리 안에서
                            </div>
                            <div
                                className="text-black text-right"
                                style={{
                                    fontFamily: 'Pretendard',
                                    fontWeight: 700,
                                    letterSpacing: '0%',
                                    fontSize: '130px'
                                }}
                            >
                                나를 본다
                            </div>
                        </div>
                    </div>
                </div>

                {/* 화살표 애니메이션 */}
                <motion.div
                    className="absolute inset-0 z-30 pointer-events-none"
                    style={{
                        y: arrowY,
                        opacity: arrowOpacity
                    }}
                >
                    <div className="w-full h-full relative">
                        {/* 배경 블러 효과 */}
                        <div
                            className="absolute inset-0 z-10"
                            style={{
                                backdropFilter: 'blur(19px)',
                                WebkitBackdropFilter: 'blur(19px)'
                            }}
                        />
                        {/* 화살표 배경 이미지 */}
                        <img
                            src="/about/어바웃:배경.png"
                            alt="화살표 배경"
                            className="w-full h-auto relative z-20"
                        />
                    </div>
                </motion.div>
            </div>

        </div>
    );
};

export default TimelineScroll;
