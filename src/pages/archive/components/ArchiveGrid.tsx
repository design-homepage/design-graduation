import React, { useState, useEffect } from 'react';
import ArchiveBackground from './ArchiveBackground';
import ArchiveIntro from './ArchiveIntro';
import ArchiveGridLayout from './ArchiveGridLayout';

// S3에 업로드된 아카이브 미디어 URL 생성
const S3_BASE = 'https://design-graduation-image.s3.ap-northeast-2.amazonaws.com/archive';

const archiveMedia: string[] = [
    // 1.webp ~ 68.webp
    ...Array.from({ length: 68 }, (_, i) => `${S3_BASE}/${i + 1}.webp`),
    // 69.mp4, 70.mp4
    `${S3_BASE}/69.mp4`,
    `${S3_BASE}/70.mp4`
];

// 고정 개수로 3개 컬럼 분할: 22, 23, 25 (왼 < 중 < 오)
const splitFixed = (items: string[]) => {
    const left = items.slice(0, 22);
    const middle = items.slice(22, 49);
    const right = items.slice(49);
    return { left, middle, right };
};

const { left: leftColumn, middle: middleColumn, right: rightColumn } = splitFixed(archiveMedia);

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

    const handleImageError = (_index: number) => {
        setImageErrors(prev => new Set(prev).add(_index));
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
            {/* 미디어 프리로딩 (이미지는 image, 영상은 video로) */}
            {[...leftColumn, ...middleColumn, ...rightColumn].map((mediaPath, index) => {
                const isVideo = /\.mp4(\?|$)/i.test(mediaPath);
                return (
                    <link
                        key={`preload-${index}`}
                        rel="preload"
                        as={isVideo ? 'video' : 'image'}
                        href={mediaPath}
                    />
                );
            })}

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
