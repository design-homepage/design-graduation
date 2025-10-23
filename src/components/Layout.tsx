// src/components/Layout.tsx
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useEffect, useState } from 'react';

type LayoutProps = {
  color: 'primary' | 'black' | 'white' | 'transparent' | 'about-gradient';
  footer?: 'default' | 'none';
  footerColor?: 'primary' | 'black' | 'white' | 'transparent';
};

const Layout = ({ color, footer = 'default', footerColor = 'transparent' }: LayoutProps) => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const bgClass =
    color === 'transparent'
      ? ''
      : color === 'black'
        ? 'bg-black'
        : color === 'white'
          ? 'bg-white'
          : color === 'about-gradient'
            ? ''
            : 'bg-primary';

  const mainBgClass =
    color === 'transparent'
      ? ''
      : color === 'black'
        ? 'bg-black'
        : color === 'white'
          ? 'bg-white'
          : color === 'about-gradient'
            ? ''
            : 'bg-primary';

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 스크롤을 내리면 헤더 숨김, 위로 올리면 표시
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`min-h-screen flex flex-col ${bgClass}`}
      style={color === 'about-gradient' ? {
        background: 'linear-gradient(180deg, #00E73A 53.37%, #FFFFFF 100%)'
      } : undefined}
    >
      <Header color={color} scroll={showHeader ? 'translate-y-0' : '-translate-y-full'} />
      <main
        className={`flex-1 pt-[80px] md:pt-[100px] lg:pt-[120px] ${mainBgClass}`}
        style={color === 'about-gradient' ? {
          background: 'linear-gradient(180deg, #00E73A 53.37%, #FFFFFF 100%)'
        } : undefined}
      >
        <Outlet />
      </main>
      {footer === 'default' && <Footer color={footerColor} />}
    </div>
  );
};

export default Layout;
