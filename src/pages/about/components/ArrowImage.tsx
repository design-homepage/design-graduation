import React from 'react';

/**
 * About 페이지의 화살표 이미지 컴포넌트
 * 배경 블러 효과가 적용된 화살표 이미지
 */
interface ArrowImageProps {
    className?: string;
}

const ArrowImage: React.FC<ArrowImageProps> = ({ className }) => {
    return (
        <div className={`mt-8 w-full relative ${className || ''}`}>
            <div
                className="absolute inset-0 z-10"
                style={{
                    backdropFilter: 'blur(19px)',
                    WebkitBackdropFilter: 'blur(19px)'
                }}
            ></div>
            <img
                src="/about/어바웃:배경.png"
                alt="화살표 배경"
                className="w-full h-auto relative z-20"
            />
        </div>
    );
};

export default ArrowImage;
