import React from 'react';

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
            {/* 배경 그라디언트 */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-green-100" />

            {/* 배경 패턴 */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-10 left-10 w-20 h-20 bg-green-200 rounded-full" />
                <div className="absolute top-32 right-20 w-16 h-16 bg-green-300 rounded-lg rotate-45" />
                <div className="absolute bottom-20 left-20 w-24 h-24 bg-green-200 rounded-full" />
                <div className="absolute bottom-32 right-10 w-12 h-12 bg-green-300 rounded-lg" />
                <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-green-200 rounded-full" />
                <div className="absolute top-1/3 right-1/3 w-14 h-14 bg-green-300 rounded-lg rotate-12" />
            </div>

            {/* 메인 콘텐츠 */}
            <div className="relative z-10 text-center px-6">
                <h1 className="text-4xl md:text-6xl font-bold mb-8">
                    <span className="text-gray-900">ME</span>
                    <span className="text-gray-700">가 </span>
                    <span className="text-green-500">WE</span>
                    <span className="text-gray-700">가 되는 날까지</span>
                </h1>

                <div className="text-2xl md:text-3xl font-mono text-gray-600 mb-4">
                    D-DAY
                </div>

                <div className="flex justify-center items-center space-x-4 text-lg md:text-xl font-mono">
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow-sm">
                        <div className="text-2xl md:text-3xl font-bold text-gray-900">{days.toString().padStart(2, '0')}</div>
                        <div className="text-sm text-gray-600">일</div>
                    </div>

                    <div className="text-gray-400">:</div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow-sm">
                        <div className="text-2xl md:text-3xl font-bold text-gray-900">{hours.toString().padStart(2, '0')}</div>
                        <div className="text-sm text-gray-600">시</div>
                    </div>

                    <div className="text-gray-400">:</div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow-sm">
                        <div className="text-2xl md:text-3xl font-bold text-gray-900">{minutes.toString().padStart(2, '0')}</div>
                        <div className="text-sm text-gray-600">분</div>
                    </div>

                    <div className="text-gray-400">:</div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow-sm">
                        <div className="text-2xl md:text-3xl font-bold text-gray-900">{seconds.toString().padStart(2, '0')}</div>
                        <div className="text-sm text-gray-600">초</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DdayHero;
