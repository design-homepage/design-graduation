import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="pt-[104px] sm:pt-[108px] md:pt-[124px] lg:pt-[170px] bg-primary min-h-screen flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
