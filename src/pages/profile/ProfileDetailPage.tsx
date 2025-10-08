import { useParams } from 'react-router-dom';
import { profile } from './constants/profile';
import { useMemo } from 'react';
import { ProfileDesignerSection } from './ProfileDesignerSection';
import { ProfileInterviewSection } from './ProfileInterviewSection';
import { ProfileWorkSection } from './ProfileWorkSection';

const ProfileDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const profileData = useMemo(() => profile.find((item) => item.id.toString() === id), [id]);

  if (!profileData) {
    return <div>Profile not found</div>;
  }

  return (
    <div className="flex flex-col px-[10px] sm:px-[20px] md:px-[50px] xl:px-[100px] gap-15 sm:gap-[100px] md:gap-[140px] lg:gap-[200px] xl:gap-[350px]">
      <ProfileDesignerSection profileData={profileData} />
      <div className="flex flex-col gap-15 sm:gap-[70px] md:gap-[50px] lg:gap-[120px] xl:gap-[100px]">
        <ProfileInterviewSection profileData={profileData} />
        <ProfileWorkSection profileData={profileData} />
      </div>
    </div>
  );
};

export default ProfileDetailPage;
