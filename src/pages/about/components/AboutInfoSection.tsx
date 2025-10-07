import React, { useEffect, useRef, useState, useMemo } from "react";
import { LiaLongArrowAltLeftSolid } from "react-icons/lia";
import {
    meContent,
    visualIdentityContent,
    deanMessage,
    departmentHeadMessage,
    graduationCommitteeMessage,
} from "@/pages/about/constants/aboutContent";

const PAGE_W = 1920;
const PAGE_H = 8400;
const PAD_X = 100;
const PAD_Y = 58;
const GAP = 98;

const PANEL_W = 1720;
const PANEL_H = 1080;

/* 50% 이상 보이면 가운데로 살짝 스크롤 (옵션) */
function useAutoCenterOnVisible(ref: React.RefObject<HTMLElement>, enabled = true) {
    useEffect(() => {
        if (!enabled || !ref.current) return;
        let timer: number | null = null;
        const el = ref.current;
        const io = new IntersectionObserver(
            (entries) => {
                const e = entries[0];
                if (!e.isIntersecting) return;
                if (e.intersectionRatio >= 0.1) {
                    if (timer) window.clearTimeout(timer);
                    timer = window.setTimeout(() => {
                        el.scrollIntoView({ behavior: "smooth", block: "center" });
                    }, 80);
                }
            },
            { threshold: [0.1] }
        );
        io.observe(el);
        return () => {
            if (timer) window.clearTimeout(timer);
            io.disconnect();
        };
    }, [ref, enabled]);
}

/* ✅ mx-auto 없이, 좌/우 space-between 레이아웃 */
const TwoColumn: React.FC<{
    title: React.ReactNode;
    children: React.ReactNode;
    className?: string;
    center?: boolean; // 호환성 유지용(미사용)
}> = ({ title, children, className = "" }) => (
    <div className={`flex items-start justify-between mt-[170px] gap-20 w-[1720px] ${className}`}>
        {/* 좌측 타이틀 고정폭 420px */}
        <div className="w-[420px] shrink-0 pt-1">
            <h2 className="whitespace-pre-line text-[60px] font-bold leading-[1.1] tracking-[-0.01em]">
                {title}
            </h2>
        </div>
        {/* 우측 내용: 내부에서 폭을 제어(예: BodyText w-[720px]) */}
        <div className="shrink-0">{children}</div>
    </div>
);

const BodyText: React.FC<{ text: string }> = ({ text }) => (
    <p className="whitespace-pre-line w-[720px] text-[20px] tracking-[-0.01em] text-[#111]">
        {text}
    </p>
);

/* ✅ 진짜 중앙 sticky (그대로 유지) — id를 받아서 앵커로 사용 */
const StickyFrame: React.FC<{ children: React.ReactNode; autoCenter?: boolean; id?: string }> = ({
    children,
    autoCenter = true,
    id,
}) => {
    const ref = useRef<HTMLDivElement>(null);
    useAutoCenterOnVisible(ref, autoCenter);

    return (
        <div id={id} className="relative flex justify-center">
            {/* sticky를 뷰포트 중앙(50vh)에 두고 */}
            <div className="sticky" style={{ top: "50vh" }}>
                {/* 실제 패널은 위로 50% 당겨 정확히 세로 중앙 정렬 */}
                <div ref={ref} className="justify-center items-center flex" style={{ width: PANEL_W, height: PANEL_H }}>
                    {children}
                </div>
            </div>
        </div>
    );
};

const SignatureBlock: React.FC<{ role: string; name: string; date: string }> = ({ role, name, date }) => (
    <div className="mt-10 text-left">
        <div className="text-[20px] leading-[1.2]">{role}</div>
        <div className="mt-1 text-[32px] font-bold leading-[1.2]">{name}</div>
        <div className="mt-1 text-[20px] leading-[1.2]">{date}</div>
    </div>
);

const advisorsLeft = [
    { role: "경북대학교 예술대학 학장", name: "조철희" },
    { role: "경북대학교 디자인학과 교수", name: "이경용" },
    { role: "경북대학교 디자인학과 교수", name: "이재민" },
];
const advisorsRight = [
    { role: "경북대학교 디자인학과 학과장", name: "김성년" },
    { role: "경북대학교 디자인학과 교수", name: "안지선" },
];

