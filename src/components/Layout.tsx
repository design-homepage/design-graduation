import { Outlet } from 'react-router-dom';
import Header from './Header';

type LayoutProps = {
  color: 'primary' | 'black' | 'white';
};

const Layout = ({ color }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header color={color} />
      <main
        className={`pt-[104px] sm:pt-[108px] md:pt-[124px] lg:pt-[170px] min-h-screen flex-grow ${color === 'black' ? 'bg-black' : color === 'white' ? 'bg-white' : 'bg-primary'}`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
