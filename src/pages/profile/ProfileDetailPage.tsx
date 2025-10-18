import { useParams } from 'react-router-dom';
import { profile } from './constants/profile';
import { useMemo, useEffect } from 'react';
import { ProfileDesignerSection } from './ProfileDesignerSection';
import { ProfileInterviewSection } from './ProfileInterviewSection';
import { ProfileWorkSection } from './ProfileWorkSection';

const ProfileDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const profileData = useMemo(() => profile.find((item) => item.id.toString() === id), [id]);

  // 페이지가 로드될 때마다 스크롤을 맨 위로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (profileData?.cursor) {
      document.body.style.cursor = `url(${profileData.cursor}) 4 4, auto`;
    }
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [profileData]);

  if (!profileData) {
    return <div>Profile not found</div>;
  }

  return (
    <div className="flex flex-col px-[10px] sm:px-[20px] md:px-[50px] xl:px-[100px] gap-15 sm:gap-[70px] md:gap-[50px] lg:gap-[120px] xl:gap-[100px]">
      <ProfileDesignerSection
        name={profileData.name}
        englishName={profileData.englishName}
        email={profileData.email}
        instagram={profileData.instagram}
        behance={profileData.link}
        intro={profileData.intro}
        imageUrl={profileData.profileDetailUrl}
        arrowUrl={profileData.arrowUrl}
      />
      <ProfileInterviewSection q1={profileData.q1} q2={profileData.q2} />
      <ProfileWorkSection />
    </div>
  );
};

export default ProfileDetailPage;
