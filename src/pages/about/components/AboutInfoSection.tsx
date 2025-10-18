import React, { useEffect, useState, useMemo } from "react";
import { LiaLongArrowAltLeftSolid } from "react-icons/lia";
import {
    meContent,
    visualIdentityContent,
    deanMessage,
    departmentHeadMessage,
    graduationCommitteeMessage,
} from "@/pages/about/constants/aboutContent";

import VideoSection from "@/pages/about/components/VideoSection";
import TextSection from "@/pages/about/components/TextSection";

// ✅ 헤더 높이 계산 함수 (반응형)
const getHeaderHeight = () => {
    if (typeof window === 'undefined') return 170; // SSR 기본값

    const width = window.innerWidth;
    if (width >= 1024) return 170; // lg: 170px
    if (width >= 768) return 124;  // md: 124px
    if (width >= 640) return 108;  // sm: 108px
    return 104; // 기본: 104px
};

// 전체 높이를 콘텐츠에 맞게 자동 설정 (자연스러운 페이지 흐름)
const getPageHeight = () => {
    if (typeof window === 'undefined') return 8000; // 기본값

    const headerHeight = getHeaderHeight();
    const viewportHeight = window.innerHeight;

    // 자연스러운 페이지 높이 설정 (콘텐츠에 맞춤)
    // 각 섹션이 화면 높이에 맞게 배치되도록 함
    const estimatedSections = 7; // 전체 섹션 수
    const averageSectionHeight = viewportHeight * 0.8; // 화면의 80% 정도

    return Math.round(estimatedSections * averageSectionHeight + headerHeight + 1000);
};

const PAGE_H = getPageHeight();
const GAP = 98;

// ✅ 섹션 높이 계산 함수 (뷰포트 높이 - 헤더 높이)
const getSectionHeight = () => {
    if (typeof window === 'undefined') return 'calc(100vh - 170px)';

    const headerHeight = getHeaderHeight();
    return `calc(100vh - ${headerHeight}px)`;
};

/* ✅ 스크롤 자동 정렬 제거 또는 비활성화 */
// ✨ 수정 요약
// - Slick 스타일로 휠 한 번에 한 섹션만 이동하도록 개선
// - sec-0 포함하여 전 구간 이동 가능하도록 개선

// 🧠 주요 수정 포인트:
// 1. 섹션 순서를 DOM 기준이 아니라 sectionId 기준으로 관리
// 2. sec-0 도 포함한 슬라이드 순서 유지
// 3. 휠 이벤트 시 정확히 한 섹션만 이동하고, wheelLock 제어 강화

// ✅ 변경된 useSmoothSectionAlignment 함수만 수정

