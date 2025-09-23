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
    const numSteps = 9;

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
        const handleScroll = () => {
            const sections = [
                'hero',        // 0번 화살표
                'timeline',    // 1번 화살표
                'me',          // 2번 화살표
                'vi',          // 3번 화살표
                'dean',        // 4번 화살표
                'deptHead',    // 5번 화살표
                'professors',  // 6번 화살표
                'committee',   // 7번 화살표
                'members'      // 8번 화살표 (마지막 - 졸업구성원 + 팀사진)
            ];

            const windowHeight = window.innerHeight;
            let currentSectionIndex = 0;

            // 각 섹션을 확인하여 현재 보이는 섹션 찾기
            for (let i = 0; i < sections.length; i++) {
                const section = document.getElementById(sections[i]);
                if (section) {
                    const rect = section.getBoundingClientRect();
                    // 섹션이 화면 중앙에 있을 때 (정확한 조건)
                    if (rect.top <= windowHeight * 0.5 && rect.bottom >= windowHeight * 0.5) {
                        currentSectionIndex = i;
                        break;
                    }
                }
            }

            // 화살표 인덱스 계산 (0~8 범위로 제한)
            const newArrowIndex = Math.min(currentSectionIndex, numSteps - 1);

            // 상태가 실제로 변경될 때만 업데이트
            if (newArrowIndex !== activeArrowIndex) {
                setActiveArrowIndex(newArrowIndex);
            }
        };

        // 초기 실행
        handleScroll();

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
    }, [numSteps, activeArrowIndex]);


    return (
        <div className={clsx('fixed right-8 top-1/2 transform -translate-y-1/2 z-50', className)}>
            <div className="flex flex-col items-center space-y-2">
                {/* 각 위치에 점 또는 화살표 렌더링 */}
                {Array.from({ length: numSteps }).map((_, index) => {
                    const sections = [
                        'hero',
                        'timeline',
                        'me',
                        'vi',
                        'dean',
                        'deptHead',
                        'professors',
                        'committee',
                        'members',
                        'photos'
                    ];
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
        </div>
    );
};

export default ScrollArrow;