/* 가로 갤러리: 스냅 없음, 원본 크기, 최대 높이 689px */
const HorizontalGallery: React.FC<{ items: { src: string; label: string }[] }> = ({ items }) => {
    const onWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
        const el = e.currentTarget;
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            el.scrollLeft += e.deltaY;
            e.preventDefault();
        }
    };
    return (
        <div
            className="
        mt-10 overflow-x-auto overflow-y-hidden
        [scrollbar-width:thin]
        [&::-webkit-scrollbar]:h-2
        [&::-webkit-scrollbar-thumb]:bg-neutral-400/50
        [&::-webkit-scrollbar-track]:bg-transparent
      "
            onWheel={onWheel}
        >
            <div className="flex items-start gap-12 px-10 pr-14">
                {items.map(({ src, label }, i) => (
                    <figure key={src} className="flex flex-col items-center justify-start shrink-0" style={{ height: "689px" }}>
                        <figcaption className="mb-4 text-center text-[20px] font-medium">{label}</figcaption>
                        <img src={src} alt={label} className="max-h-[689px]" draggable={false} loading={i > 2 ? "lazy" : "eager"} />
                    </figure>
                ))}
            </div>
        </div>
    );
};

const memberLines = [
    { role: "기획팀", names: "안수아 강현정 권민정 박소연" },
    { role: "그래픽팀", names: "김승화 김은지 강유진 김도영 안수아 정환이" },
    { role: "영상팀", names: "강유진 김주훈 박수민 박혜연 박현건 오지홍" },
    { role: "편집팀", names: "김도영 김민구 이지혁 전윤서 정현진" },
    { role: "웹팀", names: "정환이 신유빈 원민정 오서현 이윤서" },
];

const teamImages = [
    { src: "/about/team-profiles/기획팀.jpg", label: "기획팀" },
    { src: "/about/team-profiles/그래픽팀.jpg", label: "그래픽팀" },
    { src: "/about/team-profiles/영상팀.jpeg", label: "영상팀" },
    { src: "/about/team-profiles/편집팀.jpg", label: "편집팀" },
    { src: "/about/team-profiles/웹팀.jpg", label: "웹팀" },
];

/* ---------- 우측 점 네비 (현재 섹션: MoveLeft) ---------- */
type Step = { id: string; label: string };

