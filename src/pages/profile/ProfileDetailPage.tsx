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
    <div className="flex flex-col px-[10px] sm:px-[20px] gap-15 sm:gap-[100px]">
      <ProfileDesignerSection profileData={profileData} />
      <ProfileInterviewSection profileData={profileData} />
      <ProfileWorkSection profileData={profileData} />
    </div>
  );
};

export default ProfileDetailPage;
