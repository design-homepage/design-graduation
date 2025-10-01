import React from 'react';

interface ArchiveIntroProps {
    containerWidth: string;
    containerHeight: string;
}

const ArchiveIntro: React.FC<ArchiveIntroProps> = ({ containerWidth, containerHeight }) => {
    return (
        <div className="relative z-20 text-center mb-12" style={{
            width: '100%',
            maxWidth: containerWidth,
            height: containerHeight,
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <p className="text-sm md:text-lg lg:text-xl xl:text-[32px] font-bold text-black mb-4">
                이곳은 ME:WE의 모든 순간을 담은 아카이브입니다.
                <br />
                작은 불빛이 모여 우리를 밝히는 등불이 됩니다.
            </p>
            <p className="text-xs md:text-sm lg:text-base xl:text-lg text-black mt-2">
                This archive encompasses every moment of ME:WE,<br />where small lights come together as a guiding beacon for us all.
            </p>
        </div>
    );
};

export default ArchiveIntro;
