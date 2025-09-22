import React from 'react';
import { clsx } from 'clsx';

/**
 * About 페이지의 팀 사진 가로 스크롤 섹션 컴포넌트
 * 5개 팀의 사진을 가로로 스크롤할 수 있도록 구현
 */
interface TeamPhoto {
    id: string;
    name: string;
    image: string;
}

interface TeamPhotosProps {
    className?: string;
}

const teamPhotos: TeamPhoto[] = [
    {
        id: 'planning',
        name: '기획팀',
        image: '/about/팀 프로필/기획팀.jpg',
    },
    {
        id: 'graphic',
        name: '그래픽팀',
        image: '/about/팀 프로필/그래픽팀.jpg',
    },
    {
        id: 'video',
        name: '영상팀',
        image: '/about/팀 프로필/영상팀.jpeg',
    },
    {
        id: 'edit',
        name: '편집팀',
        image: '/about/팀 프로필/편집팀.jpg',
    },
    {
        id: 'web',
        name: '웹팀',
        image: '/about/팀 프로필/웹팀.jpg',
    },
];

const TeamPhotos: React.FC<TeamPhotosProps> = ({ className }) => {
    return (
        <section className={clsx('py-16 sm:py-20 bg-bg-subtle', className)}>
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* 팀 사진 5개 가로 스크롤 */}
                <div className="overflow-x-auto pb-4 scrollbar-hide">
                    <div className="flex gap-6 w-max justify-center items-center">
                        {teamPhotos.map((team) => (
                            <div
                                key={team.id}
                                className="flex-shrink-0 w-80 space-y-4"
                            >
                                <h3 className="text-lg font-semibold text-foreground text-center">{team.name}</h3>
                                <div>
                                    <img
                                        src={team.image}
                                        alt={`${team.name} 팀 사진`}
                                        className="w-full h-auto"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TeamPhotos;
