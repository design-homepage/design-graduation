import React from 'react';
import ArchiveImage from './ArchiveImage';

interface ArchiveColumnProps {
    images: string[];
    startIndex: number;
    imageErrors: Set<number>;
    onImageError: (index: number) => void;
    _index?: number;
}

const ArchiveColumn: React.FC<ArchiveColumnProps> = ({
    images,
    startIndex,
    imageErrors,
    onImageError
}) => {
    return (
        <div style={{ flex: 1 }}>
            {images.map((imagePath, index) => (
                <figure key={imagePath} style={{
                    overflow: 'hidden',
                    boxShadow: '0px 4px 10px 0px rgba(0, 0, 0, 0.1)',
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
