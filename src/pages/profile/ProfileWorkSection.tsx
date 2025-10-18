import { Link, useParams } from 'react-router-dom';
import { ProfileSectionContainer } from './ProfileSectionContainer';
import WorkImage from '/work/work_image.webp';
import { ROUTES } from '@/constants';

export const ProfileWorkSection = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <ProfileSectionContainer title="WORK">
      <Link to={ROUTES.WORK_DETAIL.replace(':id', id || '')} className="w-full">
        <img
          src={WorkImage}
          alt="Work"
          className="w-full object-cover hover:grayscale ease-out transition-all duration-300"
        />
      </Link>
    </ProfileSectionContainer>
  );
};
