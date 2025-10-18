import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type FooterProps = {
  color?: 'primary' | 'black' | 'white' | 'transparent';
};

const Footer = ({ color = 'transparent' }: FooterProps) => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1920
  );
  const location = useLocation();
  const isGuestbook = location.pathname === '/guestbook';
  const isBlackBackground = location.pathname.startsWith('/work/');

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getResponsiveStyles = () => {
    if (windowWidth >= 1300) {
      return {
        width: '1920px',
        minHeight: '280px',
        paddingTop: '50px',
        paddingRight: '100px',
        paddingBottom: '50px',
        paddingLeft: '100px',
      };
    } else if (windowWidth >= 1020) {
      return {
        width: '1350px',
        minHeight: '260px',
        paddingTop: '45px',
        paddingRight: '50px',
        paddingBottom: '45px',
        paddingLeft: '50px',
      };
    } else if (windowWidth >= 600) {
      return {
        width: '1020px',
        minHeight: '240px',
        paddingTop: '30px',
        paddingRight: '50px',
        paddingBottom: '30px',
        paddingLeft: '50px',
      };
    } else if (windowWidth >= 400) {
      return {
        width: '600px',
        minHeight: '200px',
        paddingTop: '25px',
        paddingRight: '20px',
        paddingBottom: '25px',
        paddingLeft: '20px',
      };
    } else {
      // windowWidth < 400
      return {
        width: '400px',
        minHeight: '180px',
        paddingTop: '20px',
        paddingRight: '10px',
        paddingBottom: '20px',
        paddingLeft: '10px',
      };
    }
  };

  const styles = getResponsiveStyles();

  return (
    <footer
      className="flex items-start w-full"
      style={{
        minHeight: styles.minHeight,
        paddingTop: styles.paddingTop,
        paddingRight: styles.paddingRight,
        paddingBottom: styles.paddingBottom,
        paddingLeft: styles.paddingLeft,
        backgroundColor: color,
        position: 'relative',
        zIndex: 50,
      }}
    >
      <div
        className="w-full flex items-start justify-center"
        style={{
          maxWidth: styles.width,
          margin: '0 auto',
        }}
      >
        {/* 로고 */}
        <div className="flex-shrink-0 mr-8 pt-2">
          <img
            src={isGuestbook ? '/logo_W.webp' : '/logo_L.webp'}
            alt="me"
            style={{
              height: '40px',
            }}
          />
        </div>

        {/* 중간: 한국어 + 영어 정보 */}
        <div className="flex-1 mr-8">
          <div
            className="mb-2"
            style={{
              color: isGuestbook ? '#FFFFFF' : isBlackBackground ? '#FFFFFF' : '#00E53A',
              fontSize: windowWidth < 600 ? '12px' : '20px',
              fontWeight: windowWidth < 600 ? 'bold' : 'normal',
            }}
          >
            <div>경북대학교 디자인학과</div>
            <div>북구 대학로 80 경북대학교 대구캠퍼스 Space 9</div>
            <div>2025. 10. 28 TUE - 2025. 11. 8 SAT</div>
          </div>
          <div
            style={{
              color: isGuestbook ? '#FFFFFF' : isBlackBackground ? '#FFFFFF' : '#00E53A',
              fontSize: windowWidth < 600 ? '12px' : '20px',
              fontWeight: windowWidth < 600 ? 'bold' : 'normal',
            }}
          >
            <div>Kyungpook National University, Department of Design</div>
            <div>80 Daehak-ro, Buk-gu, Kyungpook National University, Daegu Campus Space 9</div>
            <div>2025. 10. 28 TUE - 2025. 11. 8 SAT</div>
          </div>
        </div>

        {/* 오른쪽: 연락처 정보 */}
        <div className="flex-shrink-0">
          <div
            style={{
              color: isGuestbook ? '#FFFFFF' : isBlackBackground ? '#FFFFFF' : '#00E53A',
              fontSize: windowWidth < 600 ? '12px' : '20px',
              fontWeight: windowWidth < 600 ? 'bold' : 'normal',
            }}
          >
            <div>Instagram @knu_design_</div>
            <div>T.053-950-5694</div>
            <div>https://vcd.knu.ac.kr</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
