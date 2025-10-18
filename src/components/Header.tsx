import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { useState } from 'react';

type HeaderProps = {
  color: 'primary' | 'black' | 'white' | 'transparent';
};

const Header = ({ color }: HeaderProps) => {
  const location = useLocation();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mobileOnlyItem = { path: ROUTES.ABOUT, mobileMenu: 'ABOUT' };

  const navItems = [
    { path: ROUTES.WORK, label: 'Work', mobileMenu: 'WORK', korean: '작업물' },
    { path: ROUTES.PROFILE, label: 'Profile', mobileMenu: 'PROFILE', korean: '프로필' },
    { path: ROUTES.GUESTBOOK, label: 'GuestBook', mobileMenu: 'GUEST BOOK', korean: '방명록' },
    { path: ROUTES.ARCHIVE, label: 'Archive', mobileMenu: 'ARCHIVE', korean: '아카이브' },
  ];

  const bgClass =
    color === 'black'
      ? 'bg-black/70'
      : color === 'white'
      ? 'bg-white/70'
      : color === 'primary'
      ? 'bg-primary/70'
      : 'bg-transparent';

  return (
    <header
      className={`fixed w-full top-0 ${bgClass} backdrop-blur-[30px] h-[104px] sm:h-[108px] md:h-[124px] lg:h-[170px] flex items-center z-100`}
    >
      <div
        className={`w-full flex items-center justify-between px-[10px] sm:px-[20px] md:px-[50px] xl:px-[100px] ${color === 'black' || color === 'transparent' ? 'text-white' : 'text-foreground'}`}
      >
        <Link to={ROUTES.ABOUT} className="flex gap-[17px] md:gap-5 items-center px-5">
          <img
            src={
              color === 'black' || location.pathname === ROUTES.ABOUT
                ? '/logo_W.webp'
                : '/logo_B.webp'
            }
            alt="Logo"
            className="w-[42px] h-[27px] md:w-[70px] md:h-[40px] ease-out duration-300"
          />
          <div>
            <p className="font-bold text-inherit text-sm md:text-xl">
              2025 경북대학교 디자인학과 졸업전시회
            </p>
            <p className="font-bold text-inherit text-sm md:text-xl">
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
              className={`text-2xl xl:text-3xl ease-out duration-300 text-inherit hover:text-white ${
                location.pathname.startsWith(item.path)
                  ? `${color !== 'primary' ? 'text-primary' : 'text-white'} font-bold`
                  : 'text-foreground'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* 모바일 메뉴 버튼 (추후 구현) */}
        <div className="lg:hidden">
          <button
            className={color === 'black' ? 'text-white' : 'text-black'}
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="h-6 w-6 sm:h-12 sm:w-12 ease-out duration-300"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask
                id="mask0_3698_8448"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="48"
                height="48"
              >
                <rect width="48" height="48" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_3698_8448)">
                <path
                  d="M7 13.2695V11H41V13.2695H7ZM7 37V34.7305H41V37H7ZM7 25.1345V22.8655H41V25.1345H7Z"
                  fill="black"
                />
              </g>
            </svg>
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="lg:hidden h-[1020px] justify-between bg-black/50 backdrop-blur-[30px] absolute top-full left-0 w-full flex flex-col z-10 px-[50px] py-[15px]">
          <nav className="flex flex-col gap-[50px]">
            {[mobileOnlyItem, ...navItems].map((item) => (
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
          <img src="/logo_W.webp" alt="Logo" className="w-[42px] h-[27px]" />
        </div>
      )}
    </header>
  );
};

export default Header;
