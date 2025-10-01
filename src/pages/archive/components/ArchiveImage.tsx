import React from 'react';

interface ArchiveImageProps {
    src: string;
    alt: string;
    onError: () => void;
    hasError: boolean;
}

const ArchiveImage: React.FC<ArchiveImageProps> = ({ src, alt, onError, hasError }) => {
    if (hasError) {
        return (
            <div style={{
                width: '100%',
                aspectRatio: '4 / 3',
                background: 'repeating-linear-gradient(-45deg, #e5e7eb 0px, #e5e7eb 8px, #f3f4f6 8px, #f3f4f6 16px)'
            }} />
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            onError={onError}
            loading="eager"
            decoding="sync"
            style={{
                display: 'block',
                width: '100%',
                height: 'auto',
                objectFit: 'cover'
            }}
        />
    );
};

export default ArchiveImage;