function useSmoothSectionAlignment() {
    useEffect(() => {
        const sectionIds = [
            "sec-0", "sec-1", "sec-2", "sec-3", "sec-4", "sec-5", "sec-6", "sec-7"
        ];

        const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
        if (sections.length === 0) return;

        let currentIndex = 0;
        let wheelLock = false;

        const getScrollTarget = (index: number) => {
            const el = sections[index];
            const rect = el.getBoundingClientRect();
            const elementTop = window.scrollY + rect.top;
            // sec-0는 상단 정렬로 비디오가 완전히 보이도록 처리
            if (index === 0) return Math.max(0, elementTop);
            // 나머지는 중앙 정렬
            const offset = elementTop - (window.innerHeight - rect.height) / 2;
            return Math.max(0, offset);
        };

        const getCurrentIndexByScroll = () => {
            let idx = 0;
            let minDist = Number.POSITIVE_INFINITY;
            const currentY = window.scrollY;
            // sec-1의 시작점 이전까지는 무조건 sec-0으로 간주하여 스냅 비활성 상태 유지
            if (sections[1]) {
                const sec1Rect = sections[1].getBoundingClientRect();
                const sec1Top = window.scrollY + sec1Rect.top;
                if (currentY < sec1Top - 1) return 0;
            }
            sections.forEach((el, i) => {
                const rect = el.getBoundingClientRect();
                const elementTop = window.scrollY + rect.top;
                const targetY = i === 0
                    ? elementTop
                    : elementTop - (window.innerHeight - rect.height) / 2;
                const dist = Math.abs(currentY - targetY);
                if (dist < minDist) {
                    minDist = dist;
                    idx = i;
                }
            });
            return idx;
        };

        // 초기 진입 시 현재 스크롤 위치 기준으로 인덱스 설정
        currentIndex = getCurrentIndexByScroll();

        const goToSection = (index: number) => {
            if (index < 0 || index >= sections.length) return;
            const scrollY = getScrollTarget(index);
            window.scrollTo({ top: scrollY, behavior: "smooth" });
            currentIndex = index;
        };

        const handleWheel = (e: WheelEvent) => {
            if (wheelLock) return;

            // 현재 스크롤 위치 기준으로 섹션 인덱스 동기화
            currentIndex = getCurrentIndexByScroll();

            const direction = e.deltaY > 0 ? 1 : -1;
            const isAtTopEdge = currentIndex === 0 && direction < 0;
            const isAtBottomEdge = currentIndex === sections.length - 1 && direction > 0;

            // sec-0에서는 자연 스크롤 유지 (스냅 비활성)
            if (currentIndex === 0) return;

            // 맨 위/맨 아래에선 기본 스크롤 허용 (비디오/푸터 접근)
            if (isAtTopEdge || isAtBottomEdge) return;

            // 먼저 현재 섹션을 중앙으로 정렬한 뒤, 그 다음 입력에서 다음 섹션으로 이동
            const currentTarget = getScrollTarget(currentIndex);
            const distanceToCurrent = Math.abs((window.scrollY || 0) - currentTarget);
            if (distanceToCurrent > 60) {
                e.preventDefault();
                wheelLock = true;
                goToSection(currentIndex);
                setTimeout(() => (wheelLock = false), 700);
                return;
            }

            const nextIndex = currentIndex + direction;
            if (nextIndex >= 0 && nextIndex < sections.length) {
                e.preventDefault();
                wheelLock = true;
                goToSection(nextIndex);
                setTimeout(() => (wheelLock = false), 700);
            }
        };

        const handleKey = (e: KeyboardEvent) => {
            if (wheelLock) return;

            // 현재 스크롤 위치 기준으로 섹션 인덱스 동기화
            currentIndex = getCurrentIndexByScroll();

            if (["PageDown", "ArrowDown", "ArrowRight"].includes(e.key)) {
                const isAtBottomEdge = currentIndex === sections.length - 1;
                if (currentIndex === 0 || isAtBottomEdge) return; // sec-0 및 마지막 섹션에서는 기본 스크롤 허용
                // 먼저 현재 섹션 중앙 정렬
                const currentTarget = getScrollTarget(currentIndex);
                const distanceToCurrent = Math.abs((window.scrollY || 0) - currentTarget);
                if (distanceToCurrent > 60) {
                    e.preventDefault();
                    wheelLock = true;
                    goToSection(currentIndex);
                    setTimeout(() => (wheelLock = false), 700);
                    return;
                }
                e.preventDefault();
                handleWheel({ deltaY: 1 } as WheelEvent);
            }
            if (["PageUp", "ArrowUp", "ArrowLeft"].includes(e.key)) {
                const isAtTopEdge = currentIndex === 0;
                if (isAtTopEdge) return; // 비디오 상단 접근 허용
                // 먼저 현재 섹션 중앙 정렬
                const currentTarget = getScrollTarget(currentIndex);
                const distanceToCurrent = Math.abs((window.scrollY || 0) - currentTarget);
                if (distanceToCurrent > 60) {
                    e.preventDefault();
                    wheelLock = true;
                    goToSection(currentIndex);
                    setTimeout(() => (wheelLock = false), 700);
                    return;
                }
                e.preventDefault();
                handleWheel({ deltaY: -1 } as WheelEvent);
            }
        };

        window.addEventListener("wheel", handleWheel, { passive: false });
        window.addEventListener("keydown", handleKey);

        return () => {
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("keydown", handleKey);
        };
    }, []);
}

