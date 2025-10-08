import { ProfileSectionContainer } from './ProfileSectionContainer';
import WorkImage from '/work/work_image.png';

type ProfileWorkSectionProps = {
  profileData: {
    profileDetailUrl: string;
    arrowUrl: string;
    name: string;
  };
};

export const ProfileWorkSection = ({ profileData }: ProfileWorkSectionProps) => {
  return (
    <ProfileSectionContainer title="WORK">
      <img src={WorkImage} alt="Work" className="object-cover" />
    </ProfileSectionContainer>
  );
};
