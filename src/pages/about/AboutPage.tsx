import SnapContainer from '../../features/snap/SnapContainer.tsx';
import SnapSection from '../../features/snap/SnapSection.tsx';
import {
    AboutHero,
    TimelineScroll,
    ContentSection,
    Professors,
    GraduationCommittee,
    GraduationMembers,
    TeamPhotos,
    ScrollArrow
} from './components';
import {
    meContent,
    visualIdentityContent,
    deanMessage,
    departmentHeadMessage,
    graduationCommitteeMessage
} from './constants';

const AboutPage = () => {
    const sectionIds = [
        'hero',
        'timeline',
        'me',
        'vi',
        'dean',
        'deptHead',
        'professors',
        'committee',
        'members'
    ];

    return (
        <div
            className="h-screen overflow-hidden"
            style={{
                background: 'linear-gradient(180deg, #00E73A 53.37%, #FFFFFF 100%)'
            }}
        >
            <SnapContainer ids={sectionIds} showPagination={false}>
                <SnapSection id="hero">
                    <AboutHero />
                </SnapSection>

                <SnapSection id="timeline">
                    <TimelineScroll />
                </SnapSection>

                <SnapSection id="me">
                    <ContentSection
                        title="ME"
                        content={meContent}
                    />
                </SnapSection>

                <SnapSection id="vi">
                    <ContentSection
                        title="VISUAL IDENTITY"
                        content={visualIdentityContent}
                    />
                </SnapSection>

                <SnapSection id="dean">
                    <ContentSection
                        title="예술대학장 인사말"
                        content={deanMessage}
                        author="예술대학 학장 조철희"
                    />
                </SnapSection>

                <SnapSection id="deptHead">
                    <ContentSection
                        title="학과장 인사말"
                        content={departmentHeadMessage}
                        author="디자인학과 학과장 김성년"
                    />
                </SnapSection>

                <SnapSection id="professors">
                    <Professors />
                </SnapSection>

                <SnapSection id="committee">
                    <GraduationCommittee message={graduationCommitteeMessage} />
                </SnapSection>

                <SnapSection id="members">
                    <div className="w-full h-full">
                        <GraduationMembers />
                        <TeamPhotos />
                    </div>
                </SnapSection>
            </SnapContainer>

            {/* 스크롤 화살표 - 오른쪽 고정 (기존 동작 유지) */}
            <ScrollArrow />
        </div>
    );
};

export default AboutPage;
