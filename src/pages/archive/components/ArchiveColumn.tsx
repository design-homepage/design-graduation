import React from 'react';
import ArchiveImage from './ArchiveImage';

interface ArchiveColumnProps {
    images: string[];
    startIndex: number;
    imageErrors: Set<number>;
    onImageError: (index: number) => void;
    columnKey: string;
}

const ArchiveColumn: React.FC<ArchiveColumnProps> = ({
    images,
    startIndex,
    imageErrors,
    onImageError,
    columnKey
}) => {
    return (
        <div style={{ flex: 1 }}>
            {images.map((imagePath, index) => (
                <figure key={`${columnKey}-${index}`} style={{
                    overflow: 'hidden',
                    boxShadow: '0px 4px 4px 0px #00000040',
                    marginBottom: '20px',
                    position: 'relative'
                }}>
                    <ArchiveImage
                        src={imagePath}
                        alt={`Archive image ${startIndex + index + 1}`}
                        onError={() => onImageError(startIndex + index)}
                        hasError={imageErrors.has(startIndex + index)}
                    />
                </figure>
            ))}
        </div>
    );
};

export default ArchiveColumn;
