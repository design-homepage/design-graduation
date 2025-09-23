import React, { useEffect, useRef, useState, useCallback } from 'react';

interface SnapContainerProps {
    children: React.ReactNode;
    ids: string[];
    showPagination?: boolean;
    className?: string;
}

const SnapContainer: React.FC<SnapContainerProps> = ({
    children,
    ids,
    showPagination = false,
    className = ''
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeSection, setActiveSection] = useState<string>(ids[0] || '');
    const [isScrolling, setIsScrolling] = useState(false);
    const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
    const observerRef = useRef<IntersectionObserver | null>(null);
    const scrollTimeoutRef = useRef<number | null>(null);

    // IntersectionObserver 설정
    useEffect(() => {
        if (!containerRef.current) return;

        const options: IntersectionObserverInit = {
            root: null,
            rootMargin: '-20% 0px -20% 0px', // 살짝만 보여도 중앙으로 스냅
            threshold: 0.1
        };

        observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.getAttribute('data-section-id');
                    if (sectionId) {
                        setActiveSection(sectionId);
                        // URL 해시 업데이트 (뒤로가기 지원)
                        if (window.location.hash !== `#${sectionId}`) {
                            window.history.replaceState(null, '', `#${sectionId}`);
                        }
                    }
                }
            });
        }, options);

        // 모든 섹션 관찰 시작
        sectionRefs.current.forEach((element) => {
            if (observerRef.current) {
                observerRef.current.observe(element);
            }
        });

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [ids]);

    // URL 해시 변경 감지 (브라우저 뒤로가기/앞으로가기)
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.slice(1);
            if (hash && ids.includes(hash)) {
                scrollToSection(hash);
            }
        };

        window.addEventListener('hashchange', handleHashChange);

        // 초기 로드 시 해시 확인
        const initialHash = window.location.hash.slice(1);
        if (initialHash && ids.includes(initialHash)) {
            setTimeout(() => scrollToSection(initialHash), 100);
        }

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, [ids]);

    // 섹션으로 스크롤
    const scrollToSection = useCallback((sectionId: string) => {
        const element = sectionRefs.current.get(sectionId);
        if (element) {
            setIsScrolling(true);
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });

            // 스크롤 완료 후 상태 업데이트
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
            scrollTimeoutRef.current = window.setTimeout(() => {
                setIsScrolling(false);
            }, 1000);
        }
    }, []);

    // 섹션 ref 등록
    const registerSection = useCallback((id: string, element: HTMLElement | null) => {
        if (element) {
            sectionRefs.current.set(id, element);
            if (observerRef.current) {
                observerRef.current.observe(element);
            }
        } else {
            sectionRefs.current.delete(id);
        }
    }, []);

    // 페이지네이션 클릭 핸들러
    const handlePaginationClick = useCallback((sectionId: string) => {
        scrollToSection(sectionId);
    }, [scrollToSection]);

    // 접근성을 위한 키보드 네비게이션
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isScrolling) return;

            const currentIndex = ids.indexOf(activeSection);

            if (e.key === 'ArrowDown' || e.key === 'PageDown') {
                e.preventDefault();
                const nextIndex = Math.min(currentIndex + 1, ids.length - 1);
                scrollToSection(ids[nextIndex]);
            } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                e.preventDefault();
                const prevIndex = Math.max(currentIndex - 1, 0);
                scrollToSection(ids[prevIndex]);
            } else if (e.key === 'Home') {
                e.preventDefault();
                scrollToSection(ids[0]);
            } else if (e.key === 'End') {
                e.preventDefault();
                scrollToSection(ids[ids.length - 1]);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeSection, ids, isScrolling, scrollToSection]);

    return (
        <div className={`relative ${className}`}>
            {/* 메인 스냅 컨테이너 */}
            <div
                ref={containerRef}
                className="snap-container"
                style={{
                    scrollSnapType: 'y mandatory',
                    height: '100vh',
                    overflowY: 'auto',
                    scrollBehavior: 'smooth',
                    position: 'relative'
                }}
            >
                {React.Children.map(children, (child) => {
                    if (React.isValidElement(child) && child.props && typeof child.props === 'object' && 'id' in child.props) {
                        const childProps = child.props as { id: string };
                        return React.cloneElement(child as React.ReactElement<any>, {
                            ...child.props,
                            ref: (element: HTMLElement | null) => {
                                registerSection(childProps.id, element);
                            },
                            isActive: activeSection === childProps.id,
                            isScrolling
                        });
                    }
                    return child;
                })}
            </div>

            {/* 페이지네이션 (선택사항) */}
            {showPagination && (
                <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50">
                    <div className="flex flex-col space-y-3">
                        {ids.map((id) => (
                            <button
                                key={id}
                                onClick={() => handlePaginationClick(id)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${activeSection === id
                                    ? 'bg-white scale-125'
                                    : 'bg-white/30 hover:bg-white/50 hover:scale-110'
                                    }`}
                                aria-label={`Go to ${id} section`}
                                aria-current={activeSection === id ? 'true' : 'false'}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SnapContainer;
