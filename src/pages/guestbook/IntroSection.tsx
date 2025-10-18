interface IntroSectionProps {
  windowWidth: number;
}

export const IntroSection = ({ windowWidth }: IntroSectionProps) => {
  // 한글 텍스트 스타일
  const getKoreanTextStyle = () => {
    if (windowWidth <= 768) {
      return {
        color: 'var(--Black, #000)',
        textAlign: 'center' as const,
        fontFamily: 'Pretendard',
        fontSize: '14px',
        fontStyle: 'normal' as const,
        fontWeight: '700',
        lineHeight: '18px',
        letterSpacing: '-0.028px'
      };
    } else if (windowWidth >= 1020 && windowWidth < 1350) {
      return {
        color: 'var(--Black, #000)',
        textAlign: 'center' as const,
        fontFamily: 'Pretendard',
        fontSize: '24px',
        fontStyle: 'normal' as const,
        fontWeight: '700',
        lineHeight: '32px',
        letterSpacing: '-0.048px'
      };
    } else if (windowWidth >= 600 && windowWidth < 1020) {
      return {
        color: 'var(--Black, #000)',
        textAlign: 'center' as const,
        fontFamily: 'Pretendard',
        fontSize: '24px',
        fontStyle: 'normal' as const,
        fontWeight: '700',
        lineHeight: '32px',
        letterSpacing: '-0.048px'
      };
    } else if (windowWidth >= 400 && windowWidth < 600) {
      return {
        color: 'var(--Black, #000)',
        textAlign: 'center' as const,
        fontFamily: 'Pretendard',
        fontSize: '14px',
        fontStyle: 'normal' as const,
        fontWeight: '700',
        lineHeight: '18px',
        letterSpacing: '-0.028px'
      };
    } else {
      return { letterSpacing: '-0.064px' };
    }
  };

  // 영문 텍스트 스타일
  const getEnglishTextStyle = () => {
    if (windowWidth <= 768) {
      return {
        color: '#666666',
        textAlign: 'center' as const,
        fontFamily: 'Pretendard',
        fontSize: '12px',
        fontStyle: 'normal' as const,
        fontWeight: '300',
        lineHeight: 'normal' as const,
        letterSpacing: '-0.024px'
      };
    } else if (windowWidth >= 1020 && windowWidth < 1350) {
      return {
        color: '#666666',
        textAlign: 'center' as const,
        fontFamily: 'Pretendard',
        fontSize: '16px',
        fontStyle: 'normal' as const,
        fontWeight: '400',
        lineHeight: '24px',
        letterSpacing: '-0.032px'
      };
    } else if (windowWidth >= 600 && windowWidth < 1020) {
      return {
        color: '#666666',
        textAlign: 'center' as const,
        fontFamily: 'Pretendard',
        fontSize: '16px',
        fontStyle: 'normal' as const,
        fontWeight: '400',
        lineHeight: '24px',
        letterSpacing: '-0.032px'
      };
    } else if (windowWidth >= 400 && windowWidth < 600) {
      return {
        color: '#666666',
        textAlign: 'center' as const,
        fontFamily: 'Pretendard',
        fontSize: '12px',
        fontStyle: 'normal' as const,
        fontWeight: '300',
        lineHeight: 'normal' as const,
        letterSpacing: '-0.024px'
      };
    } else {
      return {
        color: '#666666',
        fontStyle: 'normal' as const
      };
    }
  };

  // 한글 텍스트 내용
  const getKoreanTextContent = () => {
    if (windowWidth <= 768) {
      return (
        <>
          작은 불꽃이 큰 등불이 되는 시대,<br/>
          무하마드 알리가 던진 단 두 음절 "ME, WE"는
          반세기 만에<br/>우리 사회의 운영 원리로 떠올랐습니다.
        </>
      );
    } else if (windowWidth >= 600 && windowWidth < 1020) {
      return (
        <>
          작은 불꽃이 큰 등불이 되는 시대,<br/>
          무하마드 알리가 던진 단 두 음절 "ME, WE"는 반세기 만에 우리 사회의 운영 원리로 떠올랐습니다.
        </>
      );
    } else if (windowWidth >= 400 && windowWidth < 600) {
      return (
        <>
          작은 불꽃이 큰 등불이 되는 시대,<br/>
          무하마드 알리가 던진 단 두 음절 "ME, WE"는 반세기 만에 우리 사회의 운영 원리로<br/>
          떠올랐습니다.
        </>
      );
    } else {
      return (
        <>
          작은 불꽃이 큰 등불이 되는 시대,<br/>
          <span className="whitespace-nowrap">무하마드 알리가 던진 단 두 음절 "ME, WE"는 반세기 만에 우리 사회의 운영 원리로 떠올랐습니다.</span>
        </>
      );
    }
  };

  const koreanStyle1 = getKoreanTextStyle();
  const koreanStyle2 = { ...getKoreanTextStyle(), marginTop: '8px' };
  const englishStyle = getEnglishTextStyle();

  return (
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
             style={koreanStyle1}>
            {getKoreanTextContent()}
          </p>
          {windowWidth <= 768 ? null : (windowWidth >= 600 && windowWidth < 1350) ? null : <><br/><br/></>}
          <p className={windowWidth <= 768 ? "text-black font-bold text-center" : "text-xl md:text-2xl lg:text-3xl xl:text-3xl text-black font-bold text-center leading-relaxed mt-12"}
             style={koreanStyle2}>
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
          <p className="text-lg md:text-xl leading-relaxed"
             style={englishStyle}>
            In an age where small sparks can become powerful lights,
          </p>
          <p className="text-lg md:text-xl leading-relaxed"
             style={englishStyle}>
            Muhammad Ali's simple two-syllable motto, "ME, WE," has emerged as the guiding principle of our society in half a century.
          </p>
          <p className="text-lg md:text-xl leading-relaxed mt-8"
             style={englishStyle}>
            With your message of encouragement, become a beacon of light that illuminates "us" for someone else.
          </p>
        </div>
      </div>
    </div>
  );
};
