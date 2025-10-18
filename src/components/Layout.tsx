// src/components/Layout.tsx
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

type LayoutProps = {
  color: 'primary' | 'black' | 'white' | 'transparent';
  footer?: 'default' | 'none';
  footerColor?: 'primary' | 'black' | 'white' | 'transparent';
};

const Layout = ({ color, footer = 'default', footerColor = 'transparent' }: LayoutProps) => {
  const bgClass =
    color === 'transparent'
      ? ''
      : color === 'black'
        ? 'bg-black'
        : color === 'white'
          ? 'bg-white'
          : 'bg-primary';

  const mainBgClass =
    color === 'transparent'
      ? ''
      : color === 'black'
        ? 'bg-black'
        : color === 'white'
          ? 'bg-white'
          : 'bg-primary';

  return (
    <div className={`min-h-screen flex flex-col ${bgClass}`}>
      <Header color={color} />
      <main
        className={`flex-1 pt-[104px] sm:pt-[108px] md:pt-[124px] lg:pt-[170px] ${mainBgClass}`}
      >
        <Outlet />
      </main>
      {footer === 'default' && <Footer color={footerColor} />}
    </div>
  );
};

export default Layout;
