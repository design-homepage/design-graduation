import React, { useEffect, useRef, useState } from "react";

/**
 * 스크롤 구간/치수 (px)
 * - 전체 섹션 높이: 6817
 * - 텍스트 고정 영역: 1280
 * - 이미지 높이: 3341
 * - 트리거: start=100, overlay=START_MOVE, end=overlay+IMG_H
 */
const TEXT_H = 1280;
const IMG_H = 3341;

const START_MOVE = 100;                 // 이미지 이동 시작
const OVERLAY_START = START_MOVE;       // 블러 시작(이미지와 동시)
const MOVE_END = OVERLAY_START + IMG_H; // 이미지 이동 종료
const SECTION_H = MOVE_END;

const clamp = (v: number, min: number, max: number) =>
    Math.max(min, Math.min(max, v));

const TextSection: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const [offset, setOffset] = useState(0); // 섹션 로컬 스크롤 오프셋(px)

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

    // 이미지 translateY 계산 (위로 이동 = 음수)
    const moveAmount = clamp(offset - START_MOVE, 0, IMG_H); // 0 → 3341
    const imageTranslateY = -moveAmount;

    // 블러 활성 구간: 이미지가 진행하는 동안(동시 시작~동시 끝)
    const blurActive = offset >= OVERLAY_START && offset <= MOVE_END;

    return (
        <section
            ref={sectionRef}
            className="relative w-full overflow-visible"
            style={{ height: SECTION_H }}
            aria-label="About page text & image scroll section"
        >
            {/* 텍스트 고정 레이어 (z-10) */}
            <div
                className="sticky top-0 z-10 flex h-screen items-center justify-center"
                style={{ height: TEXT_H }}
            >
                <div className="relative w-full max-w-[1920px] px-8 md:px-16 lg:px-24">
                    <div className="space-y-8">
                        <h2 className="text-[min(12.5vw,200px)] leading-[0.95] font-extrabold text-black text-left">
                            나를 통해
                        </h2>
                        <h2 className="text-[min(12.5vw,200px)] leading-[0.95] font-extrabold text-black text-center">
                            우리가 되고
                        </h2>
                        <h2 className="text-[min(12.5vw,200px)] leading-[0.95] font-extrabold text-black text-center">
                            우리 안에서
                        </h2>
                        <h2 className="text-[min(12.5vw,200px)] leading-[0.95] font-extrabold text-black text-right">
                            나를 본다
                        </h2>
                    </div>
                </div>
            </div>

            {/* ====== 이동 그룹: 오버레이(중간) + 이미지(맨 위) ====== */}
            <div
                className="absolute left-1/2 z-20 "
                style={{
                    top: TEXT_H,                         // 텍스트 바로 아래에서 시작
                    width: 1920,
                    height: IMG_H,
                    transform: `translate(-50%, ${imageTranslateY}px)`,
                    willChange: "transform",
                }}
            >
                {/* 🔹 배경 블러 오버레이 (텍스트 위, 이미지 아래) */}
                <div
                    className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-200 ${blurActive ? "opacity-100" : "opacity-0"
                        }`}
                    style={{
                        backdropFilter: "blur(19px)",
                        WebkitBackdropFilter: "blur(19px)",
                        backgroundColor: "rgba(255,255,255,0.06)", // 살짝 안개 느낌 (옵션)
                    }}
                    aria-hidden
                />

                {/* 🔹 이미지 (오버레이 위) */}
                <img
                    src="/about/about-background.webp"
                    alt="About background"
                    className="absolute inset-0 z-20 h-full w-full object-cover"
                    draggable={false}
                />
            </div>
        </section>
    );
};

export default TextSection;