const RightDotNav: React.FC<{ steps: Step[] }> = ({ steps }) => {
    const [active, setActive] = useState(0);

    useEffect(() => {
        const observers: IntersectionObserver[] = [];
        steps.forEach((s, idx) => {
            const el = document.getElementById(s.id);
            if (!el) return;
            const io = new IntersectionObserver(
                (entries) => {
                    const e = entries[0];
                    if (e.isIntersecting) setActive(idx);
                },
                { threshold: 0.3, rootMargin: "-30% 0px -30% 0px" }
            );
            io.observe(el);
            observers.push(io);
        });
        return () => observers.forEach((o) => o.disconnect());
    }, [steps]);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    return (
        <>
            <style>{`
        @keyframes move-left {
          from { transform: translateX(6px); opacity: 0; }
          to   { transform: translateX(0);   opacity: 1; }
        }
        .animate-move-left { animation: move-left 0.35s ease-out; }
      `}</style>

            <div className="fixed right-6 top-1/2 z-50 -translate-y-1/2 select-none">
                <div className="flex flex-col items-center gap-5 p-0">
                    {steps.map((s, i) => {
                        const isActive = active === i;
                        return (
                            <button
                                key={`${s.id}-${active}`}
                                onClick={() => scrollTo(s.id)}
                                aria-label={s.label}
                                className={`relative flex items-center justify-center transition-all duration-300 ${isActive ? "h-[20px] w-[20px]" : "h-[8px] w-[8px]"
                                    }`}
                            >
                                {isActive ? (
                                    <LiaLongArrowAltLeftSolid
                                        size={18}
                                        className="text-black animate-move-left"
                                    />
                                ) : (
                                    <span className="h-[8px] w-[8px] rounded-full bg-black hover:bg-black/10 transition" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

/* ---------- 메인 컴포넌트 ---------- */
const AboutInfoSection: React.FC = () => {
    // 네비 단계(0~8 중, 여기선 1~8만 — Video/Text용 맨위 버튼은 요구사항상 제외)
    const steps: Step[] = useMemo(
        () => [
            { id: "sec-1", label: "ME" },
            { id: "sec-2", label: "VIDUAL IDENTITY" },
            { id: "sec-3", label: "예술대학장 인사말" },
            { id: "sec-4", label: "학과장 인사말" },
            { id: "sec-5", label: "지도 교수" },
            { id: "sec-6", label: "졸준위 인사말" },
            { id: "sec-7", label: "졸업구성원 텍스트" },
            { id: "sec-8", label: "졸업구성원 갤러리" },
        ],
        []
    );

    return (
        <section className="relative mx-auto box-border" style={{ width: PAGE_W, height: PAGE_H, padding: `${PAD_Y}px ${PAD_X}px` }}>
            {/* 우측 점 네비 */}
            <RightDotNav steps={steps} />

            <div className="flex h-full flex-col" style={{ rowGap: GAP }}>
                {/* 1) ME */}
                <StickyFrame id="sec-1">
                    <TwoColumn title="ME">
                        <BodyText text={meContent} />
                    </TwoColumn>
                </StickyFrame>

                {/* 2) VIDUAL IDENTITY */}
                <StickyFrame id="sec-2">
                    <TwoColumn title={"VIDUAL\nIDENTITY"}>
                        <BodyText text={visualIdentityContent} />
                    </TwoColumn>
                </StickyFrame>

                {/* 3) 예술대학장 인사말 */}
                <StickyFrame id="sec-3">
                    <TwoColumn title={"예술대학장\n인사말"}>
                        <BodyText text={deanMessage.split("\n\n예술대학 학장")[0]} />
                        <SignatureBlock role="예술대학 학장" name="조철희" date="2025년 10월" />
                    </TwoColumn>
                </StickyFrame>

                {/* 4) 학과장 인사말 */}
                <StickyFrame id="sec-4">
                    <TwoColumn title={"학과장 인사말"}>
                        <BodyText text={departmentHeadMessage.split("\n\n디자인학과 학과장")[0]} />
                        <SignatureBlock role="디자인학과 학과장" name="김성년" date="2025년 10월" />
                    </TwoColumn>
                </StickyFrame>

                {/* 5) 지도 교수 */}
                <StickyFrame id="sec-5">
                    <TwoColumn title="지도 교수">
                        <div className="grid grid-cols-2 gap-x-24 gap-y-8 w-[720px]">
                            <ul className="space-y-8">
                                {advisorsLeft.map((p) => (
                                    <li key={p.name}>
                                        <div className="text-[18px] leading-[1.6] text-[#333]">{p.role}</div>
                                        <div className="mt-1 text-[32px] font-extrabold leading-[1.4]">{p.name}</div>
                                    </li>
                                ))}
                            </ul>
                            <ul className="space-y-8">
                                {advisorsRight.map((p) => (
                                    <li key={p.name}>
                                        <div className="text-[18px] leading-[1.6] text-[#333]">{p.role}</div>
                                        <div className="mt-1 text-[32px] font-extrabold leading-[1.4]">{p.name}</div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </TwoColumn>
                </StickyFrame>

                {/* 6) 졸준위 인사말 */}
                <StickyFrame id="sec-6">
                    <TwoColumn title={"졸준위 인사말"}>
                        <BodyText text={graduationCommitteeMessage.split("\n\n졸업준비위원회 위원장")[0]} />
                        <SignatureBlock role="졸업준비위원회 위원장" name="김승화" date="2025년 10월" />
                    </TwoColumn>
                </StickyFrame>

                {/* 7) 졸업 구성원 — 중앙 sticky + 가로 스크롤만 (텍스트) */}
                <StickyFrame id="sec-7">
                    <div className="w-[1720px] mx-auto">
                        <TwoColumn title="졸업구성원" className="mb-0">
                            <div className="grid grid-cols-2 gap-y-3 text-[20px] leading-[1.9]">
                                {memberLines.map((m) => (
                                    <div key={m.role} className="flex gap-6">
                                        <span className="w-[90px] font-semibold">{m.role}</span>
                                        <span>{m.names}</span>
                                    </div>
                                ))}
                            </div>
                        </TwoColumn>
                    </div>
                </StickyFrame>

                {/* 8) 졸업 구성원 — 갤러리(가로 스크롤) */}
                <StickyFrame id="sec-8">
                    <div className="w-[1720px] mx-auto">
                        <HorizontalGallery items={teamImages} />
                    </div>
                </StickyFrame>
            </div>
        </section>
    );
};

export default AboutInfoSection;