/* ✅ 2단 그리드 기반 TwoColumn (justify-between 사용) */
const TwoColumn: React.FC<{
    title: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}> = ({ title, children, className = "" }) => (
    <div
        className={[
            // 2단 그리드 설정 (타이틀 | 본문)
            "grid w-full justify-between",
            "grid-cols-2 gap-x-20", // 2컬럼, 넓은 간격
            "max-[1020px]:grid-cols-1 max-[1020px]:gap-y-8",
            className,
        ].join(" ")}
    >
        {/* 좌측 타이틀 - 1번 컬럼 */}
        <div
            className={[
                "flex-shrink-0 pt-[100px]", // 상단 패딩 100px 추가
                "max-[1020px]:w-full",
            ].join(" ")}
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

        {/* 우측 내용 - 2번 컬럼 */}
        <div
            className={[
                "flex-shrink-0",
                "max-[1020px]:w-full",
            ].join(" ")}
        >
            {children}
        </div>
    </div>
);

/* 본문 텍스트 */
const BodyText: React.FC<{ text: string }> = ({ text }) => (
    <div className={[
        "w-full pt-[100px]", // 상단 패딩 100px 추가
        "max-[1019px]:max-w-[843px]", // 1019px 이하에서는 843px
        "min-[1020px]:max-w-[720px]", // 1020px 이상에서는 720px
        "min-[1020px]:justify-between", // 1020px 이상에서는 justify-between으로 여백 분산
    ].join(" ")}>
        <p
            className={[
                "whitespace-pre-line text-[#111] leading-[1.3] tracking-[-0.01em] text-left",
                "text-[20px]",
                "max-[600px]:text-[14px]",
            ].join(" ")}
            style={{ wordBreak: "keep-all" }}
        >
            {text}
        </p>
    </div>
);

/* ✅ StickyFrame - 자동 섹션 중앙 정렬 적용 (한 화면 높이) */
const StickyFrame: React.FC<{ children: React.ReactNode; sectionId?: string; id?: string; isLongContent?: boolean }> = ({
    children,
    sectionId,
    id,
    isLongContent = false, // 길이가 긴 섹션 (intro, 졸업구성원)
}) => {
    const [sectionHeight, setSectionHeight] = useState('800px');

    useEffect(() => {
        const updateHeight = () => {
            if (isLongContent) {
                // 길이가 긴 섹션은 내용에 따라 높이 자동 조절
                setSectionHeight('auto');
            } else {
                // 일반 섹션은 화면 높이에 맞춤
                setSectionHeight(getSectionHeight());
            }
        };

        updateHeight();
        window.addEventListener('resize', updateHeight);

        return () => window.removeEventListener('resize', updateHeight);
    }, [isLongContent]);

    return (
        <div
            id={id}
            data-section-id={sectionId}
            className="relative w-full flex items-center justify-center"
            style={{
                minHeight: isLongContent ? 'auto' : sectionHeight,
                height: isLongContent ? 'auto' : sectionHeight,
            }}
        >
            <div className="w-full max-w-[1720px]">
                {children}
            </div>
        </div>
    );
};

const SignatureBlock: React.FC<{ role: string; name: string; date: string }> = ({ role, name, date }) => (
    <div className={[
        "mt-10 w-full",
        "min-[1020px]:max-w-[843px]", // 1020px 이상에서는 843px
        "min-[1351px]:max-w-[720px]", // 1351x 이상에서는 720px
        "min-[1020px]:justify-between", // 1020px 이상에서는 justify-between으로 여백 분산
    ].join(" ")}>
        <div className="text-[20px] leading-[1.2] max-[600px]:text-[14px] text-left">{role}</div>
        <div className="mt-1 text-[32px] font-bold leading-[1.2] max-[600px]:text-[24px] text-left">{name}</div>
        <div className="mt-1 text-[20px] leading-[1.2] max-[600px]:text-[14px] text-left">{date}</div>
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

/* 팀 갤러리 */
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
    { role: "기획팀", names: "김승화 김은지 강유진 김도영 안수아 정환이" },
    { role: "그래픽팀", names: "강유진 김주훈 박수민 박혜연 박현건 오지홍" },
    { role: "영상팀", names: "김도영 김민구 이지혁 전윤서 정현진" },
    { role: "편집팀", names: "정환이 신유빈 원민정 오서현 이윤서" },
    { role: "웹팀", names: "안수아 강현정 권민정 박소연" },
];

