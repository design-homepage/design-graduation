import React from 'react';

/**
 * About 페이지의 졸업구성원 섹션 컴포넌트
 * 팀명과 팀원 목록을 표시
 */
interface GraduationMembersProps {
    className?: string;
}

const GraduationMembers: React.FC<GraduationMembersProps> = ({ className }) => {
    return (
        <section className={`py-16 sm:py-20 ${className || ''}`}>
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                    <div className="lg:col-span-1">
                        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                            졸업구성원
                        </h2>
                    </div>
                    
                    <div className="lg:col-span-2">
                        <div className="flex" style={{ gap: '48px' }}>
                            {/* 팀명들 */}
                            <div className="space-y-6">
                                <div className="font-semibold text-foreground">기획팀</div>
                                <div className="font-semibold text-foreground">그래픽팀</div>
                                <div className="font-semibold text-foreground">영상팀</div>
                                <div className="font-semibold text-foreground">편집팀</div>
                                <div className="font-semibold text-foreground">웹팀</div>
                            </div>
                            
                            {/* 사람 이름들 */}
                            <div className="space-y-6">
                                <div className="text-foreground">안수아 강현정 권민정 박소연</div>
                                <div className="text-foreground">김승화 김은지 강유진 김도영 안수아 정환이</div>
                                <div className="text-foreground">강유진 김주훈 박수민 박해연 박희건 오지홍</div>
                                <div className="text-foreground">김도영 김민구 이지혁 전윤서 정현진</div>
                                <div className="text-foreground">정환이 신유빈 원민정 오서현 이윤서</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GraduationMembers;
