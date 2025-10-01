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
            <p className="text-lg text-gray-700 mb-4">
                이곳은 <span className="text-gray-900 font-medium">ME</span>:<span className="text-green-500 font-medium">WE</span>의 모든 순간을 담은 아카이브입니다.
            </p>
            <p className="text-sm text-gray-600">
                작은 불빛이 모여 우리를 밝히는 등불이 됩니다.
            </p>
            <p className="text-sm text-gray-500 mt-2">
                This archive encompasses every moment of ME:WE, where small lights come together as a guiding beacon for us all.
            </p>
        </div>
    );
};

export default ArchiveIntro;
