import React from 'react';
import ArchiveColumn from './ArchiveColumn';

interface ArchiveGridLayoutProps {
    columnCount: number;
    containerWidth: string;
    containerHeight: string;
    columnGap: string;
    leftColumn: string[];
    middleColumn: string[];
    rightColumn: string[];
    imageErrors: Set<number>;
    onImageError: (index: number) => void;
}

const ArchiveGridLayout: React.FC<ArchiveGridLayoutProps> = ({
    columnCount,
    containerWidth,
    containerHeight,
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
                        columnKey="left"
                    />
                    <ArchiveColumn
                        images={middleColumn}
                        startIndex={3}
                        imageErrors={imageErrors}
                        onImageError={onImageError}
                        columnKey="middle"
                    />
                    <ArchiveColumn
                        images={rightColumn}
                        startIndex={8}
                        imageErrors={imageErrors}
                        onImageError={onImageError}
                        columnKey="right"
                    />
                </>
            )}

            {/* 2열 레이아웃 (600-1019px) */}
            {columnCount === 2 && (
                <>
                    <ArchiveColumn
                        images={[...leftColumn, ...middleColumn.slice(0, 3)]}
                        startIndex={0}
                        imageErrors={imageErrors}
                        onImageError={onImageError}
                        columnKey="left"
                    />
                    <ArchiveColumn
                        images={[...middleColumn.slice(3), ...rightColumn]}
                        startIndex={6}
                        imageErrors={imageErrors}
                        onImageError={onImageError}
                        columnKey="right"
                    />
                </>
            )}

            {/* 1열 레이아웃 (<600px) */}
            {columnCount === 1 && (
                <ArchiveColumn
                    images={[...leftColumn, ...middleColumn, ...rightColumn]}
                    startIndex={0}
                    imageErrors={imageErrors}
                    onImageError={onImageError}
                    columnKey="single"
                />
            )}
        </div>
    );
};

export default ArchiveGridLayout;
