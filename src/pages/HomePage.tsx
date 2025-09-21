import React from 'react';

interface HomePageProps {}

const HomePage = (props: HomePageProps) => {
  return (
    <div className="py-20">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Welcome to My Portfolio
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          안녕하세요! 저의 포트폴리오 사이트에 오신 것을 환영합니다.
        </p>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <p className="text-gray-700 text-lg leading-relaxed">
            상단 네비게이션을 통해 다양한 페이지를 둘러보세요.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
