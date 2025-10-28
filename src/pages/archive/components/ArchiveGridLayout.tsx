import React from 'react';
import ArchiveColumn from './ArchiveColumn';

interface ArchiveGridLayoutProps {
    columnCount: number;
    containerWidth: string;
    columnGap: string;
    leftColumn: string[];
    middleColumn: string[];
    rightColumn: string[];
    imageErrors: Set<number>;
    onImageError: (_index: number) => void;
}

const ArchiveGridLayout: React.FC<ArchiveGridLayoutProps> = ({
    columnCount,
    containerWidth,
    columnGap,
    leftColumn,
    middleColumn,
    rightColumn,
    imageErrors,
    onImageError
}) => {
    return (
        <div className="relative z-20" style={{
            width: '100%',
            maxWidth: containerWidth,
            height: 'auto',
            margin: '0 auto',
            display: 'flex',
            gap: columnGap
        }}>
            {/* 3열 레이아웃 (≥1020px) */}
            {columnCount === 3 && (
                <>
                    <ArchiveColumn
                        images={leftColumn}
                        startIndex={0}
                        imageErrors={imageErrors}
                        onImageError={onImageError}
                    />
                    <ArchiveColumn
                        images={middleColumn}
                        startIndex={leftColumn.length}
                        imageErrors={imageErrors}
                        onImageError={onImageError}
                    />
                    <ArchiveColumn
                        images={rightColumn}
                        startIndex={leftColumn.length + middleColumn.length}
                        imageErrors={imageErrors}
                        onImageError={onImageError}
                    />
                </>
            )}

            {/* 2열 레이아웃 (600-1019px) */}
            {columnCount === 2 && (
                (() => {
                    // 3열 기준 개수: 22, 23, 25 → 2열에서는 좌: (22+12)=34, 우: (11+25)=36
                    const leftTwoCol = [...leftColumn, ...middleColumn.slice(0, 12)];
                    const rightTwoCol = [...middleColumn.slice(12), ...rightColumn];
                    return (
                        <>
                            <ArchiveColumn
                                images={leftTwoCol}
                                startIndex={0}
                                imageErrors={imageErrors}
                                onImageError={onImageError}
                            />
                            <ArchiveColumn
                                images={rightTwoCol}
                                startIndex={leftTwoCol.length}
                                imageErrors={imageErrors}
                                onImageError={onImageError}
                            />
                        </>
                    );
                })()
            )}

            {/* 1열 레이아웃 (<600px) */}
            {columnCount === 1 && (
                <ArchiveColumn
                    images={[...leftColumn, ...middleColumn, ...rightColumn]}
                    startIndex={0}
                    imageErrors={imageErrors}
                    onImageError={onImageError}
                />
            )}
        </div>
    );
};

export default ArchiveGridLayout;
