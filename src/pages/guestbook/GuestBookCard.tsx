import { useState, memo } from 'react';
import type { GuestBookEntry } from '@/types/guestbook';

// Arrow 이미지 경로들 (런타임에 참조)
const arrowBasicL = '/guestbook/img/arrow_basic_L.webp';
const arrowBasicS = '/guestbook/img/arrow_basic_S.webp';
const arrowHoverL = '/guestbook/img/arrow_Hover_L.webp';
const arrowHoverS = '/guestbook/img/arrow_Hover_S.webp';

interface GuestBookCardProps {
  entry: GuestBookEntry;
  cardDimensions: { width: string; height: string };
  windowWidth: number;
}

// 메모이제이션된 카드 컴포넌트
export const GuestBookCard = memo(({ entry }: GuestBookCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // 메시지 길이에 따라 배경 이미지 선택 (호버 상태 반영)
  const getBackgroundImage = () => {
    const messageLength = entry.message.length;
    const selectedImage = messageLength >= 98
      ? (isHovered ? arrowHoverL : arrowBasicL)
      : (isHovered ? arrowHoverS : arrowBasicS);
    return selectedImage;
  };

  // 카드 컨테이너 크기 설정 (크기 축소)
  const getCardSize = () => {
    const messageLength = entry.message.length;
    if (messageLength > 59) {
      return { width: '400px', height: '180px' }; // L 카드 크기 (축소)
    } else {
      return { width: '240px', height: '180px' }; // S 카드 크기 (축소)
    }
  };

  const cardSize = getCardSize();

  return (
    <div
      className="group relative GuestBookCard swiper-slide"
      style={{
        zIndex: 10,
        background: 'transparent',
        position: 'relative',
        cursor: 'pointer'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 화살표 이미지를 사용한 카드 */}
      <div className="relative transition-all duration-300"
        style={{
          width: cardSize.width,
          height: cardSize.height,
          background: 'transparent'
        }}>

        {/* 화살표 배경 이미지 */}
        <img
          src={getBackgroundImage()}
          alt="arrow background"
          className="absolute inset-0 w-full h-full object-contain"
          style={{
            zIndex: 1,
            opacity: isHovered ? 1 : 0.5
          }}
        />

        {/* 왼쪽 화살표 영역 */}
        <div className="absolute top-1/2 transform -translate-y-1/2"
          style={{
            display: 'flex',
            width: '60px',
            height: '60px',
            justifyContent: 'center',
            alignItems: 'center',
            flexShrink: 0,
            aspectRatio: '1/1',
            left: '20px',
            zIndex: 3
          }}>
          <img
            src={`/guestbook/arrows-green/Property 1=${entry.receiver}_G.webp`}
            alt={entry.receiver}
            className="object-contain"
            style={{
              width: '60px',
              height: '60px',
              filter: isHovered ? 'none' : 'brightness(0) saturate(100%) invert(6%) sepia(98%) saturate(7482%) hue-rotate(240deg) brightness(95%) contrast(102%)'
            }}
            onError={(e) => {
              // 이미지 로드 실패 시 기본 아이콘 표시
              e.currentTarget.style.display = 'none';
              const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
              if (nextElement) {
                nextElement.style.display = 'flex';
              }
            }}
          />
          {/* 기본 아이콘 (이미지 로드 실패 시) */}
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm hidden">
            {entry.receiver.charAt(0)}
          </div>
        </div>

        {/* 메시지 내용 영역 */}
        <div className="flex flex-col justify-center"
          style={{
            position: 'absolute',
            top: '50%',
            left: '95px',
            right: '10px',
            height: '100px',
            transform: 'translateY(-50%)',
            zIndex: 4,
            paddingRight: '10px',
            paddingLeft: '8px'
          }}>
          {/* 메시지 텍스트 */}
          <div className="flex-1">
            <p className="leading-relaxed line-clamp-3"
              style={{
                color: isHovered ? '#00FF00' : '#000',
                fontFamily: 'Pretendard',
                fontSize: '14px',
                fontStyle: 'normal',
                fontWeight: '400',
                lineHeight: '20px',
                letterSpacing: '-0.028px',
                transition: 'color 0.3s ease'
              }}>
              {entry.message}
            </p>
          </div>

          {/* 하단: 보내는 사람 */}
          <div className="mt-2 pt-2 border-t border-gray-300 border-opacity-30">
            <p className="text-right"
              style={{
                color: isHovered ? '#00FF00' : '#000',
                fontFamily: 'Pretendard',
                fontSize: '14px',
                fontStyle: 'normal',
                fontWeight: '700',
                lineHeight: '18px',
                letterSpacing: '-0.028px',
                transition: 'color 0.3s ease'
              }}>
              - {entry.sender}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

GuestBookCard.displayName = 'GuestBookCard';
