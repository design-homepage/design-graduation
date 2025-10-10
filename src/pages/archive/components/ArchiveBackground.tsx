import React from 'react';

interface ArchiveBackgroundProps {
    containerWidth: string;
    containerHeight: string;
}

const ArchiveBackground: React.FC<ArchiveBackgroundProps> = ({ containerWidth, containerHeight }) => {
    return (
        <>
            {/* 배경 이미지 프리로딩 */}
            <link rel="preload" as="image" href="/archive/background-green.webp" />
            <div
                className="fixed inset-0"
                style={{
                    backgroundImage: 'url(./archive/background-green.webp)',
                    backgroundColor: '#f0f0f0',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    zIndex: 0,
                    minHeight: '100vh',
                    width: '100vw',
                    opacity: 0.3
                }}
            />
        </>
    );
};

export default ArchiveBackground;
