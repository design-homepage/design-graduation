import { ProfileSectionContainer } from './ProfileSectionContainer';
import WorkImage from '/work/work_image.webp';

export const ProfileWorkSection = () => {
  return (
    <ProfileSectionContainer title="WORK">
      <img src={WorkImage} alt="Work" className="object-cover" />
    </ProfileSectionContainer>
  );
};