const teamImages = [
    { src: "/about/team-profiles/planning-team.jpg", label: "기획팀" },
    { src: "/about/team-profiles/graphic-team.jpg", label: "그래픽팀" },
    { src: "/about/team-profiles/video-team.jpeg", label: "영상팀" },
    { src: "/about/team-profiles/edit-team.jpg", label: "편집팀" },
    { src: "/about/team-profiles/web-team.jpg", label: "웹팀" },
];

/* 우측 점 네비 */
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

    const scrollToStep = (idx: number) => {
        const step = steps[idx];
        if (!step) return;
        const el = document.getElementById(step.id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const elementTop = window.scrollY + rect.top;
        const isFirst = idx === 0;
        const target = isFirst
            ? Math.max(0, elementTop)
            : Math.max(0, elementTop - (window.innerHeight - rect.height) / 2);
        window.scrollTo({ top: target, behavior: "smooth" });
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

            <div className="fixed right-6 top-1/2 z-50 -translate-y-1/2 select-none pointer-events-auto">
                <div className="flex flex-col items-center gap-5 p-0">
                    {steps.map((s, i) => {
                        const isActive = active === i;
                        return (
                            <div
                                key={`${s.id}-${active}`}
                                aria-label={s.label}
                                className={`relative flex items-center justify-center transition-all duration-300 ${isActive ? "h-[20px] w-[20px]" : "h-[8px] w-[8px]"} cursor-pointer`}
                                onClick={() => scrollToStep(i)}
                            >
                                {isActive ? (
                                    <LiaLongArrowAltLeftSolid size={18} className="text-white animate-move-left" />
                                ) : (
                                    <span className="h-[8px] w-[8px] rounded-full bg-white" />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

/* 메인 컴포넌트 */
const AboutInfoSection: React.FC = () => {
    const steps: Step[] = useMemo(
        () => [
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

    // 섹션 스냅 내비게이션 활성화 (휠/키보드)
    useSmoothSectionAlignment();

    return (
        <>
            {/* sec-0 — 인트로 (패딩 없음, 중앙고정 제외) */}
            <div id="sec-0" className="w-full">
                <VideoSection />
                <TextSection />
                {/* 여유 스크롤을 위한 스페이서 (200px) */}
                <div style={{ height: '200px' }} />
            </div>

            {/* ✅ 그리드 컨테이너 (가운데 정렬) */}
            <section
                className={[
                    "box-border w-full", // mx-auto 제거
                    "overflow-x-hidden",
                    // ✅ 반응형 패딩 적용
                    "px-[10px] sm:px-[20px] md:px-[50px] xl:px-[100px]",
                ].join(" ")}
                style={{
                    height: PAGE_H,
                    paddingTop: 100, // 상단 패딩
                    paddingBottom: 0 // 아래 패딩 제거
                }}
            >
                {/* 내부에서 가운데 정렬을 위한 래퍼 */}
                <div className="mx-auto max-w-[1720px]">
                    <RightDotNav steps={steps} />

                    {/* ✅ 자연스러운 섹션 정렬 활성화 */}

                    <div className="flex h-full flex-col" style={{ rowGap: GAP }}>
                        {/* 1) ME */}
                        <StickyFrame id="sec-1" sectionId="me">
                            <TwoColumn title="ME">
                                <BodyText text={meContent} />
                            </TwoColumn>
                        </StickyFrame>

                        {/* 2) VIDUAL IDENTITY */}
                        <StickyFrame id="sec-2" sectionId="visual-identity">
                            <TwoColumn title={"VIDUAL\nIDENTITY"}>
                                <BodyText text={visualIdentityContent} />
                            </TwoColumn>
                        </StickyFrame>

                        {/* 3) 예술대학장 인사말 */}
                        <StickyFrame id="sec-3" sectionId="dean-message">
                            <TwoColumn title={"예술대학장\n인사말"}>
                                <BodyText text={deanMessage.split("\n\n예술대학 학장")[0]} />
                                <SignatureBlock role="예술대학 학장" name="조철희" date="2025년 10월" />
                            </TwoColumn>
                        </StickyFrame>

                        {/* 4) 학과장 인사말 */}
                        <StickyFrame id="sec-4" sectionId="department-head-message">
                            <TwoColumn title={"학과장 인사말"}>
                                <BodyText text={departmentHeadMessage.split("\n\n디자인학과 학과장")[0]} />
                                <SignatureBlock role="디자인학과 학과장" name="김성년" date="2025년 10월" />
                            </TwoColumn>
                        </StickyFrame>

                        {/* 5) 지도 교수 */}
                        <StickyFrame id="sec-5" sectionId="advisors">
                            <TwoColumn title="지도 교수" className="max-[600px]:items-start">
                                {/* 그리드 기반 교수 리스트 */}
                                <div className={[
                                    "w-full",
                                    "max-[1019px]:max-w-[843px]", // 1019px 이하에서는 843px
                                    "min-[1020px]:max-w-[720px]", // 1020px 이상에서는 720px
                                    "min-[1020px]:justify-between", // 1020px 이상에서는 justify-between으로 여백 분산
                                ].join(" ") + " grid grid-cols-2 gap-x-12 gap-y-8 max-[600px]:grid-cols-1"}>
                                    {advisorsAll.map((p) => (
                                        <div key={p.name}>
                                            <div className="text-[18px] leading-[1.6] text-[#333] max-[600px]:text-[14px]">{p.role}</div>
                                            <div className="mt-1 text-[32px] font-extrabold leading-[1.4] max-[600px]:text-[24px]">{p.name}</div>
                                        </div>
                                    ))}
                                </div>
                            </TwoColumn>
                        </StickyFrame>

                        {/* 6) 졸준위 인사말 */}
                        <StickyFrame id="sec-6" sectionId="committee-message">
                            <TwoColumn title={"졸준위 인사말"}>
                                <BodyText text={graduationCommitteeMessage.split("\n\n졸업준비위원회 위원장")[0]} />
                                <SignatureBlock role="졸업준비위원회 위원장" name="김승화" date="2025년 10월" />
                            </TwoColumn>
                        </StickyFrame>

                        {/* 7) 졸업 구성원 (긴 내용) */}
                        <StickyFrame id="sec-7" sectionId="members" isLongContent={true}>
                            <div className="w-full">
                                <TwoColumn title="졸업구성원" className="mb-20">
                                    <div className={[
                                        "w-full",
                                        "max-[1019px]:max-w-[843px]", // 1019px 이하에서는 843px
                                        "min-[1020px]:max-w-[720px]", // 1020px 이상에서는 720px
                                        "min-[1020px]:justify-between", // 1020px 이상에서는 justify-between으로 여백 분산
                                    ].join(" ") + " text-[20px] max-[600px]:text-[14px] leading-[1.9]"}>
                                        {memberLines.map((m) => (
                                            <div
                                                key={m.role}
                                                className="grid items-center grid-cols-[110px_1fr] gap-x-6 max-[600px]:grid-cols-[84px_1fr] max-[600px]:gap-x-4 mb-2"
                                            >
                                                <span className="font-bold text-left break-keep">{m.role}</span>
                                                <span className="break-keep whitespace-normal">{m.names}</span>
                                            </div>
                                        ))}
                                    </div>
                                </TwoColumn>

                                <div className="mt-10">
                                    <HorizontalGallery items={teamImages} />
                                </div>
                            </div>
                        </StickyFrame>

                        {/* 하단 여백 */}
                        <div style={{ height: '400px' }} className="w-full"></div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AboutInfoSection;