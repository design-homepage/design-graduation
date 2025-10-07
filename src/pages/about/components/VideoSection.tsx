import React from 'react';

/**
 * 영상이 들어가는 회색 섹션 컴포넌트
 *
 * 크기: 가로 1920px, 세로 914px (최대 너비 제한)
 * 배경색: 회색 (#f5f5f5)
 * 구성요소: 배경 비디오 + 오버레이 효과
 * 반응형: 화면 크기에 따라 높이 조절
 */
const VideoSection = () => {
    return (
        // 전체 섹션 컨테이너 (반응형: 화면 너비, 최대 1920px)
        <section className="w-full max-w-[1920px] h-[914px] mx-auto bg-gray-200 flex items-center justify-center relative overflow-hidden xl:w-screen xl:h-[914px] lg:h-[60vh] lg:min-h-[400px]">
            {/* 비디오 컨테이너 */}
            <div className="relative w-full h-full flex items-center justify-center">
                {/* 비디오 오버레이 효과 (반투명 검은색 배경) */}
                <div
                    className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-[1]"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
                >
                    {/* 여기에 비디오가 들어갈 자리 (현재는 플레이스홀더) */}
                    <div className="text-white text-center">
                        <p className="text-xl">Video Section</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VideoSection;
