interface ConfirmModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  windowWidth: number;
}

export const ConfirmModal = ({ show, onClose, onConfirm, windowWidth }: ConfirmModalProps) => {
  if (!show) return null;

  // 반응형 스타일 계산
  const getModalStyles = () => {
    if (windowWidth > 1020) {
      // Web과 Web>Tab 사이즈
      return {
        width: '520px',
        height: '226px',
        padding: '55px 0',
        gap: '80px',
        borderRadius: '15px',
        background: 'rgba(255, 255, 255, 0.10)'
      };
    } else if (windowWidth > 768) {
      // Tab과 Tab>Mobile 사이즈
      return {
        width: '420px',
        height: '182px',
        padding: '40px 0',
        gap: '60px',
        borderRadius: '15px',
        background: 'rgba(255, 255, 255, 0.10)'
      };
    } else {
      // Mobile 사이즈
      return {
        width: '320px',
        height: '159px',
        padding: '30px 0',
        gap: '45px',
        borderRadius: '15px',
        background: 'rgba(255, 255, 255, 0.10)'
      };
    }
  };

  const modalStyles = getModalStyles();

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: '#000000B2' }}
      onClick={onClose}
    >
      {/* 모달 컨텐츠 */}
      <div 
        className="relative"
        style={{
          ...modalStyles,
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 질문 */}
        <div style={{ 
          textAlign: 'center'
        }}>
          <h2 style={{
            color: 'var(--White, #FFF)',
            fontFamily: 'Pretendard',
            fontSize: windowWidth > 1020 ? '18px' : windowWidth > 768 ? '16px' : '14px',
            fontStyle: 'normal',
            fontWeight: '700',
            lineHeight: windowWidth > 1020 ? '28px' : windowWidth > 768 ? '24px' : '20px',
            margin: 0
          }}>
            응원의 메세지를 남기겠습니까?
          </h2>
        </div>
        
        {/* 확인 메시지 */}
        <div style={{
          textAlign: 'center'
        }}>
          <p style={{
            color: 'var(--White, #FFF)',
            fontFamily: 'Pretendard',
            fontSize: windowWidth > 1020 ? '16px' : windowWidth > 768 ? '14px' : '12px',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: windowWidth > 1020 ? '24px' : windowWidth > 768 ? '20px' : '16px',
            letterSpacing: '-0.028px',
            margin: 0
          }}>
            보낸이와 받는이를 정확하게 기입했는지<br/>다시 한번 확인해주세요.
          </p>
        </div>

        {/* 버튼들 */}
        <div style={{
          display: 'flex',
          gap: windowWidth > 1020 ? '30px' : windowWidth > 768 ? '25px' : '20px'
        }}>
          <button
            onClick={onClose}
            style={{
              width: windowWidth > 1020 ? '120px' : windowWidth > 768 ? '100px' : '80px',
              height: windowWidth > 1020 ? '40px' : windowWidth > 768 ? '36px' : '32px',
              display: 'flex',
              padding: '8px 15px',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '10px',
              borderRadius: '5px',
              background: 'var(--White, #FFF)',
              border: 'none',
              fontFamily: 'Pretendard',
              fontSize: windowWidth > 1020 ? '16px' : windowWidth > 768 ? '14px' : '12px',
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
            onClick={onConfirm}
            style={{
              width: windowWidth > 1020 ? '140px' : windowWidth > 768 ? '120px' : '100px',
              height: windowWidth > 1020 ? '40px' : windowWidth > 768 ? '36px' : '32px',
              display: 'flex',
              padding: '8px 15px',
              alignItems: 'center',
              gap: '10px',
              borderRadius: '5px',
              background: 'var(--Green, #00E53A)',
              border: 'none',
              fontFamily: 'Pretendard',
              fontSize: windowWidth > 1020 ? '16px' : windowWidth > 768 ? '14px' : '12px',
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
  );
};
