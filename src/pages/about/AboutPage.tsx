import AboutInfoSection from "./components/AboutInfoSection";


/**
 * About 페이지 컴포넌트
 *
 * 전체 페이지 레이아웃을 담당하는 컴포넌트
 * - 구성요소: AboutInfoSection (내부에 Video, Text, ME 등의 모든 섹션 포함)
 */
const AboutPage: React.FC = () => {
    return (
        <div
            className="w-full"
            style={{
                background: 'linear-gradient(180deg, #00E73A 53.37%, #FFFFFF 100%)'
            }}
        >
            <AboutInfoSection />
        </div>
    );
};

export default AboutPage;
