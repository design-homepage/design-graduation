import { useNavigate, useParams } from 'react-router-dom';
import { profile } from './constants/profile';
import { useMemo, useEffect } from 'react';
import { ProfileDesignerSection } from './ProfileDesignerSection';
import { ProfileInterviewSection } from './ProfileInterviewSection';
import { arrows } from '../work/constants/arrows';
import { ROUTES } from '@/constants';
import { ProfileSectionContainer } from './ProfileSectionContainer';

const ProfileDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const profileData = useMemo(() => profile.find((item) => item.id.toString() === id), [id]);
  const workData = useMemo(() => arrows.find((item) => item.id.toString() === id), [id]);
  const gotoWorkDetail = () => {
    navigate(ROUTES.WORK_DETAIL.replace(':id', id || ''));
  };

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
      <ProfileSectionContainer title="WORK">
        <img
          src={workData?.thumbnail}
          alt="Work Detail"
          className="hover:grayscale ease-out transition-all duration-300 w-full min-w-0 xl:flex-3"
          onClick={() => gotoWorkDetail()}
          onError={(e) => {
            console.error('Image failed to load:', workData?.thumbnail);
            e.currentTarget.style.border = '2px solid red';
          }}
        />
      </ProfileSectionContainer>
    </div>
  );
};

export default ProfileDetailPage;
