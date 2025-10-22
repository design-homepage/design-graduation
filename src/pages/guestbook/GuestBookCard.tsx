import { useState, memo, useEffect } from 'react';
import type { GuestBookEntry } from '@/types/guestbook';

// Arrow 이미지 경로들 (런타임에 참조)
const arrowBasicL = '/guestbook/img/arrow_basic_L.webp';
const arrowBasicS = '/guestbook/img/arrow_basic_S.webp';
const arrowHoverL = '/guestbook/img/arrow_Hover_L.webp';
const arrowHoverS = '/guestbook/img/arrow_Hover_S.webp';

// Mobile Arrow 이미지 경로들 (400px 이하)
const mobileArrowBasicL = '/guestbook/img/Mobile_basic_L.png';
const mobileArrowBasicS = '/guestbook/img/Mobile_basic_S.png';
const mobileArrowHoverL = '/guestbook/img/Mobile_hover_L.png';
const mobileArrowHoverS = '/guestbook/img/Mobile_hover_S.png';

interface GuestBookCardProps {
  entry: GuestBookEntry;
  cardDimensions: { width: string; height: string };
  windowWidth: number;
}

// 메모이제이션된 카드 컴포넌트
export const GuestBookCard = memo(({ entry, windowWidth }: GuestBookCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // isHovered 상태에 따라 애니메이션 제어 (화살표 영역에서만)
  useEffect(() => {
    if (isHovered) {
      // 현재 카드가 속한 행의 track만 찾아서 일시정지
      const currentCard = document.querySelector(`[data-card-id="${entry.id}"]`);
      if (currentCard) {
        const track = currentCard.closest('.infinite-scroll-track') as HTMLElement;
        if (track) {
          track.style.animationPlayState = 'paused';
        }
      }
    } else {
      // 모든 track을 다시 실행
      const tracks = document.querySelectorAll('.infinite-scroll-track');
      tracks.forEach(track => {
        (track as HTMLElement).style.animationPlayState = 'running';
      });
    }
  }, [isHovered, entry.id]);

  // 메시지 길이에 따라 배경 이미지 선택 (호버 상태 반영)
  const getBackgroundImage = () => {
    const messageLength = entry.message.length;
    
    // 400px 이하 모바일 환경에서는 Mobile 이미지 사용
    if (windowWidth <= 400) {
      return messageLength >= 98
        ? (isHovered ? mobileArrowHoverL : mobileArrowBasicL)
        : (isHovered ? mobileArrowHoverS : mobileArrowBasicS);
    }
    
    // 데스크톱/태블릿 환경에서는 기본 이미지 사용
    return messageLength >= 98
      ? (isHovered ? arrowHoverL : arrowBasicL)
      : (isHovered ? arrowHoverS : arrowBasicS);
  };

  // Mobile 전용 카드 렌더링
  const renderMobileCard = () => {
    const messageLength = entry.message.length;
    const isLargeCard = messageLength >= 98;
    
    return (
      <div
        className="group relative GuestBookCard swiper-slide"
        data-card-id={entry.id}
        style={{
          zIndex: 10,
          background: 'transparent',
          position: 'relative',
          cursor: 'default',
          width: isLargeCard ? '402px' : '292px',
          height: '194px',
          margin: '10px'
        }}
      >
        {/* Mobile 전용 이미지 컨테이너 */}
        <div 
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: isLargeCard ? '410px' : '292px',
            height: '194px',
            padding: '0px 0',
            zIndex: 1,
            pointerEvents: 'none' // 컨테이너는 마우스 이벤트 차단
          }}
        >
          <img
            src={getBackgroundImage()}
            alt="arrow background"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              opacity: isHovered ? 1 : 0.5,
              transform: 'scale(1)',
              transformOrigin: 'center',
              cursor: 'pointer',
              pointerEvents: 'auto', // 이미지 자체만 마우스 이벤트 허용
              clipPath: entry.message.length >= 98 
                ? 'polygon(24% 0, 24% 10%, 100% 10%, 100% 90%, 24% 90%, 24% 100%, 0% 50%)' // L 크기
                : 'polygon(41% 0, 42% 11%, 100% 10%, 100% 90%, 41% 90%, 41% 100%, 0% 50%)' // S 크기
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />

        </div>

        {/* Mobile 전용 화살표 모양 클릭 영역 제거 - 이미지 자체에서 처리 */}

        {/* Mobile 전용 왼쪽 화살표 영역 */}
        <div 
          style={{
            position: 'absolute',
            top: '50%',
            left: '45px',
            transform: 'translateY(-50%)',
            display: 'flex',
            width: '60px',
            height: '60px',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 3
          }}
        >
          <img
            src={`/guestbook/arrows-green/Property 1=${entry.receiver}_G.webp`}
            alt={entry.receiver}
            style={{
              width: '60px',
              height: '60px',
              filter: isHovered 
                ? 'none' 
                : 'brightness(0) saturate(100%) invert(6%) sepia(98%) saturate(7482%) hue-rotate(240deg) brightness(95%) contrast(102%)'
            }}
          />
        </div>

        {/* Mobile 전용 메시지 영역 */}
        <div 
          className="flex flex-col justify-center"
          style={{
            position: 'absolute',
            top: '50%',
            left: '115px',
            width: isLargeCard ? '300px' : '170px',
            height: '100px',
            transform: 'translateY(-50%)',
            zIndex: 4,
            paddingRight: '10px',
            paddingLeft: '0px',
            pointerEvents: 'none'
          }}
        >
          <div className="flex-1">
            <p 
              className="leading-relaxed"
              style={{
                color: isHovered ? 'var(--Green, #00E53A)' : 'var(--Black, #000)',
                fontFamily: 'Pretendard',
                fontSize: '14px',
                fontStyle: 'normal',
                fontWeight: '400',
                lineHeight: windowWidth <= 400 ? '18px' : '20px',
                letterSpacing: '-0.028px',
                transition: 'color 0.3s',
                margin: 0
              }}
            >
              {entry.message}
            </p>
          </div>
          <div className={windowWidth <= 400 && isLargeCard ? "mt-0 pt-0" : "mt-2 pt-2 border-t border-gray-300 border-opacity-30"}>
            <p 
              className="text-right"
              style={{
                color: isHovered ? 'var(--Green, #00E53A)' : 'rgb(0, 0, 0)',
                fontFamily: 'Pretendard',
                fontSize: '14px',
                fontStyle: 'normal',
                fontWeight: '700',
                lineHeight: '18px',
                letterSpacing: '-0.028px',
                transition: 'color 0.3s',
                margin: 0
              }}
            >
              - {entry.sender}
            </p>
          </div>
        </div>
      </div>
    );
  };

  // 카드 컨테이너 크기 설정
  const getCardSize = () => {
    const messageLength = entry.message.length;
    
    // 400px 이하 모바일 환경에서는 Mobile 크기 사용
    if (windowWidth <= 400) {
      if (messageLength >= 98) {
        return { width: '500px', height: '350px' }; // Mobile L 카드 크기 (매우 큰 크기)
      } else {
        return { width: '400px', height: '350px' }; // Mobile S 카드 크기 (매우 큰 크기)
      }
    }
    
    // 데스크톱/태블릿 환경에서는 기본 크기 사용
    if (messageLength >= 98) {
      return { width: '548px', height: '230px' }; // L 카드 크기 (98자 이상)
    } else {
      return { width: '332px', height: '230px' }; // S 카드 크기 (97자 이하)
    }
  };

  // Mobile 환경에서는 전용 카드 렌더링
  if (windowWidth <= 400) {
    return renderMobileCard();
  }

  const cardSize = getCardSize();

  return (
    <div
      className="group relative GuestBookCard swiper-slide"
      data-card-id={entry.id}
      style={{
        zIndex: 10,
        background: 'transparent',
        position: 'relative',
        cursor: 'default'
      }}
    >
      {/* 화살표 이미지를 사용한 카드 */}
      <div className="relative transition-all duration-300"
        style={{
          width: cardSize.width,
          height: cardSize.height,
          background: 'transparent',
          overflow: 'visible',
          padding: windowWidth <= 400 ? '50px' : '0',
          margin: windowWidth <= 400 ? '30px' : '0',
          pointerEvents: 'none' // 컨테이너는 마우스 이벤트 차단
        }}>

        {/* 화살표 배경 이미지 */}
        <img
          src={getBackgroundImage()}
          alt="arrow background"
          className="absolute"
          style={{
            zIndex: 1,
            opacity: isHovered ? 1 : 0.5,
            transform: windowWidth <= 400 ? 'scale(2) translate(-25%, -25%)' : 'scale(1)',
            transformOrigin: 'center',
            top: windowWidth <= 400 ? '-50px' : '0',
            left: windowWidth <= 400 ? '-50px' : '0',
            width: windowWidth <= 400 ? 'calc(100% + 100px)' : '100%',
            height: windowWidth <= 400 ? 'calc(100% + 100px)' : '100%',
            objectFit: 'contain',
            objectPosition: 'center',
            minWidth: windowWidth <= 400 ? '500px' : 'auto',
            minHeight: windowWidth <= 400 ? '400px' : 'auto',
            maxWidth: 'none',
            maxHeight: 'none',
            cursor: 'pointer',
            pointerEvents: 'auto', // 이미지 자체만 마우스 이벤트 허용
            clipPath: entry.message.length >= 98 
              ? 'polygon(24% 0, 24% 10%, 100% 10%, 100% 90%, 24% 90%, 24% 100%, 0% 50%)' // L 크기
              : 'polygon(41% 0, 42% 11%, 100% 10%, 100% 90%, 41% 90%, 41% 100%, 0% 50%)' // S 크기
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />

        
        {/* 화살표 모양 클릭 영역 제거 - 이미지 자체에서 처리 */}

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
            left: '55px',
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
            left: '135px', // 95px → 105px로 오른쪽 이동
            right: '10px',
            height: '100px',
            transform: 'translateY(-50%)',
            zIndex: 10, // 화살표 마스크 영역보다 위에
            paddingRight: '10px',
            paddingLeft: '8px',
            pointerEvents: 'none' // 마우스 이벤트 비활성화
          }}
        >
          {/* 메시지 텍스트 */}
          <div className="flex-1">
            <p 
              className="leading-relaxed"
              style={{
                color: isHovered ? '#00FF00' : 'var(--Black, #000)',
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
