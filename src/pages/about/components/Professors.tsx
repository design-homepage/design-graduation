import React from 'react';
import { motion } from 'framer-motion';

/**
 * About 페이지의 지도 교수 섹션 컴포넌트
 * 교수진 정보를 표시
 */
interface ProfessorsProps {
    className?: string;
}

const Professors: React.FC<ProfessorsProps> = ({ className }) => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true, margin: '-100px' }}
            className={`py-16 sm:py-20 ${className || ''}`}
        >
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                    <div className="lg:col-span-1">
                        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                            지도 교수
                        </h2>
                    </div>

                    <div className="lg:col-span-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">경북대학교 예술대학 학장</p>
                                    <p className="text-lg font-semibold text-foreground">조철희</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">경북대학교 디자인학과 교수</p>
                                    <p className="text-lg font-semibold text-foreground">이경용</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">경북대학교 디자인학과 교수</p>
                                    <p className="text-lg font-semibold text-foreground">이재민</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">경북대학교 디자인학과 학과장</p>
                                    <p className="text-lg font-semibold text-foreground">김성년</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">경북대학교 디자인학과 교수</p>
                                    <p className="text-lg font-semibold text-foreground">안지선</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default Professors;
