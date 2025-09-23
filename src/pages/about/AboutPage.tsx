import React from 'react';
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

interface AboutPageProps { }


const AboutPage = (props: AboutPageProps) => {
    return (
        <div
            className="min-h-screen"
            style={{
                background: 'linear-gradient(180deg, #00E73A 53.37%, #FFFFFF 100%)'
            }}
        >
            <AboutHero />

            {/* 타임라인 스크롤 애니메이션 */}
            <TimelineScroll />
            <ContentSection
                title="ME"
                content={meContent}
            />
            <ContentSection
                title="VISUAL IDENTITY"
                content={visualIdentityContent}
            />
            <ContentSection
                title="예술대학장 인사말"
                content={deanMessage}
                author="예술대학 학장 조철희"
            />
            <ContentSection
                title="학과장 인사말"
                content={departmentHeadMessage}
                author="디자인학과 학과장 김성년"
            />
            <Professors />
            <GraduationCommittee message={graduationCommitteeMessage} />

            <GraduationMembers />

            {/* 팀 사진 부분 */}
            <TeamPhotos />
            <ScrollArrow />
        </div>
    );
};

export default AboutPage;
