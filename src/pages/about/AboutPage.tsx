import VideoSection from './components/VideoSection';
import TextSection from './components/TextSection';
import AboutInfoSection from "./components/AboutInfoSection";


/**
 * About 페이지 컴포넌트
 *
 * 전체 페이지 레이아웃을 담당하는 컴포넌트
 * - 구성요소: VideoSection → TextSection
 */
const AboutPage: React.FC = () => {
    return (
        <div
            className="w-full"
            style={{
                background: 'linear-gradient(180deg, #00E73A 53.37%, #FFFFFF 100%)'
            }}
        >
            {/* 비디오 영역 섹션 */}
            <VideoSection />

            {/* 글자 + 배경 이미지 애니메이션 영역 */}

            {/* 내용 영역 */}
            <TextSection />
            <AboutInfoSection />

        </div>
    );
};

export default AboutPage;
