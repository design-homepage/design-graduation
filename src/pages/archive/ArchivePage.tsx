import React, { useState, useEffect } from 'react';
import DdayHero from './components/DdayHero';
import ArchiveGrid from './components/ArchiveGrid';

// 공개일 설정 (로컬타임 기준 ISO)
const RELEASE_AT = new Date('2025-01-15T00:00:00').getTime();

const ArchivePage: React.FC = () => {
    const [now, setNow] = useState(Date.now());
    const [isReleased, setIsReleased] = useState(false);

    useEffect(() => {
        // 1초마다 현재 시간 갱신
        const timer = setInterval(() => {
            const currentTime = Date.now();
            setNow(currentTime);
            setIsReleased(currentTime >= RELEASE_AT);
        }, 1000);

        // 초기 상태 설정
        setIsReleased(now >= RELEASE_AT);

        return () => clearInterval(timer);
    }, [now]);

    // D-DAY 남은 시간 계산
    const getTimeRemaining = () => {
        const timeLeft = RELEASE_AT - now;

        if (timeLeft <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds };
    };

    return (
        <div className="min-h-screen bg-white">

            {!isReleased ? (
                <DdayHero timeRemaining={getTimeRemaining()} />
            ) : (
                <ArchiveGrid />
            )}
        </div>
    );
};

export default ArchivePage;
