import { useRef, useEffect, useState } from 'react';
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
    const [scrollProgress, setScrollProgress] = useState(0);

    // 스크롤 진행도 추적 - SnapContainer와 호환
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // 스크롤 진행도 상태 업데이트
    useEffect(() => {
        const unsubscribe = scrollYProgress.onChange((latest) => {
            setScrollProgress(latest);
            console.log('TimelineScroll 스크롤 진행도:', latest);
        });
        return unsubscribe;
    }, [scrollYProgress]);

    // SnapContainer 스크롤 이벤트 직접 감지
    useEffect(() => {
        const handleSnapScroll = () => {
            if (containerRef.current) {
                const containerRect = containerRef.current.getBoundingClientRect();
                const windowHeight = window.innerHeight;

                // 컨테이너가 화면에 보이는 정도 계산
                const visibleTop = Math.max(0, -containerRect.top);
                const containerHeight = containerRect.height;
                const progress = Math.min(1, Math.max(0, visibleTop / (containerHeight - windowHeight)));

                setScrollProgress(progress);
                console.log('SnapContainer 스크롤 진행도:', progress, 'visibleTop:', visibleTop, 'containerHeight:', containerHeight);
            }
        };

        const snapContainer = document.querySelector('.snap-container');
        if (snapContainer) {
            snapContainer.addEventListener('scroll', handleSnapScroll);
            // 초기 실행
            handleSnapScroll();
            return () => snapContainer.removeEventListener('scroll', handleSnapScroll);
        }
    }, []);

    // 화살표 애니메이션: 0%에서 100%로 위로 이동 (사용하지 않음 - 수동 계산 사용)

    // 수동으로 계산한 애니메이션 값
    // 화살표: 0~40% 구간에서 아래에서 위로 올라감
    const arrowProgress = Math.min(1, scrollProgress / 0.4); // 0~40%를 0~100%로 변환
    const manualArrowY = `${100 - (arrowProgress * 200)}%`;
    const manualArrowOpacity = arrowProgress < 0.1 ? 1 : arrowProgress > 0.9 ? 0 : 1;

    // 텍스트: 항상 sticky 상태로 유지 (사라지지 않음)
    const textSticky = true;

    return (
        <div className="relative w-full h-full">
            {/* Section B: Pin Zone - 텍스트 sticky, 화살표 애니메이션 */}
            <div ref={containerRef} className="relative w-full h-full">
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
                                    fontSize: '120px'
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
                                    fontSize: '120px'
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
                                    fontSize: '120px'
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
                                    fontSize: '120px'
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
                        y: manualArrowY,
                        opacity: manualArrowOpacity
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
                        <div className="relative z-20 w-full h-full flex items-center justify-center">
                            <img
                                src="/about/어바웃:배경.png"
                                alt="화살표 배경"
                                className="w-full h-auto"
                                style={{
                                    display: 'block',
                                    transform: `translateY(${manualArrowY})`,
                                    opacity: manualArrowOpacity
                                }}
                                onError={(e) => {
                                    console.error('이미지 로드 실패:', e.currentTarget.src);
                                }}
                                onLoad={() => {
                                    console.log('이미지 로드 성공');
                                }}
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default TimelineScroll;
