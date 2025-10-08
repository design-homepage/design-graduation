interface ConfirmModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ConfirmModal = ({ show, onClose, onConfirm }: ConfirmModalProps) => {
  if (!show) return null;

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
            onClick={onClose}
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
            onClick={onConfirm}
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
  );
};
