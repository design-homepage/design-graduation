import React, { useState, useEffect } from 'react';
import ArchiveBackground from './ArchiveBackground';
import ArchiveIntro from './ArchiveIntro';
import ArchiveGridLayout from './ArchiveGridLayout';

// 이미지 배열을 3개 컬럼으로 분리
const leftColumn = [
    "/archive/example/1.webp",
    "/archive/example/2.webp",
    "/archive/example/3.webp"
];

const middleColumn = [
    "/archive/example/4.webp",
    "/archive/example/5.webp",
    "/archive/example/6.webp",
    "/archive/example/7.webp",
    "/archive/example/8.webp"
];

const rightColumn = [
    "/archive/example/9.webp",
    "/archive/example/10.webp",
    "/archive/example/11.webp",
    "/archive/example/12.webp"
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
                containerHeight: '3934.66px',
                textAreaHeight: '897px',
                columnCount: 3,
                columnGap: '15px'
            };
        } else if (windowWidth >= 1020) {
            return {
                containerWidth: '1350px',
                containerHeight: '2,999.27px',
                textAreaHeight: '600px',
                columnCount: 3,
                columnGap: '15px'
            };
        } else if (windowWidth >= 600) {
            return {
                containerWidth: '1020px',
                containerHeight: '3,088.62px',
                textAreaHeight: '600px',
                columnCount: 2,
                columnGap: '15px'
            };
        } else if (windowWidth >= 400) {
            return {
                containerWidth: '600px',
                containerHeight: '3,260.76px',
                textAreaHeight: '400px',
                columnCount: 1,
                columnGap: '15px'
            };
        } else {
            return {
                containerWidth: '400px',
                containerHeight: '2315.19px',
                textAreaHeight: '400px',
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

            <div className="relative z-[1] min-h-screen w-full px-8 pb-28 pt-24">
                <ArchiveBackground
                    containerWidth={responsiveStyles.containerWidth}
                    containerHeight={responsiveStyles.containerHeight}
                />

                <ArchiveIntro
                    containerWidth={responsiveStyles.containerWidth}
                    containerHeight={responsiveStyles.textAreaHeight}
                />

                <ArchiveGridLayout
                    columnCount={responsiveStyles.columnCount}
                    containerWidth={responsiveStyles.containerWidth}
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
