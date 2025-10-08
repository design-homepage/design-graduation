import { useState, useCallback, memo, useEffect } from 'react';
import { useGuestBook } from '@/hooks/useGuestBook';
import type { GuestBookEntry } from '@/types/guestbook';
import { getTeamMemberImage, teamMemberNames } from '@/types/teamMembers';
import type { TeamMember } from '@/types/teamMembers';
import arrowBasicL from './img/arrow_basic_L.png';
import arrowBasicS from './img/arrow_basic_S.png';
import arrowHoverL from './img/arrow_Hover_L.png';
import arrowHoverS from './img/arrow_Hover_S.png';


// 메모이제이션된 카드 컴포넌트
const GuestBookCard = memo(({ entry, cardDimensions, windowWidth }: { entry: GuestBookEntry, cardDimensions: { width: string, height: string }, windowWidth: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  // 메시지 길이에 따라 배경 이미지 선택 (호버 상태 반영)
  const getBackgroundImage = () => {
    const messageLength = entry.message.length;
    const imageType = messageLength >= 98 ? 'L' : 'S';
    const selectedImage = messageLength >= 98 
      ? (isHovered ? arrowHoverL : arrowBasicL) 
      : (isHovered ? arrowHoverS : arrowBasicS);
    
    console.log(`[${entry.id}] 호버 상태: ${isHovered}, 이미지 타입: ${imageType}, 메시지 길이: ${messageLength}`);
    
    return selectedImage;
  };

  // 카드 컨테이너 크기 설정 (크기 축소)
  const getCardSize = () => {
    const messageLength = entry.message.length;
    if (messageLength >= 98) {
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
      onMouseEnter={() => {
        console.log(`[${entry.id}] 마우스 진입 - 호버 상태 변경: false → true`);
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        console.log(`[${entry.id}] 마우스 벗어남 - 호버 상태 변경: true → false`);
        setIsHovered(false);
      }}
    >
      {/* 화살표 이미지를 사용한 카드 */}
      <div className="relative transition-all duration-300" 
           style={{
             width: cardSize.width,
             height: cardSize.height,
             background: 'transparent'
           }}>
      
      {/* 중앙 정렬 코드 (주석처리) */}
      {/* 
      <div className="group relative GuestBookCard" style={{ 
        margin: '0 17px',
        display: 'flex',
        justifyContent: 'center',
        width: '548px' // 최대 카드 크기로 고정
      }}>
      */}
        
        {/* 화살표 배경 이미지 */}
        <img 
          src={getBackgroundImage()}
          alt="arrow background"
          className="absolute inset-0 w-full h-full object-contain"
          style={{ 
            zIndex: 1,
            opacity: isHovered ? 1 : 0.5  // 호버 시 불투명, 기본 상태 반투명
          }}
          onLoad={() => {
            console.log(`[${entry.id}] 화살표 이미지 로드 성공:`, getBackgroundImage());
          }}
          onError={(e) => {
            console.log(`[${entry.id}] 화살표 이미지 로드 실패:`, getBackgroundImage());
            console.log('이미지 경로:', e.currentTarget.src);
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
                src={isHovered ? getTeamMemberImage(entry.receiver) : `/guestbook/arrows-green/Property 1=${entry.receiver}_G.png`} 
                alt={entry.receiver}
                className="object-contain"
                style={{ 
                  width: '60px', 
                  height: '60px',
                  filter: isHovered ? 'none' : 'brightness(0) saturate(100%) invert(6%) sepia(98%) saturate(7482%) hue-rotate(240deg) brightness(95%) contrast(102%)'
                }}
            onLoad={() => {
              console.log('이미지 로드 성공:', isHovered ? getTeamMemberImage(entry.receiver) : `/guestbook/arrows-green/Property 1=${entry.receiver}_G.png`);
            }}
            onError={(e) => {
              console.log('이미지 로드 실패:', isHovered ? getTeamMemberImage(entry.receiver) : `/guestbook/arrows-green/Property 1=${entry.receiver}_G.png`);
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
                   left: '100px',
                   right: '30px',
                   height: '100px',
                   transform: 'translateY(-50%)',
                   zIndex: 4,
                   paddingRight: '15px',
                   paddingLeft: '8px'
                 }}>
          {/* 메시지 텍스트 */}
          <div className="flex-1">
            <p className="leading-relaxed line-clamp-3"
               style={{ 
                 color: isHovered ? '#00FF00' : '#000', // 호버 시 초록색, 기본 시 검은색
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
                 color: isHovered ? '#00FF00' : '#000', // 호버 시 초록색, 기본 시 검은색
                 fontFamily: 'Pretendard',
                 fontSize: '14px',
                 fontStyle: 'normal',
                 fontWeight: '400',
                 lineHeight: '20px',
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

const GuestBookPage = () => {
  // Supabase에서 방명록 데이터 가져오기
  const { entries, loading, error, addEntry, refetch } = useGuestBook();
  
  // 반응형을 위한 상태
  const [windowWidth, setWindowWidth] = useState(0);
  
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    handleResize(); // 초기값 설정
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // 반응형 스타일 계산
  const getResponsiveStyles = () => {
    if (windowWidth >= 1350) {
      return {
        containerWidth: '828px',
        containerHeight: '521px',
        cardWidth: '320px',
        cardHeight: '112px',
        padding: '47px 41px',
        // Web 사이즈 폰트 스타일
        labelFontSize: '24px',
        labelFontWeight: '700',
        labelLineHeight: '32px',
        labelLetterSpacing: '-0.048px',
        inputFontSize: '20px',
        inputFontWeight: '400',
        inputLineHeight: '26px',
        inputLetterSpacing: '-0.04px',
        buttonFontSize: '20px',
        buttonFontWeight: '700',
        buttonLineHeight: '26px',
        buttonLetterSpacing: '-0.04px'
      };
    } else if (windowWidth >= 1020) {
      return {
        containerWidth: '828px',
        containerHeight: '521px',
        cardWidth: '280px',
        cardHeight: '100px',
        padding: '47px 41px',
        // Web>Tab 사이즈 폰트 스타일
        labelFontSize: '24px',
        labelFontWeight: '700',
        labelLineHeight: '32px',
        labelLetterSpacing: '-0.048px',
        inputFontSize: '20px',
        inputFontWeight: '400',
        inputLineHeight: '26px',
        inputLetterSpacing: '-0.04px',
        buttonFontSize: '20px',
        buttonFontWeight: '700',
        buttonLineHeight: '26px',
        buttonLetterSpacing: '-0.04px'
      };
    } else if (windowWidth >= 600) {
      return {
        containerWidth: 'stretch',
        containerHeight: '521px',
        cardWidth: '200px',
        cardHeight: '80px',
        padding: '47px 41px',
        // Tab 사이즈 폰트 스타일
        labelFontSize: '24px',
        labelFontWeight: '700',
        labelLineHeight: '32px',
        labelLetterSpacing: '-0.048px',
        inputFontSize: '20px',
        inputFontWeight: '400',
        inputLineHeight: '26px',
        inputLetterSpacing: '-0.04px',
        buttonFontSize: '20px',
        buttonFontWeight: '700',
        buttonLineHeight: '26px',
        buttonLetterSpacing: '-0.04px'
      };
    } else if (windowWidth >= 400) {
      return {
        containerWidth: 'stretch',
        containerHeight: '521px',
        cardWidth: '160px',
        cardHeight: '70px',
        padding: '47px 41px',
        // Tab>Mobile 사이즈 폰트 스타일
        labelFontSize: '24px',
        labelFontWeight: '700',
        labelLineHeight: '32px',
        labelLetterSpacing: '-0.048px',
        inputFontSize: '20px',
        inputFontWeight: '400',
        inputLineHeight: '26px',
        inputLetterSpacing: '-0.04px',
        buttonFontSize: '16px',
        buttonFontWeight: '700',
        buttonLineHeight: '24px',
        buttonLetterSpacing: '-0.032px'
      };
    } else {
      return {
        containerWidth: 'stretch',
        containerHeight: 'auto',
        cardWidth: '140px',
        cardHeight: '60px',
        padding: '0 30px',
        // Mobile 사이즈 폰트 스타일
        labelFontSize: '14px',
        labelFontWeight: '700',
        labelLineHeight: '18px',
        labelLetterSpacing: '-0.028px',
        inputFontSize: '14px',
        inputFontWeight: '400',
        inputLineHeight: '18px',
        inputLetterSpacing: '-0.028px',
        buttonFontSize: '14px',
        buttonFontWeight: '700',
        buttonLineHeight: '18px',
        buttonLetterSpacing: '-0.028px'
      };
    }
  };
  
  const responsiveStyles = getResponsiveStyles();
  
  // 데이터를 5개씩 그룹으로 나누기
  const chunkArray = (array: any[], chunkSize: number) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };
  
  const entryChunks = chunkArray(entries, 5);
  
  const [formData, setFormData] = useState({
    sender: '',
    message: '',
    receiver: '강유진' as TeamMember
  });
  const [showModal, setShowModal] = useState(false);
  
  // 반응형 카드 크기 계산
  const getCardDimensions = () => {
    if (windowWidth >= 1350) {
      return { width: '320px', height: '112px' };
    } else if (windowWidth >= 1020) {
      return { width: '280px', height: '100px' };
    } else if (windowWidth >= 600) {
      return { width: '200px', height: '80px' };
    } else if (windowWidth >= 400) {
      return { width: '160px', height: '70px' };
    } else {
      return { width: '140px', height: '60px' };
    }
  };
  
  const cardDimensions = getCardDimensions();

  // 데이터를 5개 행으로 균등하게 배치하는 함수
  const distributeToRows = (data: GuestBookEntry[]) => {
    if (data.length === 0) return [[], [], [], [], []];
    
    const rows: GuestBookEntry[][] = [[], [], [], [], []];
    const baseCount = Math.floor(data.length / 5);
    const remainder = data.length % 5;
    
    let dataIndex = 0;
    
    // 각 행에 기본 개수 배치 (위에서부터)
    for (let i = 0; i < 5; i++) {
      const count = baseCount + (i < remainder ? 1 : 0);
      rows[i] = data.slice(dataIndex, dataIndex + count);
      dataIndex += count;
    }
    
    return rows;
  };

  // 5개 행으로 배치된 데이터
  const distributedRows = distributeToRows(entries);
  
  // 디버깅: 데이터 확인
  console.log('받아온 데이터 개수:', entries.length);
  console.log('배치된 행들:', distributedRows.map((row, index) => `행 ${index + 1}: ${row.length}개`));
  console.log('총 배치된 카드 수:', distributedRows.reduce((sum, row) => sum + row.length, 0));



  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.sender.trim() || !formData.message.trim() || !formData.receiver.trim()) {
      alert('보내는 사람, 메시지, 받는 사람을 모두 입력해주세요.');
      return;
    }

    // 모달 열기
    setShowModal(true);
  }, [formData]);

  // 모달에서 실제 전송 처리
  const handleConfirmSubmit = useCallback(async () => {
    try {
      await addEntry({
        sender: formData.sender.trim(),
        message: formData.message.trim(),
        receiver: formData.receiver
      });
      
      alert('방명록이 성공적으로 등록되었습니다!');
      setFormData({ sender: '', message: '', receiver: '강유진' as TeamMember });
      setShowModal(false);
    } catch (error) {
      alert('방명록 등록에 실패했습니다. 다시 시도해주세요.');
      console.error('Failed to add guestbook entry:', error);
    }
  }, [formData, addEntry]);

  // 모달 닫기
  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div 
      className="relative snap-y snap-mandatory smooth-scroll-snap" 
      style={{ 
        height: 'calc(100vh - 64px)', 
        overflowY: 'auto'
      }}
    >
      <div 
        className="guestbook-container relative" 
        style={{ 
          minHeight: '300vh',
          backgroundColor: '#00E53A'
        }}
      >
        {/* 배경 이미지 오버레이 (30% 투명도) - 지연 로딩 */}
        <div 
          className="absolute inset-0 z-0" 
          style={{
            // backgroundImage: 'url(/guestbook/background-white.png)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'top center',
            backgroundSize: 'cover',
            opacity: 0.3,
            willChange: 'auto'
          }}
        ></div>
      {/* 첫 번째 섹션: 고정된 메시지 화면 */}
      <div 
        className="relative flex items-center justify-center snap-start"
        style={{ height: 'calc(100vh - 64px)' }}
      >
        {/* 메시지 컨텐츠 */}
        <div className="relative z-10 max-w-7xl mx-auto text-center"
             style={windowWidth <= 768 ? {
               display: 'flex',
               width: '400px',
               padding: '0 40px',
               flexDirection: 'column',
               alignItems: 'center',
               gap: '70px'
             } : { padding: '0 2rem' }}>
          {/* 한글 텍스트 */}
          <div className={windowWidth <= 768 ? "space-y-2" : "space-y-8 mb-12"}>
            <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl text-black font-bold text-center leading-relaxed" 
               style={windowWidth <= 768 ? {
                 color: 'var(--Black, #000)',
                 textAlign: 'center',
                 fontFamily: 'Pretendard',
                 fontSize: '14px',
                 fontStyle: 'normal',
                 fontWeight: '700',
                 lineHeight: '18px',
                 letterSpacing: '-0.028px'
               } : (windowWidth >= 1020 && windowWidth < 1350) ? {
                 color: 'var(--Black, #000)',
                 textAlign: 'center',
                 fontFamily: 'Pretendard',
                 fontSize: '24px',
                 fontStyle: 'normal',
                 fontWeight: '700',
                 lineHeight: '32px',
                 letterSpacing: '-0.048px'
               } : (windowWidth >= 600 && windowWidth < 1020) ? {
                 color: 'var(--Black, #000)',
                 textAlign: 'center',
                 fontFamily: 'Pretendard',
                 fontSize: '24px',
                 fontStyle: 'normal',
                 fontWeight: '700',
                 lineHeight: '32px',
                 letterSpacing: '-0.048px'
               } : (windowWidth >= 400 && windowWidth < 600) ? {
                 color: 'var(--Black, #000)',
                 textAlign: 'center',
                 fontFamily: 'Pretendard',
                 fontSize: '14px',
                 fontStyle: 'normal',
                 fontWeight: '700',
                 lineHeight: '18px',
                 letterSpacing: '-0.028px'
               } : { letterSpacing: '-0.064px' }}>
              {windowWidth <= 768 ? (
                <>
                  작은 불꽃이 큰 등불이 되는 시대,<br/>
                  무하마드 알리가 던진 단 두 음절 "ME, WE"는
                  반세기 만에<br/>우리 사회의 운영 원리로 떠올랐습니다.
                </>
              ) : (windowWidth >= 600 && windowWidth < 1020) ? (
                <>
                  작은 불꽃이 큰 등불이 되는 시대,<br/>
                  무하마드 알리가 던진 단 두 음절 "ME, WE"는 반세기 만에 우리 사회의 운영 원리로 떠올랐습니다.
                </>
              ) : (windowWidth >= 400 && windowWidth < 600) ? (
                <>
                  작은 불꽃이 큰 등불이 되는 시대,<br/>
                  무하마드 알리가 던진 단 두 음절 "ME, WE"는 반세기 만에 우리 사회의 운영 원리로<br/>
                  떠올랐습니다.
                </>
              ) : (
                <>
              작은 불꽃이 큰 등불이 되는 시대,<br/>
                  <span className="whitespace-nowrap">무하마드 알리가 던진 단 두 음절 "ME, WE"는 반세기 만에 우리 사회의 운영 원리로 떠올랐습니다.</span>
                </>
              )}
            </p>
            {windowWidth <= 768 ? null : (windowWidth >= 600 && windowWidth < 1350) ? null : <><br/><br/></>}
            <p className={windowWidth <= 768 ? "text-black font-bold text-center" : "text-xl md:text-2xl lg:text-3xl xl:text-3xl text-black font-bold text-center leading-relaxed mt-12"}
               style={windowWidth <= 768 ? {
                 color: 'var(--Black, #000)',
                 textAlign: 'center',
                 fontFamily: 'Pretendard',
                 fontSize: '14px',
                 fontStyle: 'normal',
                 fontWeight: '700',
                 lineHeight: '18px',
                 letterSpacing: '-0.028px',
                 marginTop: '8px'
               } : (windowWidth >= 1020 && windowWidth < 1350) ? {
                 color: 'var(--Black, #000)',
                 textAlign: 'center',
                 fontFamily: 'Pretendard',
                 fontSize: '24px',
                 fontStyle: 'normal',
                 fontWeight: '700',
                 lineHeight: '32px',
                 letterSpacing: '-0.048px',
                 marginTop: '8px'
               } : (windowWidth >= 600 && windowWidth < 1020) ? {
                 color: 'var(--Black, #000)',
                 textAlign: 'center',
                 fontFamily: 'Pretendard',
                 fontSize: '24px',
                 fontStyle: 'normal',
                 fontWeight: '700',
                 lineHeight: '32px',
                 letterSpacing: '-0.048px',
                 marginTop: '8px'
               } : (windowWidth >= 400 && windowWidth < 600) ? {
                 color: 'var(--Black, #000)',
                 textAlign: 'center',
                 fontFamily: 'Pretendard',
                 fontSize: '14px',
                 fontStyle: 'normal',
                 fontWeight: '700',
                 lineHeight: '18px',
                 letterSpacing: '-0.028px',
                 marginTop: '8px'
               } : { letterSpacing: '-0.064px' }}>
              {(windowWidth >= 600 && windowWidth < 1350) ? (
                <>당신이 전하는 응원의 메세지로 또 다른 누군가에게 <span className="font-bold">'우리'</span>를 밝혀줄 불빛이 되어주세요.</>
              ) : (
                <>
              당신이 전하는 응원의 메세지로<br/>
              또 다른 누군가에게 <span className="font-bold">'우리'</span>를 밝혀줄 불빛이 되어주세요.
                </>
              )}
            </p>
          </div>

          {/* 영문 텍스트 */}
          <div className={windowWidth <= 768 ? "space-y-2" : "space-y-6 mt-16"}>
            <p className="text-lg md:text-xl text-blue-100 italic leading-relaxed"
               style={windowWidth <= 768 ? {
                 color: 'var(--60, #666)',
                 textAlign: 'center',
                 fontFamily: 'Pretendard',
                 fontSize: '12px',
                 fontStyle: 'normal',
                 fontWeight: '300',
                 lineHeight: 'normal',
                 letterSpacing: '-0.024px'
               } : (windowWidth >= 1020 && windowWidth < 1350) ? {
                 color: 'var(--60, #666)',
                 textAlign: 'center',
                 fontFamily: 'Pretendard',
                 fontSize: '16px',
                 fontStyle: 'normal',
                 fontWeight: '400',
                 lineHeight: '24px',
                 letterSpacing: '-0.032px'
               } : (windowWidth >= 600 && windowWidth < 1020) ? {
                 color: 'var(--60, #666)',
                 textAlign: 'center',
                 fontFamily: 'Pretendard',
                 fontSize: '16px',
                 fontStyle: 'normal',
                 fontWeight: '400',
                 lineHeight: '24px',
                 letterSpacing: '-0.032px'
               } : (windowWidth >= 400 && windowWidth < 600) ? {
                 color: 'var(--60, #666)',
                 textAlign: 'center',
                 fontFamily: 'Pretendard',
                 fontSize: '12px',
                 fontStyle: 'normal',
                 fontWeight: '300',
                 lineHeight: 'normal',
                 letterSpacing: '-0.024px'
               } : {}}>
              In an age where small sparks can become powerful lights,
            </p>
            <p className="text-lg md:text-xl text-blue-100 italic leading-relaxed"
               style={windowWidth <= 768 ? {
                 color: 'var(--60, #666)',
                 textAlign: 'center',
                 fontFamily: 'Pretendard',
                 fontSize: '12px',
                 fontStyle: 'normal',
                 fontWeight: '300',
                 lineHeight: 'normal',
                 letterSpacing: '-0.024px'
               } : (windowWidth >= 1020 && windowWidth < 1350) ? {
                 color: 'var(--60, #666)',
                 textAlign: 'center',
                 fontFamily: 'Pretendard',
                 fontSize: '16px',
                 fontStyle: 'normal',
                 fontWeight: '400',
                 lineHeight: '24px',
                 letterSpacing: '-0.032px'
               } : (windowWidth >= 600 && windowWidth < 1020) ? {
                 color: 'var(--60, #666)',
                 textAlign: 'center',
                 fontFamily: 'Pretendard',
                 fontSize: '16px',
                 fontStyle: 'normal',
                 fontWeight: '400',
                 lineHeight: '24px',
                 letterSpacing: '-0.032px'
               } : (windowWidth >= 400 && windowWidth < 600) ? {
                 color: 'var(--60, #666)',
                 textAlign: 'center',
                 fontFamily: 'Pretendard',
                 fontSize: '12px',
                 fontStyle: 'normal',
                 fontWeight: '300',
                 lineHeight: 'normal',
                 letterSpacing: '-0.024px'
               } : {}}>
              Muhammad Ali's simple two-syllable motto, "ME, WE," has emerged as the guiding principle of our society in half a century.
            </p>
            <p className="text-lg md:text-xl text-blue-100 italic leading-relaxed mt-8"
               style={windowWidth <= 768 ? {
                 color: 'var(--60, #666)',
                 textAlign: 'center',
                 fontFamily: 'Pretendard',
                 fontSize: '12px',
                 fontStyle: 'normal',
                 fontWeight: '300',
                 lineHeight: 'normal',
                 letterSpacing: '-0.024px'
               } : (windowWidth >= 1020 && windowWidth < 1350) ? {
                 color: 'var(--60, #666)',
                 textAlign: 'center',
                 fontFamily: 'Pretendard',
                 fontSize: '16px',
                 fontStyle: 'normal',
                 fontWeight: '400',
                 lineHeight: '24px',
                 letterSpacing: '-0.032px'
               } : (windowWidth >= 600 && windowWidth < 1020) ? {
                 color: 'var(--60, #666)',
                 textAlign: 'center',
                 fontFamily: 'Pretendard',
                 fontSize: '16px',
                 fontStyle: 'normal',
                 fontWeight: '400',
                 lineHeight: '24px',
                 letterSpacing: '-0.032px'
               } : (windowWidth >= 400 && windowWidth < 600) ? {
                 color: 'var(--60, #666)',
                 textAlign: 'center',
                 fontFamily: 'Pretendard',
                 fontSize: '12px',
                 fontStyle: 'normal',
                 fontWeight: '300',
                 lineHeight: 'normal',
                 letterSpacing: '-0.024px'
               } : {}}>
              With your message of encouragement, become a beacon of light that illuminates "us" for someone else.
            </p>
          </div>
        </div>
      </div>

      {/* 두 번째 섹션: 방명록 작성 폼 */}
      <div 
        className="relative snap-start z-10" 
        style={{ height: 'calc(100vh - 64px)' }}
      >
        <div className="flex items-center justify-center h-full">
          <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto p-8">
            {/* 글래스모피즘 컨테이너 */}
        <div 
              className="glassmorphism-container" 
          style={{ 
            display: 'flex',
                width: responsiveStyles.containerWidth,
                height: responsiveStyles.containerHeight,
                padding: responsiveStyles.padding,
            flexDirection: 'column',
                justifyContent: 'space-between',
            alignItems: 'center',
            flexShrink: 0,
                borderRadius: '20px',
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
              }}
            >
              {/* 텍스트 입력 영역 */}
              <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                {/* 1. 보낸이 섹션 */}
                <div style={{ width: '100%' }}>
                  <div className="flex items-center gap-4" style={{ width: '100%' }}>
                    <h3 className="text-black drop-shadow-lg"
            style={{
                          fontFamily: 'Pretendard',
                          fontSize: responsiveStyles.labelFontSize || '24px',
                          fontWeight: responsiveStyles.labelFontWeight || '700',
                          lineHeight: responsiveStyles.labelLineHeight || '32px',
                          letterSpacing: responsiveStyles.labelLetterSpacing || '-0.048px'
                        }}>ME:</h3>
                <input
                  type="text"
                      name="sender"
                      value={formData.sender}
                  onChange={handleInputChange}
                      className="px-3 py-2 rounded-lg focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all duration-200 text-gray-800 placeholder-gray-600"
                      style={{
                        background: 'transparent',
                        border: 'none',
                        backdropFilter: 'none',
                        fontFamily: 'Pretendard',
                        fontSize: responsiveStyles.inputFontSize || '20px',
                        fontWeight: responsiveStyles.inputFontWeight || '400',
                        lineHeight: responsiveStyles.inputLineHeight || '26px',
                        letterSpacing: responsiveStyles.inputLetterSpacing || '-0.04px',
                        color: '#666'
                      }}
                      placeholder="보낸이"
                  required
                />
              </div>
                </div>

                {/* 구분선 */}
                <div className="border-t border-black-400 border-opacity-30" style={{ width: '100%', margin: '10px 0' }}></div>
              
                {/* 2. 메시지 섹션 */}
                <div style={{ width: '100%', flex: 1, position: 'relative' }}>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                    rows={8}
                    className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all duration-200 text-sm text-gray-800 placeholder-gray-600 resize-none"
                    style={{
                      background: 'transparent',
                      border: 'none',
                      backdropFilter: 'none',
                      height: '100%',
                      minHeight: '200px',
                      paddingBottom: '30px'
                    }}
                  placeholder="메시지를 입력해주세요"
                  required
                    maxLength={200}
                  />
                  <div style={{ 
                    position: 'absolute', 
                    bottom: '10px', 
                    right: '0',
                    paddingRight: '4px'
                  }}>
                    <span className="text-xs text-black drop-shadow-lg">{formData.message.length}/200</span>
                  </div>
              </div>
              
                {/* 구분선 */}
                <div className="border-t border-gray-400 border-opacity-30" style={{ width: '100%', margin: '10px 0' }}></div>

                {/* 3. 받는이 섹션 */}
                <div style={{ width: '100%' }}>
                  <div className="flex items-center gap-4" style={{ width: '100%' }}>
                    <h3 className="text-black drop-shadow-lg"
                        style={{
                          fontFamily: 'Pretendard',
                          fontSize: responsiveStyles.labelFontSize || '24px',
                          fontWeight: responsiveStyles.labelFontWeight || '700',
                          lineHeight: responsiveStyles.labelLineHeight || '32px',
                          letterSpacing: responsiveStyles.labelLetterSpacing || '-0.048px'
                        }}>WE:</h3>
                    <select
                      name="receiver"
                      value={formData.receiver}
                  onChange={handleInputChange}
                      className="px-4 py-3 rounded-lg focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all duration-200 text-gray-800"
                      style={{
                        background: 'transparent',
                        border: 'none',
                        backdropFilter: 'none',
                        fontFamily: 'Pretendard',
                        fontSize: responsiveStyles.inputFontSize || '20px',
                        fontWeight: responsiveStyles.inputFontWeight || '400',
                        lineHeight: responsiveStyles.inputLineHeight || '26px',
                        letterSpacing: responsiveStyles.inputLetterSpacing || '-0.04px',
                        color: '#666'
                      }}
                      required
                    >
                      {teamMemberNames.map((member) => (
                        <option key={member} value={member}>
                          {member}
                        </option>
                      ))}
                    </select>
            </div>
          </div>
        </div>
        </div>
        
        {/* 메시지 보내기 버튼 */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <button
                type="submit"
                className="transition-all duration-200 hover:scale-105"
                style={{
                  display: 'flex',
                  padding: '15px 30px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '10px',
                  borderRadius: '40px',
                  background: 'rgba(0, 0, 0, 0.00)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                  color: 'var(--Black, #000)',
                  textAlign: 'center',
                  fontFamily: 'Pretendard',
                  fontSize: responsiveStyles.buttonFontSize || '20px',
                  fontStyle: 'normal',
                  fontWeight: responsiveStyles.buttonFontWeight || '700',
                  lineHeight: responsiveStyles.buttonLineHeight || '26px',
                  letterSpacing: responsiveStyles.buttonLetterSpacing || '-0.04px'
                }}
          >
            메시지 남기기
          </button>
            </div>
          </form>
        </div>
      </div>

      {/* 세 번째 섹션: 방명록 목록 */}
      <div className="py-16 snap-start relative z-10" style={{ minHeight: 'calc(100vh - 64px)', overflow: 'hidden', overflowY: 'auto' }}>
        <div className="relative w-full" style={{ minHeight: 'calc(100vh - 64px - 128px)' }}>
          {/* 모든 화면에서 무한 스크롤 적용 */}
          {windowWidth <= 768 ? (
            // Mobile: 무한 스크롤 (호버 효과 없음)
            <div 
              className="infinite-scroll-container swiper-wrapper"
              style={{
                width: '100%',
                minHeight: 'calc(100vh - 64px - 128px)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* 무한 스크롤 트랙 */}
              <div 
                className="infinite-scroll-track"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: `${(Math.max(...distributedRows.map(row => row.length)) * 450) + 100}px`,
                  height: '100%',
                  animationName: 'scroll-from-right',
                  animationDuration: `${Math.max(...distributedRows.map(row => row.length)) * 8}s`,
                  animationTimingFunction: 'linear',
                  animationIterationCount: 'infinite',
                  animationPlayState: 'running'
                }}
              >
                {/* 첫 번째 세트 - 5개 행 */}
                <div className="scroll-section" style={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  height: '100%', 
                  padding: '15px', 
                  gap: '40px',
                  justifyContent: 'space-around'
                }}>
                  {distributedRows.map((row, rowIndex) => (
                    <div key={`mobile-row-${rowIndex}`} style={{ 
                      display: 'flex', 
                      gap: '50px', 
                      alignItems: 'center',
                      minHeight: `${100 / 5}%`
                    }}>
                      {row.map((entry) => (
                        <GuestBookCard key={`mobile-${entry.id}`} entry={entry} cardDimensions={cardDimensions} windowWidth={windowWidth} />
                      ))}
                    </div>
                  ))}
                </div>
                  </div>
                        </div>
          ) : (
            // Desktop/Tablet: 무한 스크롤 + 호버 효과
            <div 
              className="infinite-scroll-container swiper-wrapper"
              style={{
                width: '100%',
                minHeight: 'calc(100vh - 64px - 128px)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                // 마우스 진입 시 애니메이션 일시정지
                const container = e.currentTarget;
                const track = container.querySelector('.infinite-scroll-track') as HTMLElement;
                if (track) {
                  track.style.animationPlayState = 'paused';
                }
              }}
              onMouseLeave={(e) => {
                // 마우스 벗어날 시 애니메이션 재생
                const container = e.currentTarget;
                const track = container.querySelector('.infinite-scroll-track') as HTMLElement;
                if (track) {
                  track.style.animationPlayState = 'running';
                }
              }}
            >
              {/* 무한 스크롤 트랙 */}
              <div 
                className="infinite-scroll-track"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: `${(Math.max(...distributedRows.map(row => row.length)) * 450) + 100}px`,
                  height: '100%',
                  animationName: 'scroll-from-right',
                  animationDuration: `${Math.max(...distributedRows.map(row => row.length)) * 8}s`,
                  animationTimingFunction: 'linear',
                  animationIterationCount: 'infinite',
                  animationPlayState: 'running'
                }}
              >
                {/* 첫 번째 세트 - 5개 행 */}
                <div className="scroll-section" style={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  height: '100%', 
                  padding: '15px', 
                  gap: '40px',
                  justifyContent: 'space-around'
                }}>
                  {distributedRows.map((row, rowIndex) => (
                    <div key={`first-row-${rowIndex}`} style={{ 
                      display: 'flex', 
                      gap: '50px', 
                      alignItems: 'center',
                      minHeight: `${100 / 5}%`
                    }}>
                      {row.map((entry) => (
                        <GuestBookCard key={`first-${entry.id}`} entry={entry} cardDimensions={cardDimensions} windowWidth={windowWidth} />
                      ))}
                      </div>
                  ))}
                    </div>
                  </div>
                </div>
          )}
                  </div>

          {/* 로딩 및 에러 상태 */}
          {loading && (
            <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-80">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
                </div>
          )}

          {error && (
            <div className="absolute inset-0 flex flex-col justify-center items-center bg-white bg-opacity-80">
              <p className="text-red-500 mb-4">오류가 발생했습니다: {error}</p>
              <button 
                onClick={() => refetch()}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                다시 시도
              </button>
              </div>
          )}

          {!loading && !error && entries.length === 0 && (
            <div className="absolute inset-0 flex flex-col justify-center items-center">
              <p className="text-gray-500 mb-4">아직 남겨진 메시지가 없습니다.</p>
              <p className="text-gray-400">첫 번째 메시지를 남겨보세요!</p>
          </div>
          )}
        </div>

          {/* 로딩 및 에러 상태 */}
          {loading && (
            <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-80">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex flex-col justify-center items-center bg-white bg-opacity-80">
              <p className="text-red-500 mb-4">오류가 발생했습니다: {error}</p>
              <button 
                onClick={() => refetch()}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                다시 시도
              </button>
            </div>
          )}

          {!loading && !error && entries.length === 0 && (
            <div className="absolute inset-0 flex flex-col justify-center items-center">
              <p className="text-gray-500 mb-4">아직 남겨진 메시지가 없습니다.</p>
              <p className="text-gray-400">첫 번째 메시지를 남겨보세요!</p>
            </div>
          )}
      </div>

      {/* 모달 */}
      {showModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: '#000000B2' }}
          onClick={handleModalClose}
        >
          {/* 모달 컨텐츠 */}
          <div 
            className="relative"
            style={{
              width: '380px',
              height: '159px',
              borderRadius: '20px',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 질문 */}
            <div style={{ 
              textAlign: 'center',
              paddingTop: '15px'
            }}>
              <h2 style={{
                color: 'var(--White, #FFF)',
                fontFamily: 'Pretendard',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: '700',
                lineHeight: '24px',
                margin: 0
              }}>
                응원의 메세지를 남기겠습니까?
              </h2>
            </div>
            
            {/* 확인 메시지 */}
            <div style={{
              textAlign: 'center',
              padding: '20px'
            }}>
              <p style={{
                color: 'var(--White, #FFF)',
                fontFamily: 'Pretendard',
                fontSize: '14px',
                fontStyle: 'normal',
                fontWeight: '400',
                lineHeight: '18px',
                letterSpacing: '-0.028px',
                margin: 0
              }}>
                보낸이와 받는이를 정확하게 기입했는지<br/>다시 한번 확인해주세요.
              </p>
            </div>

            {/* 버튼들 */}
            <div style={{
              display: 'flex',
              gap: '20px',
              paddingBottom: '30px'
            }}>
              <button
                onClick={handleModalClose}
                style={{
                  width: '91px',
                  height: '34px',
                  display: 'flex',
                  padding: '8px 15px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '10px',
                  borderRadius: '5px',
                  background: 'var(--White, #FFF)',
                  border: 'none',
                  fontFamily: 'Pretendard',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#666666',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F5F5F5';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                }}
              >
                되돌아가기
              </button>
              
              <button
                onClick={handleConfirmSubmit}
                style={{
                  width: '106px',
                  height: '34px',
                  display: 'flex',
                  padding: '8px 15px',
                  alignItems: 'center',
                  gap: '10px',
                  borderRadius: '5px',
                  background: 'var(--Green, #00E53A)',
                  border: 'none',
                  fontFamily: 'Pretendard',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#00CC33';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#00E53A';
                }}
              >
                메세지 전하기
              </button>
        </div>
      </div>
      </div>
      )}
    </div>
  );
};

export default GuestBookPage;
