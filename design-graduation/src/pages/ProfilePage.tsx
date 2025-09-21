import React from 'react';

interface ProfilePageProps {}

const ProfilePage = (props: ProfilePageProps) => {
  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile</h1>
        <div className="bg-white rounded-lg shadow-md p-8">
          <p className="text-gray-600 text-lg leading-relaxed">
            Profile 페이지입니다. 여기에 프로필 정보를 작성하세요.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
