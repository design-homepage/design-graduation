import React from 'react';
import ArchiveBackground from './ArchiveBackground';


interface TimeRemaining {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

interface DdayHeroProps {
    timeRemaining: TimeRemaining;
}

const DdayHero: React.FC<DdayHeroProps> = ({ timeRemaining }) => {
    const { days, hours, minutes, seconds } = timeRemaining;

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
            <ArchiveBackground
                containerWidth="100vw"
                containerHeight="100vh"
            />

            {/* 메인 콘텐츠 */}
            <div className="relative z-10 text-center px-6">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-16">
                    <span className="text-[#00E53A]">ME</span>
                    <span className="text-black">가 </span>
                    <span className="text-[#00E53A]">WE</span>
                    <span className="text-black">가 되는 날까지</span>
                </h1>

                <div className="text-xl md:text-4xl text-[#B2B2B2]">
                    {days === 0 ? 'D-DAY' : `D-${days}`}
                </div>
            </div>
        </div>
    );
};

export default DdayHero;
