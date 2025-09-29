import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { useState } from 'react';

type HeaderProps = {
  color: 'primary' | 'black' | 'white';
};

const Header = ({ color }: HeaderProps) => {
  const location = useLocation();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: ROUTES.WORK, label: 'Work', mobileMenu: 'WORK', korean: '작업물' },
    { path: ROUTES.PROFILE, label: 'Profile', mobileMenu: 'PROFILE', korean: '프로필' },
    { path: ROUTES.GUESTBOOK, label: 'GuestBook', mobileMenu: 'GUEST BOOK', korean: '방명록' },
    { path: ROUTES.ARCHIVE, label: 'Archive', mobileMenu: 'ARCHIVE', korean: '아카이브' },
  ];

  return (
    <header
      className={`fixed w-full top-0 bg-${color}/70 backdrop-blur-[30px] h-[104px] sm:h-[108px] md:h-[124px] lg:h-[170px] flex items-center z-10`}
    >
      <div className="w-full flex items-center justify-between px-[10px] sm:px-[20px] md:px-[50px] xl:px-[100px]">
        <Link
          to={ROUTES.ABOUT}
          className="text-xl font-bold text-white flex gap-[17px] md:gap-5 items-center px-5"
        >
          <img
            src="/logo_L=W.png"
            alt="Logo"
            className="w-[42px] h-[27px] md:w-[70px] md:h-[40px]"
          />
          <div>
            <p className="font-bold text-foreground text-sm md:text-xl">
              2025 경북대학교 디자인학과 졸업전시회
            </p>
            <p className="font-bold text-foreground text-sm md:text-xl">
              KNUD Graduation Exhibition Archive
            </p>
          </div>
        </Link>

        {/* 네비게이션 */}
        <nav className="hidden lg:flex gap-10">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-2xl xl:text-3xl ease-out duration-300 ${
                location.pathname.startsWith(item.path) ? 'text-white font-bold' : 'text-foreground'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* 모바일 메뉴 버튼 (추후 구현) */}
        <div className="lg:hidden">
          <button className="text-black" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
            <svg
              className="h-6 w-6 sm:h-12 sm:w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="lg:hidden h-[1020px] justify-between bg-black/50 backdrop-blur-[30px] absolute top-full left-0 w-full flex flex-col z-10 px-[50px] py-[15px]">
          <nav className="flex flex-col gap-[50px]">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-[60px] leading-[1.2] ${
                  location.pathname === item.path ? 'font-bold text-primary' : 'text-white'
                }`}
              >
                {item.mobileMenu}
              </Link>
            ))}
          </nav>
          <img src="/logo_L=W.png" alt="Logo" className="w-[42px] h-[27px]" />
        </div>
      )}
    </header>
  );
};

export default Header;
