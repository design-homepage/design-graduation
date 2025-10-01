import React from 'react';

interface ArchiveBackgroundProps {
    containerWidth: string;
    containerHeight: string;
}

const ArchiveBackground: React.FC<ArchiveBackgroundProps> = ({ containerWidth, containerHeight }) => {
    return (
        <>
            {/* 배경 이미지 프리로딩 */}
            <link rel="preload" as="image" href="/archive/background-green.png" />
            <div
                className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-30"
                style={{
                    backgroundImage: 'url(/archive/background-green.png)',
                    width: '100vw',
                    height: '100vh',
                    zIndex: 0
                }}
            />
        </>
    );
};

export default ArchiveBackground;
