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
    const numSteps = 7;

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = Math.min(scrollTop / docHeight, 1);

            const newArrowIndex = Math.floor(progress * numSteps);
            setActiveArrowIndex(newArrowIndex);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <div className={clsx('fixed right-8 top-1/2 transform -translate-y-1/2 z-50', className)}>
            <div className="flex flex-col items-center space-y-2">
                {/* 각 위치에 점 또는 화살표 렌더링 */}
                {Array.from({ length: numSteps }).map((_, index) => (
                    <div
                        key={index}
                        className="w-6 h-6 flex items-center justify-center"
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
                            <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ScrollArrow;
