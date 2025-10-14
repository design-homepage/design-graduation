import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

type LayoutProps = {
  color: 'primary' | 'black' | 'white';
  footer?: 'default' | 'none';
};

const Layout = ({ color, footer = 'default' }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header color={color} />
      <main
        className={`pt-[104px] sm:pt-[108px] md:pt-[124px] lg:pt-[170px] ${color === 'black' ? 'bg-black' : color === 'white' ? 'bg-white' : 'bg-primary'}`}
      >
        <Outlet />
      </main>
      {footer === 'default' && <Footer />}
    </div>
  );
};

export default Layout;
