import React from 'react';

/**
 * About 페이지의 졸준위 인사말 섹션 컴포넌트
 * 졸업준비위원회 인사말과 위원장 정보를 표시
 */
interface GraduationCommitteeProps {
    message: string;
    className?: string;
}

const GraduationCommittee: React.FC<GraduationCommitteeProps> = ({ 
    message, 
    className 
}) => {
    return (
        <section className={`py-16 sm:py-20 ${className || ''}`}>
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                    <div className="lg:col-span-1">
                        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                            졸준위 인사말
                        </h2>
                    </div>

                    <div className="lg:col-span-2">
                        <div className="prose prose-lg max-w-none">
                            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                                {message}
                            </p>
                            <div className="mt-8 space-y-2">
                                <p className="text-sm text-muted-foreground font-medium">
                                    졸업준비위원회 위원장
                                </p>
                                <p className="text-lg font-semibold text-foreground">
                                    김승화
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    2025년 10월
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GraduationCommittee;
