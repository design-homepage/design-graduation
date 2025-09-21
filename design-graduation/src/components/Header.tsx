import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '@/constants';

interface HeaderProps {}

const Header = (props: HeaderProps) => {
  const location = useLocation();

  const navItems = [
    { path: ROUTES.HOME, label: 'Home', korean: '홈' },
    { path: ROUTES.ABOUT, label: 'About', korean: '소개' },
    { path: ROUTES.WORK, label: 'Work', korean: '작업물' },
    { path: ROUTES.PROFILE, label: 'Profile', korean: '프로필' },
    { path: ROUTES.GUESTBOOK, label: 'GuestBook', korean: '방명록' },
    { path: ROUTES.ARCHIVE, label: 'Archive', korean: '아카이브' },
  ];

  return (
    <header className="bg-blue-600 shadow-lg border-b-4 border-blue-700">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <Link to={ROUTES.HOME} className="text-xl font-bold text-white">
            Portfolio
          </Link>

          {/* 네비게이션 */}
          <nav className="flex space-x-2 md:space-x-8 overflow-x-auto">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'bg-white text-blue-600'
                    : 'text-white hover:text-blue-200 hover:bg-blue-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* 모바일 메뉴 버튼 (추후 구현) */}
          <div className="md:hidden">
            <button className="text-white hover:text-blue-200">
              <svg
                className="h-6 w-6"
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
      </div>
    </header>
  );
};

export default Header;
