import type { TeamMember } from '@/types/teamMembers';
import { teamMemberNames } from '@/types/teamMembers';

interface GuestBookFormProps {
  formData: {
    sender: string;
    message: string;
    receiver: TeamMember;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  responsiveStyles: {
    containerWidth: string;
    containerHeight: string;
    padding: string;
    labelFontSize: string;
    labelFontWeight: string;
    labelLineHeight: string;
    labelLetterSpacing: string;
    inputFontSize: string;
    inputFontWeight: string;
    inputLineHeight: string;
    inputLetterSpacing: string;
    buttonFontSize: string;
    buttonFontWeight: string;
    buttonLineHeight: string;
    buttonLetterSpacing: string;
  };
}

export const GuestBookForm = ({ formData, onInputChange, onSubmit, responsiveStyles }: GuestBookFormProps) => {
  return (
    <div
      className="relative snap-start z-10"
      style={{ height: 'calc(100vh - 64px)' }}
    >
      <div className="flex items-center justify-center h-full">
        <form onSubmit={onSubmit} className="w-full max-w-4xl mx-auto px-8 flex flex-col items-center">
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
                    onChange={onInputChange}
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
              <div className="border-t border-black-400 border-opacity-30" style={{ width: '100%', margin: '6px 0' }}></div>

              {/* 2. 메시지 섹션 */}
              <div style={{ width: '100%', flex: 1, position: 'relative' }}>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={onInputChange}
                  rows={8}
                  className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all duration-200 text-sm text-gray-800 placeholder-gray-600 resize-none"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    backdropFilter: 'none',
                    height: '100%',
                    minHeight: '140px',
                    paddingBottom: '18px'
                  }}
                  placeholder="메시지를 입력해주세요"
                  required
                  maxLength={200}
                />
                <div style={{
                  position: 'absolute',
                  bottom: '8px',
                  right: '0',
                  paddingRight: '4px'
                }}>
                  <span className="text-xs text-black drop-shadow-lg">{formData.message.length}/200</span>
                </div>
              </div>

              {/* 구분선 */}
              <div className="border-t border-gray-400 border-opacity-30" style={{ width: '100%', margin: '6px 0' }}></div>

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
                    onChange={onInputChange}
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
          <div className="flex justify-center" style={{ marginTop: '80px' }}>
            <button
              type="submit"
              className="transition-all duration-200 hover:scale-105"
              style={{
                display: 'flex',
                padding: '12px 28px',
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
  );
};
