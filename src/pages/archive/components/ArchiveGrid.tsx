import React, { useState, useEffect } from 'react';
import ArchiveBackground from './ArchiveBackground';
import ArchiveIntro from './ArchiveIntro';
import ArchiveGridLayout from './ArchiveGridLayout';

// 이미지 배열을 3개 컬럼으로 분리
const leftColumn = [
    "/archive/example/1.png",
    "/archive/example/2.png",
    "/archive/example/3.png"
];

const middleColumn = [
    "/archive/example/4.png",
    "/archive/example/5.png",
    "/archive/example/6.png",
    "/archive/example/7.png",
    "/archive/example/8.png"
];

const rightColumn = [
    "/archive/example/9.png",
    "/archive/example/10.png",
    "/archive/example/11.png",
    "/archive/example/12.png"
];

const ArchiveGrid: React.FC = () => {
    const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        handleResize(); // 초기값 설정
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleImageError = (index: number) => {
        setImageErrors(prev => new Set(prev).add(index));
    };

    // 반응형 스타일 계산
    const getResponsiveStyles = () => {
        if (windowWidth >= 1350) {
            return {
                containerWidth: '1920px',
                containerHeight: '897px',
                columnCount: 3,
                columnGap: '15px'
            };
        } else if (windowWidth >= 1020) {
            return {
                containerWidth: '1350px',
                containerHeight: '600px',
                columnCount: 3,
                columnGap: '15px'
            };
        } else if (windowWidth >= 600) {
            return {
                containerWidth: '1020px',
                containerHeight: '3088px',
                columnCount: 2,
                columnGap: '15px'
            };
        } else {
            return {
                containerWidth: '600px',
                containerHeight: '3260px',
                columnCount: 1,
                columnGap: '15px'
            };
        }
    };

    const responsiveStyles = getResponsiveStyles();

    return (
        <>
            {/* 모든 이미지 프리로딩 */}
            {[...leftColumn, ...middleColumn, ...rightColumn].map((imagePath, index) => (
                <link key={`preload-${index}`} rel="preload" as="image" href={imagePath} />
            ))}

            <div className="relative z-[1] px-8 pb-28 pt-24">
                <ArchiveBackground
                    containerWidth={responsiveStyles.containerWidth}
                    containerHeight={responsiveStyles.containerHeight}
                />

                <ArchiveIntro
                    containerWidth={responsiveStyles.containerWidth}
                    containerHeight={responsiveStyles.containerHeight}
                />

                <ArchiveGridLayout
                    columnCount={responsiveStyles.columnCount}
                    containerWidth={responsiveStyles.containerWidth}
                    containerHeight={responsiveStyles.containerHeight}
                    columnGap={responsiveStyles.columnGap}
                    leftColumn={leftColumn}
                    middleColumn={middleColumn}
                    rightColumn={rightColumn}
                    imageErrors={imageErrors}
                    onImageError={handleImageError}
                />
            </div>
        </>
    );
};

export default ArchiveGrid;
