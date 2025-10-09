import React, { useEffect, useRef, useState, useMemo } from "react";
import { LiaLongArrowAltLeftSolid } from "react-icons/lia";
import {
    meContent,
    visualIdentityContent,
    deanMessage,
    departmentHeadMessage,
    graduationCommitteeMessage,
} from "@/pages/about/constants/aboutContent";

// ✅ NEW: sec-0로 사용할 컴포넌트 임포트
import VideoSection from "@/pages/about/components/VideoSection";
import TextSection from "@/pages/about/components/TextSection";

const PAGE_H = 8400;
const GAP = 98;

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

/* ✅ TwoColumn */
const TwoColumn: React.FC<{
    title: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}> = ({ title, children, className = "" }) => (
    <div
        className={[
            "flex items-start justify-between gap-20 w-full max-w-[1720px] mt-[170px]",
            "max-[1350px]:max-w-[1260px]",
            "max-[1020px]:max-w-[960px] max-[1020px]:flex-col max-[1020px]:gap-8",
            "max-[600px]:max-w-[560px]",
            "max-[400px]:max-w-[360px]",
            className,
        ].join(" ")}
    >
        {/* 좌측 타이틀 */}
        <div
            className={[
                "w-[420px] shrink-0 pt-1",
                "max-[1020px]:w-full",
                "max-[600px]:text-center",
            ].join(" ")}
            style={{ minWidth: 0 }}
        >
            <h2
                className={[
                    "whitespace-pre-line font-bold leading-[1.1] tracking-[-0.01em]",
                    "text-[60px]",
                    "max-[600px]:text-[40px]",
                ].join(" ")}
            >
                {title}
            </h2>
        </div>

        {/* 우측 내용 */}
        <div
            className={[
                "shrink-0",
                "max-[1020px]:w-full",
                // 모바일도 좌정렬
                "max-[600px]:flex max-[600px]:flex-col max-[600px]:items-start",
            ].join(" ")}
            style={{ minWidth: 0 }}
        >
            {children}
        </div>
    </div>
);

/* 본문 텍스트 */
const BodyText: React.FC<{ text: string }> = ({ text }) => (
    <p
        className={[
            "whitespace-pre-line w-[720px] text-[#111] leading-[1.3] tracking-[-0.01em]",
            "text-[20px]",
            "max-[1020px]:w-full",
            "max-[600px]:text-[14px]",
            "max-[400px]:text-[14px]",
        ].join(" ")}
        style={{ wordBreak: "keep-all" }}
    >
        {text}
    </p>
);

