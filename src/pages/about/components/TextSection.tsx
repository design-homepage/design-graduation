import React from 'react';
import { motion } from 'framer-motion';

/**
 * About 페이지의 텍스트 섹션 컴포넌트
 * "나를 통해", "우리가 되고", "우리 안에서", "나를 본다" 텍스트
 */
interface TextSectionProps {
    className?: string;
}

const TextSection: React.FC<TextSectionProps> = ({ className }) => {
    return (
        <section className={`py-16 sm:py-20 ${className || ''}`}>
            <div className="max-w-screen-xl mx-auto">
                <div className="text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="flex flex-col space-y-8 sm:space-y-12 lg:space-y-16"
                    >
                        <div
                            className="text-black text-4xl sm:text-6xl lg:text-8xl xl:text-9xl"
                            style={{
                                fontFamily: 'Pretendard',
                                fontWeight: 700,
                                letterSpacing: '0%'
                            }}
                        >
                            나를 통해
                        </div>
                        <div
                            className="text-black text-center text-4xl sm:text-6xl lg:text-8xl xl:text-9xl"
                            style={{
                                fontFamily: 'Pretendard',
                                fontWeight: 700,
                                letterSpacing: '0%'
                            }}
                        >
                            우리가 되고
                        </div>
                        <div
                            className="text-black text-center text-4xl sm:text-6xl lg:text-8xl xl:text-9xl"
                            style={{
                                fontFamily: 'Pretendard',
                                fontWeight: 700,
                                letterSpacing: '0%'
                            }}
                        >
                            우리 안에서
                        </div>
                        <div
                            className="text-black text-right text-4xl sm:text-6xl lg:text-8xl xl:text-9xl"
                            style={{
                                fontFamily: 'Pretendard',
                                fontWeight: 700,
                                letterSpacing: '0%'
                            }}
                        >
                            나를 본다
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default TextSection;
