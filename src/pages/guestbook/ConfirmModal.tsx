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
        display: 'flex',
        width: '520px',
        padding: '55px 0',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '80px',
        borderRadius: '15px',
        background: 'rgba(255, 255, 255, 0.10)'
      };
    } else if (windowWidth > 400) {
      // Tab과 Tab>Mobile 사이즈 (400px~1020px)
      return {
        display: 'flex',
        width: '420px',
        padding: '40px 0',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '60px',
        borderRadius: '15px',
        background: 'rgba(255, 255, 255, 0.10)'
      };
    } else {
      // Mobile 사이즈 (400px 이하)
      return {
        display: 'flex',
        width: '320px',
        height: '219px',
        padding: '30px 0',
        flexDirection: 'column',
        alignItems: 'center',
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
          flexDirection: modalStyles.flexDirection as 'column' | 'row' | 'column-reverse' | 'row-reverse' | undefined
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 질문과 확인 메시지 컨테이너 */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px'
        }}>
          <h2 style={{
            color: 'var(--White, #FFF)',
            textAlign: 'center',
            fontFamily: 'Pretendard',
            fontSize: windowWidth > 1020 ? '24px' : windowWidth > 400 ? '20px' : '16px',
            fontStyle: 'normal',
            fontWeight: '700',
            lineHeight: windowWidth > 1020 ? '32px' : windowWidth > 400 ? '26px' : '24px',
            letterSpacing: windowWidth > 1020 ? '-0.048px' : windowWidth > 400 ? '-0.04px' : '0px',
            margin: 0
          }}>
            응원의 메세지를 남기겠습니까?
          </h2>
          
          <p style={{
            color: 'var(--White, #FFF)',
            textAlign: 'center',
            fontFamily: 'Pretendard',
            fontSize: windowWidth > 1020 ? '16px' : windowWidth > 400 ? '14px' : '14px',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: windowWidth > 1020 ? '24px' : windowWidth > 400 ? '18px' : '18px',
            letterSpacing: windowWidth > 1020 ? '0px' : windowWidth > 400 ? '-0.028px' : '-0.028px',
            margin: 0
          }}>
            보낸이와 받는이를 정확하게 기입했는지<br/>다시 한번 확인해주세요.
          </p>
        </div>

        {/* 버튼들 */}
        <div style={{
          display: 'flex',
          gap: windowWidth > 1020 ? '30px' : windowWidth > 400 ? '25px' : '20px'
        }}>
          <button
            onClick={onClose}
            style={{
              display: 'flex',
              padding: windowWidth <= 400 ? '8px 15px' : '8px 15px',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '10px',
              borderRadius: '5px',
              background: 'var(--White, #FFF)',
              border: 'none',
              fontFamily: 'Pretendard',
              fontSize: windowWidth > 1020 ? '16px' : windowWidth > 400 ? '14px' : '14px',
              fontWeight: '400',
              color: 'var(--40, #999)',
              textAlign: 'center',
              lineHeight: '18px',
              letterSpacing: '-0.028px',
              width: windowWidth <= 400 ? 'auto' : 'auto',
              flexShrink: windowWidth <= 400 ? 0 : 'auto',
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
              display: 'flex',
              padding: windowWidth <= 400 ? '8px 15px' : '8px 15px',
              alignItems: 'center',
              gap: '10px',
              borderRadius: '5px',
              background: 'var(--Green, #00E53A)',
              border: 'none',
              fontFamily: 'Pretendard',
              fontSize: windowWidth > 1020 ? '16px' : windowWidth > 400 ? '14px' : '14px',
              fontWeight: '700',
              color: 'var(--White, #FFF)',
              textAlign: 'center',
              lineHeight: '18px',
              letterSpacing: '-0.028px',
              width: windowWidth <= 400 ? 'auto' : 'auto',
              flexShrink: windowWidth <= 400 ? 0 : 'auto',
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
