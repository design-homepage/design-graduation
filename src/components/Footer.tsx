import React, { useState, useEffect } from 'react';

const Footer: React.FC = () => {
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1920);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getResponsiveStyles = () => {
        if (windowWidth >= 1300) {
            return {
                width: '1920px',
                height: '361px',
                paddingTop: '70px',
                paddingRight: '100px',
                paddingBottom: '70px',
                paddingLeft: '100px'
            };
        } else if (windowWidth >= 1020) {
            return {
                width: '1350px',
                height: '361px',
                paddingTop: '70px',
                paddingRight: '50px',
                paddingBottom: '70px',
                paddingLeft: '50px'
            };
        } else if (windowWidth >= 600) {
            return {
                width: '1020px',
                height: '333px',
                paddingTop: '30px',
                paddingRight: '50px',
                paddingBottom: '30px',
                paddingLeft: '50px'
            };
        } else if (windowWidth >= 400) {
            return {
                width: '600px',
                height: '235px',
                paddingTop: '30px',
                paddingRight: '20px',
                paddingBottom: '30px',
                paddingLeft: '20px'
            };
        } else { // windowWidth < 400
            return {
                width: '400px',
                height: '243px',
                paddingTop: '30px',
                paddingRight: '10px',
                paddingBottom: '30px',
                paddingLeft: '10px'
            };
        }
    };

    const styles = getResponsiveStyles();

    return (
        <footer
            className="bg-white flex items-start"
            style={{
                width: '100%',
                maxWidth: styles.width,
                height: styles.height,
                paddingTop: styles.paddingTop,
                paddingRight: styles.paddingRight,
                paddingBottom: styles.paddingBottom,
                paddingLeft: styles.paddingLeft,
                margin: '0 auto'
            }}
        >
            {/* 로고 */}
            <div className="flex-shrink-0 mr-8 pt-2">
                <img
                    src="/logo_L.png"
                    alt="me"
                    style={{
                        height: '40px'
                    }}
                />
            </div>

            {/* 중간: 한국어 + 영어 정보 */}
            <div className="flex-1 mr-8">
                <div className="mb-2" style={{ color: '#00E53A', fontSize: '20px' }}>
                    <div>경북대학교 디자인학과</div>
                    <div>북구 대학로 80 경북대학교 대구캠퍼스 Space 9</div>
                    <div>2025. 10. 28 TUE - 2025. 11. 8 SAT</div>
                </div>
                <div style={{ color: '#00E53A', fontSize: '20px' }}>
                    <div>Kyungpook National University, Department of Design</div>
                    <div>80 Daehak-ro, Buk-gu, Kyungpook National University, Daegu Campus Space 9</div>
                    <div>2025. 10. 28 TUE - 2025. 11. 8 SAT</div>
                </div>
            </div>

            {/* 오른쪽: 연락처 정보 */}
            <div className="flex-shrink-0">
                <div style={{ color: '#00E53A', fontSize: '20px' }}>
                    <div>Instagram @knu_design_</div>
                    <div>T.053-950-5694</div>
                    <div>https://vcd.knu.ac.kr</div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
