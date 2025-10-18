// VideoSection.tsx
import { useEffect, useRef } from 'react';

/**
 * 영상이 들어가는 섹션 컴포넌트
 *
 * 기능: 섹션 진입 시 비디오 재생, 섹션 이탈 시 비디오 정지
 */
const VideoSection = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const video = videoRef.current;

        if (!section || !video) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // 섹션이 보일 때 비디오 재생 (처음부터)
                        video.currentTime = 0;
                        video.play().catch(console.error);
                    } else {
                        // 섹션이 안 보일 때 비디오 정지
                        video.pause();
                    }
                });
            },
            { threshold: 0.5 } // 50% 이상 보일 때 트리거
        );

        observer.observe(section);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <section ref={sectionRef} className="w-full max-w-[1920px] mx-auto bg-gray-200 relative overflow-hidden">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 비율 */ }}>
                <video
                    ref={videoRef}
                    className="absolute inset-0 w-full h-full object-cover"
                    playsInline
                    loop
                >
                    <source src="/about/Comp 1_1.mp4" type="video/mp4" />
                </video>
            </div>
        </section>
    );
};

export default VideoSection;