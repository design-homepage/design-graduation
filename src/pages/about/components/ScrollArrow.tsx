import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { LiaLongArrowAltLeftSolid } from 'react-icons/lia';

/**
 * About 페이지의 스크롤 화살표 컴포넌트
 * 스크롤할 때마다 화살표가 하나씩 내려가는 애니메이션
 */
interface ScrollArrowProps {
    className?: string;
}

const ScrollArrow: React.FC<ScrollArrowProps> = ({ className }) => {
    const [activeArrowIndex, setActiveArrowIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const numSteps = 8; // 총 8개 섹션
    const sections = [
        'hero',        // 0번 화살표
        'timeline',    // 0번 화살표 (TimelineScroll 섹션 - hero와 같은 인덱스)
        'me',          // 1번 화살표
        'vi',          // 2번 화살표
        'dean',        // 3번 화살표
        'deptHead',    // 4번 화살표
        'professors',  // 5번 화살표
        'committee',   // 6번 화살표
        'members'      // 7번 화살표 (마지막 - 졸업구성원 + 팀사진)
    ];

    // 현재 활성 섹션 감지
    const getCurrentSection = () => {
        const windowHeight = window.innerHeight;

        for (let i = 0; i < sections.length; i++) {
            const section = document.getElementById(sections[i]);
            if (section) {
                const rect = section.getBoundingClientRect();
                // 섹션이 화면 중앙에 있을 때
                if (rect.top <= windowHeight * 0.5 && rect.bottom >= windowHeight * 0.5) {
                    return { index: i, id: sections[i] };
                }
            }
        }
        return { index: 0, id: sections[0] };
    };

    // 섹션 이동 함수
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    };

    useEffect(() => {
        const updateArrowState = () => {
            const currentSection = getCurrentSection();
            const isTimelineSection = currentSection.id === 'timeline';

            // Timeline 섹션에서는 화살표 숨기기
            setIsVisible(!isTimelineSection);

            // 화살표 인덱스 매핑
            let newArrowIndex = 0;
            switch (currentSection.id) {
                case 'hero':
                case 'timeline':
                    newArrowIndex = 0; // 0번 화살표
                    break;
                case 'me':
                    newArrowIndex = 1; // 1번 화살표
                    break;
                case 'vi':
                    newArrowIndex = 2; // 2번 화살표
                    break;
                case 'dean':
                    newArrowIndex = 3; // 3번 화살표
                    break;
                case 'deptHead':
                    newArrowIndex = 4; // 4번 화살표
                    break;
                case 'professors':
                    newArrowIndex = 5; // 5번 화살표
                    break;
                case 'committee':
                    newArrowIndex = 6; // 6번 화살표
                    break;
                case 'members':
                    newArrowIndex = 7; // 7번 화살표
                    break;
                default:
                    newArrowIndex = 0;
            }

            setActiveArrowIndex(newArrowIndex);

            console.log('현재 섹션:', currentSection.id, 'Timeline 여부:', isTimelineSection, '화살표 표시:', !isTimelineSection, '화살표 인덱스:', newArrowIndex);
        };

        // 초기 실행
        updateArrowState();

        // 스크롤 이벤트 감지
        const handleScroll = () => {
            updateArrowState();
        };

        // SnapContainer의 스크롤 이벤트 감지
        const snapContainer = document.querySelector('.snap-container');
        if (snapContainer) {
            snapContainer.addEventListener('scroll', handleScroll);
            return () => snapContainer.removeEventListener('scroll', handleScroll);
        } else {
            // 폴백: window 스크롤
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }
    }, [numSteps]);


    return (
        <motion.div
            className={clsx('fixed right-8 top-1/2 transform -translate-y-1/2 z-50', className)}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
        >
            <div className="flex flex-col items-center space-y-2">
                {/* 각 위치에 점 또는 화살표 렌더링 */}
                {Array.from({ length: numSteps }).map((_, index) => {
                    const targetSection = sections[index] || sections[sections.length - 1];

                    return (
                        <button
                            key={index}
                            onClick={() => scrollToSection(targetSection)}
                            className="w-6 h-6 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-200"
                        >
                            {index === activeArrowIndex ? (
                                <motion.div
                                    key="arrow"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.3, ease: 'easeOut' }}
                                    className="w-6 h-6 flex items-center justify-center"
                                >
                                    <LiaLongArrowAltLeftSolid className="w-5 h-5 text-white" style={{ strokeWidth: 1 }} />
                                </motion.div>
                            ) : (
                                <div className="w-2 h-2 bg-white rounded-full hover:bg-white/80 transition-colors duration-200" />
                            )}
                        </button>
                    );
                })}
            </div>
        </motion.div>
    );
};

export default ScrollArrow;
