import React from 'react';
import { motion } from 'framer-motion';
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
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            졸업구성원
          </h2>
        </motion.div>

        {/* 팀 목록 */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-50px' }}
          className="mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">기획팀</h3>
              <p className="text-sm text-muted-foreground">안수아 강현정 권민정 박소연</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">그래픽팀</h3>
              <p className="text-sm text-muted-foreground">김승화 김은지 강유진 김도영 안수아 정환이</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">영상팀</h3>
              <p className="text-sm text-muted-foreground">강유진 김주훈 박수민 박해연 박희건 오지홍</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">편집팀</h3>
              <p className="text-sm text-muted-foreground">김도영 김민구 이지혁 전윤서 정현진</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">웹팀</h3>
              <p className="text-sm text-muted-foreground">정환이 신유빈 원민정 오서현 이윤서</p>
            </div>
          </div>
        </motion.div>

        {/* 팀 사진 가로 스크롤 */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-50px' }}
          className="relative"
        >
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {teamPhotos.map((team, index) => (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  ease: 'easeOut' 
                }}
                viewport={{ once: true, margin: '-50px' }}
                className="flex-shrink-0 w-80 h-80 bg-white rounded-2xl shadow-md overflow-hidden group cursor-pointer"
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative w-full h-full">
                  <img
                    src={team.image}
                    alt={`${team.name} 팀 사진`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <h3 className="text-white font-semibold text-lg">{team.name}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamPhotos;
