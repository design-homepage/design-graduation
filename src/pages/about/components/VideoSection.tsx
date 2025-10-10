// VideoSection.tsx
import React from "react";

/**
 * 영상이 들어가는 회색 섹션 컴포넌트
 *
 * 크기: 가로 1920px, 세로 914px (비율 유지)
 * 배경색: 회색 (#f5f5f5)
 * 반응형: 화면 크기에 따라 비율 유지하면서 자동 축소
 */
const VideoSection = () => {
    return (
        <section className="w-full max-w-[1920px] mx-auto bg-gray-200 relative overflow-hidden">
            {/* aspect-ratio로 비율 고정 */}
            <div className="relative w-full" style={{ aspectRatio: "1920 / 914" }}>
                {/* 배경 비디오 */}
                <video
                    className="absolute inset-0 h-full w-full object-cover"
                    playsInline
                    autoPlay
                    muted
                    loop
                    poster="/about/video-placeholder.jpg"
                >
                    {/* <source src="/about/your-video.mp4" type="video/mp4" /> */}
                </video>

                {/* 오버레이 효과 */}
                <div
                    className="absolute inset-0 flex items-center justify-center z-[1]"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
                >
                    <div className="text-white text-center">
                        <p className="text-xl max-[1020px]:text-lg max-[600px]:text-base">
                            Video Section
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VideoSection;