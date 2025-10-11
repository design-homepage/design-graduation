import { useState, useCallback, useEffect } from 'react';
import { useGuestBook } from '@/hooks/useGuestBook';
import type { TeamMember } from '@/types/teamMembers';
import { IntroSection } from './IntroSection';
import { GuestBookForm } from './GuestBookForm';
import { InfiniteScrollSection } from './InfiniteScrollSection';
import { ConfirmModal } from './ConfirmModal';

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
        containerHeight: '420px',
        cardWidth: '320px',
        cardHeight: '112px',
        padding: '35px 41px',
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
        containerHeight: '420px',
        cardWidth: '280px',
        cardHeight: '100px',
        padding: '35px 41px',
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
        containerHeight: '420px',
        cardWidth: '200px',
        cardHeight: '80px',
        padding: '30px 35px',
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
        containerHeight: '400px',
        cardWidth: '160px',
        cardHeight: '70px',
        padding: '30px 35px',
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
        padding: '25px 30px',
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
            backgroundImage: 'url(/guestbook/background-white.webp)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'top center',
            backgroundSize: 'cover',
            opacity: 0.3,
            willChange: 'auto'
          }}
        ></div>

        {/* 첫 번째 섹션: 고정된 메시지 화면 */}
        <IntroSection windowWidth={windowWidth} />

        {/* 두 번째 섹션: 방명록 작성 폼 */}
        <GuestBookForm 
          formData={formData}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          responsiveStyles={responsiveStyles}
        />

        {/* 세 번째 섹션: 방명록 목록 */}
        <InfiniteScrollSection 
          entries={entries}
          loading={loading}
          error={error}
          windowWidth={windowWidth}
          cardDimensions={cardDimensions}
          onRefetch={refetch}
        />
      </div>

      {/* 모달 */}
      <ConfirmModal 
        show={showModal}
        onClose={handleModalClose}
        onConfirm={handleConfirmSubmit}
      />
    </div>
  );
};

export default GuestBookPage;