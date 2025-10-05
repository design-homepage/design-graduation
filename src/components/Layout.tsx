import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

type LayoutProps = {
  color: 'primary' | 'black' | 'white';
};

const Layout = ({ color }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header color={color} />
      <main
        className={`pt-[104px] sm:pt-[108px] md:pt-[124px] lg:pt-[170px] bg-${color} min-h-screen flex-grow`}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
