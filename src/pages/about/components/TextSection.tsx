// TextSection.tsx
import React, { useEffect, useRef, useState } from "react";

const TEXT_H = 1280;
const IMG_H = 3341;
const START_MOVE = 100;
const OVERLAY_START = START_MOVE;
const MOVE_END = OVERLAY_START + IMG_H;
const SECTION_H = MOVE_END;

const clamp = (v: number, min: number, max: number) =>
    Math.max(min, Math.min(max, v));

const TextSection: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        let ticking = false;

        const update = () => {
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const docScrolledFromTop = window.scrollY || window.pageYOffset;
            const sectionTop = docScrolledFromTop + rect.top;
            const local = clamp(docScrolledFromTop - sectionTop, 0, SECTION_H);
            setOffset(local);
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(update);
            }
        };

        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);

    const moveAmount = clamp(offset - START_MOVE, 0, IMG_H);
    const imageTranslateY = -moveAmount;
    const blurActive = offset >= OVERLAY_START && offset <= MOVE_END;

    return (
        <section
            ref={sectionRef}
            className="relative w-full overflow-visible"
            style={{ height: SECTION_H }}
            aria-label="About page text & image scroll section"
        >
            {/* 텍스트 고정 영역 */}
            <div
                className="sticky top-0 z-10 flex h-screen items-center justify-center"
                style={{ height: TEXT_H }}
            >
                <div className="relative w-full max-w-[1920px] px-8 md:pb-16 lg:pb-24">
                    <div
                        className={`
                        space-y-0
                        min-[1600px]:-space-y-8
                        leading-[0.95]
                        font-black text-black
                        max-[600px]:text-center
                    `}
                    >
                        <h2
                            className="
                            font-black
                        text-left max-[600px]:text-center
                        text-[min(12.5vw,200px)] max-[1020px]:text-[120px] max-[600px]:!text-[70px]
                        "
                        >
                            나를 통해
                        </h2>

                        <h2
                            className="
                            font-black
                        text-center
                        text-[min(12.5vw,200px)] max-[1020px]:text-[120px] max-[600px]:!text-[70px]
                        "
                        >
                            우리가 되고
                        </h2>

                        <h2
                            className="
                            font-black
                        text-center
                        text-[min(12.5vw,200px)] max-[1020px]:text-[120px] max-[600px]:!text-[70px]
                        "
                        >
                            우리 안에서
                        </h2>

                        <h2
                            className="
                            font-black
                        text-right max-[600px]:text-center
                        text-[min(12.5vw,200px)] max-[1020px]:text-[120px] max-[600px]:!text-[70px]
                        "
                        >
                            나를 본다
                        </h2>
                    </div>
                </div>
            </div>

            {/* 이동 그룹 — 가로폭(100vw) 기준으로 비율 유지 */}
            <div
                className="absolute left-1/2 z-20 w-[100vw] max-w-full"
                style={{
                    top: TEXT_H,
                    // 1920 기준 IMG_H(3341px)의 비율을 그대로 유지: 높이 = 100vw * (3341/1920)
                    height: `calc(100vw * ${IMG_H / 1920})`,
                    transform: `translate(-50%, ${imageTranslateY}px)`,
                    willChange: "transform",
                }}
            >
                {/* 오버레이 (이미지 영역 전체를 덮도록 그대로 유지) */}
                <div
                    className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-200 ${blurActive ? "opacity-100" : "opacity-0"
                        }`}
                    style={{
                        backdropFilter: "blur(19px)",
                        WebkitBackdropFilter: "blur(19px)",
                        backgroundColor: "rgba(255,255,255,0.06)",
                    }}
                />

                {/* 이미지: 가로 100vw에 맞추고, 세로는 비율대로 자동 */}
                <img
                    src="/about/about-background.webp"
                    alt="About background"
                    className="absolute left-1/2 top-0 -translate-x-1/2 z-20 w-[100vw] h-auto object-contain"
                    draggable={false}
                />
            </div>
        </section>
    );
};

export default TextSection;