import React, { useEffect, useMemo, useRef, useState } from 'react';

interface ArchiveImageProps {
    src: string;
    alt: string;
    onError: () => void;
    hasError: boolean;
}

const ArchiveImage: React.FC<ArchiveImageProps> = ({ src, alt, onError, hasError }) => {
    const isVideo = /\.mp4(\?|$)/i.test(src);
    const [retryToken, setRetryToken] = useState<string>('');
    const hasRetriedRef = useRef<boolean>(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isInView, setIsInView] = useState<boolean>(false);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            if (entry && entry.isIntersecting) {
                setIsInView(true);
                observer.disconnect();
            }
        }, { rootMargin: '200px' });
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const currentSrc = useMemo(() => {
        if (!retryToken) return src;
        const joiner = src.includes('?') ? '&' : '?';
        return `${src}${joiner}v=${retryToken}`;
    }, [src, retryToken]);

    const handleError = () => {
        if (!hasRetriedRef.current) {
            hasRetriedRef.current = true;
            setRetryToken(String(Date.now()));
            return; // retry once silently
        }
        onError();
    };

    if (hasError || !isInView) {
        return (
            <div ref={containerRef} style={{
                width: '100%',
                aspectRatio: '4 / 3',
                background: 'repeating-linear-gradient(-45deg, #e5e7eb 0px, #e5e7eb 8px, #f3f4f6 8px, #f3f4f6 16px)'
            }} />
        );
    }

    if (isVideo) {
        return (
            <video
                src={currentSrc}
                onError={handleError}
                autoPlay
                loop
                playsInline
                preload="metadata"
                style={{
                    display: 'block',
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover'
                }}
            />
        );
    }

    return (
        <img
            src={currentSrc}
            alt={alt}
            onError={handleError}
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            style={{
                display: 'block',
                width: '100%',
                height: 'auto',
                objectFit: 'cover'
            }}
        />
    );
};

export default React.memo(ArchiveImage);
