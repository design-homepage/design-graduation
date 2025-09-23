import React, { forwardRef, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface SnapSectionProps {
    id: string;
    children: React.ReactNode;
    isActive?: boolean;
    isScrolling?: boolean;
    className?: string;
}

const SnapSection = forwardRef<HTMLDivElement, SnapSectionProps>(
    ({ id, children, isActive = false, className = '' }, ref) => {
        const sectionRef = useRef<HTMLDivElement>(null);
        const shouldReduceMotion = useReducedMotion();

        // ref 병합
        useEffect(() => {
            if (ref) {
                if (typeof ref === 'function') {
                    ref(sectionRef.current);
                } else {
                    ref.current = sectionRef.current;
                }
            }
        }, [ref]);

        // 애니메이션 설정
        const animationVariants = {
            initial: {
                opacity: 0,
                y: 50,
                scale: 0.95
            },
            animate: {
                opacity: 1,
                y: 0,
                scale: 1
            },
            exit: {
                opacity: 0,
                y: -50,
                scale: 0.95
            }
        };

        // 접근성을 위한 상태 관리
        useEffect(() => {
            if (sectionRef.current) {
                sectionRef.current.setAttribute('data-section-id', id);
                sectionRef.current.setAttribute('aria-hidden', (!isActive).toString());

                if (isActive) {
                    sectionRef.current.setAttribute('tabindex', '0');
                } else {
                    sectionRef.current.removeAttribute('tabindex');
                }
            }
        }, [id, isActive]);

        // 애니메이션 설정 (prefers-reduced-motion 고려)
        const motionProps = shouldReduceMotion ? {} : {
            initial: animationVariants.initial,
            animate: isActive ? animationVariants.animate : animationVariants.initial,
            transition: {
                duration: 0.6,
                ease: "easeOut" as const,
                opacity: { duration: 0.4 },
                y: { duration: 0.6 },
                scale: { duration: 0.5 }
            }
        };

        return (
            <motion.div
                ref={sectionRef}
                id={id}
                className={`snap-section ${className}`}
                style={{
                    scrollSnapAlign: 'center',
                    scrollSnapStop: 'always',
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                }}
                {...motionProps}
                role="region"
                aria-labelledby={`${id}-title`}
                aria-hidden={!isActive}
            >
                <div className="w-full h-full flex items-center justify-center">
                    {children}
                </div>
            </motion.div>
        );
    }
);

SnapSection.displayName = 'SnapSection';

export default SnapSection;