/* ✅ StickyFrame */
const StickyFrame: React.FC<{ children: React.ReactNode; autoCenter?: boolean; id?: string }> = ({
    children,
    autoCenter = true,
    id,
}) => {
    const ref = useRef<HTMLDivElement>(null);
    useAutoCenterOnVisible(ref, autoCenter);

    return (
        <div id={id} className="relative flex justify-center w-full">
            <div className="sticky" style={{ top: "50vh" }}>
                <div
                    ref={ref}
                    className={[
                        "justify-center items-center flex w-full",
                        "h-[1080px]",
                        "max-[600px]:h-[635px]",
                        "max-[400px]:h-[725px]",
                    ].join(" ")}
                    style={{ maxWidth: "1720px" }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};

const SignatureBlock: React.FC<{ role: string; name: string; date: string }> = ({ role, name, date }) => (
    <div className="mt-10 text-left">
        <div className="text-[20px] leading-[1.2] max-[600px]:text-[14px]">{role}</div>
        <div className="mt-1 text-[32px] font-bold leading-[1.2] max-[600px]:text-[24px]">{name}</div>
        <div className="mt-1 text-[20px] leading-[1.2] max-[600px]:text-[14px]">{date}</div>
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

const advisorsAll = [...advisorsLeft, ...advisorsRight];

/* 팀 갤러리: 가로 스크롤 유지 */
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
            className="mt-10 overflow-x-auto overflow-y-hidden scrollbar-hide"
            onWheel={onWheel}
        >
            <div className="flex items-start gap-12 px-10 pr-14">
                {items.map(({ src, label }, i) => (
                    <figure key={src} className="flex flex-col items-center justify-start shrink-0" style={{ height: "689px" }}>
                        <figcaption className="mb-4 text-center text-[20px] font-medium max-[600px]:text-[14px]">
                            {label}
                        </figcaption>
                        <img
                            src={src}
                            alt={label}
                            className="h-[689px] max-[600px]:h-[433px] w-auto object-contain"
                            draggable={false}
                            loading={i > 2 ? "lazy" : "eager"}
                        />
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

/* ---------- 우측 점 네비 ---------- */
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
                                    <LiaLongArrowAltLeftSolid size={18} className="text-black animate-move-left" />
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
    const steps: Step[] = useMemo(
        () => [
            // ✅ NEW: sec-0(인트로) 추가
            { id: "sec-0", label: "INTRO" },
            { id: "sec-1", label: "ME" },
            { id: "sec-2", label: "VIDUAL IDENTITY" },
            { id: "sec-3", label: "예술대학장 인사말" },
            { id: "sec-4", label: "학과장 인사말" },
            { id: "sec-5", label: "지도 교수" },
            { id: "sec-6", label: "졸준위 인사말" },
            { id: "sec-7", label: "졸업구성원" },
        ],
        []
    );

    return (
        <>
            {/* ✅ NEW: sec-0 — 패딩/최대폭 래퍼 밖(=풀블리드) */}
            <div id="sec-0">
                <VideoSection />
                <TextSection />
            </div>

            {/* 기존 섹션: 여기부터는 페이지 패딩/최대폭 래퍼 사용 */}
            <section
                className={[
                    "relative mx-auto box-border w-full max-w-[1920px]",
                    "overflow-x-hidden",
                    "px-6 md:px-10 lg:px-[100px]",
                ].join(" ")}
                style={{ height: PAGE_H, paddingTop: 58, paddingBottom: 58 }}
            >
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
                        <TwoColumn title="지도 교수" className="max-[600px]:items-start">
                            {/* >=1021px: 2컬럼 그리드 */}
                            <div className="grid grid-cols-2 gap-x-24 gap-y-8 w-[720px] max-[1020px]:w-full max-[600px]:hidden">
                                <ul className="space-y-8">
                                    {advisorsLeft.map((p) => (
                                        <li key={p.name}>
                                            <div className="text-[18px] leading-[1.6] text-[#333] max-[600px]:text-[14px]">{p.role}</div>
                                            <div className="mt-1 text-[32px] font-extrabold leading-[1.4] max-[600px]:text-[24px]">{p.name}</div>
                                        </li>
                                    ))}
                                </ul>
                                <ul className="space-y-8">
                                    {advisorsRight.map((p) => (
                                        <li key={p.name}>
                                            <div className="text-[18px] leading-[1.6] text-[#333] max-[600px]:text-[14px]">{p.role}</div>
                                            <div className="mt-1 text-[32px] font-extrabold leading-[1.4] max-[600px]:text-[24px]">{p.name}</div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* ≤600px: 세로 리스트 */}
                            <div className="hidden max-[600px]:block w-full">
                                <ul className="flex flex-col gap-6">
                                    {advisorsAll.map((p) => (
                                        <li key={p.name} className="text-left">
                                            <div className="text-[24px] leading-[1.5] text-[#333]">{p.role}</div>
                                            <div className="mt-1 text-[24px] font-extrabold leading-[1.4]">{p.name}</div>
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

                    {/* 7) 졸업 구성원 */}
                    <StickyFrame id="sec-7">
                        <div className="w-full max-w-[1720px] mx-auto max-[1350px]:max-w-[1260px] max-[1020px]:max-w-[960px] max-[600px]:max-w-[560px] max-[400px]:max-w-[360px]">
                            <TwoColumn title="졸업구성원" className="mb-20 max-[600px]:items-start mt-[900px]">
                                {/* 데스크톱/태블릿: 본문과 동일하게 20px, 모바일 14px */}
                                <div className="w-[714px] max-[1020px]:w-full">
                                    <div className="text-[20px] max-[600px]:text-[14px] leading-[1.9]">
                                        {memberLines.map((m) => (
                                            <div
                                                key={m.role}
                                                className="
                          grid items-center
                          grid-cols-[110px_1fr] gap-x-6
                          max-[600px]:grid-cols-[84px_1fr] max-[600px]:gap-x-4
                          mb-2
                        "
                                            >
                                                {/* 팀명: 굵게 + 오른쪽 정렬(고정폭) */}
                                                <span className="font-bold text-left break-keep">{m.role}</span>
                                                {/* 이름: 왼쪽 정렬 + 자연 줄바꿈 */}
                                                <span className="break-keep whitespace-normal">{m.names}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </TwoColumn>

                            <div className="mt-10">
                                <HorizontalGallery items={teamImages} />
                            </div>
                        </div>
                    </StickyFrame>
                </div>
            </section>
        </>
    );
};

export default AboutInfoSection;