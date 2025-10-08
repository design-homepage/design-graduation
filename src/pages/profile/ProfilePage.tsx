import { Link } from 'react-router-dom';
import { profile } from './constants/profile';
import { ProfileCard } from './ProfileCard';
import { ROUTES } from '@/constants';

const ProfilePage = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-[10px] sm:gap-[20px] xl:gap-[35px] px-[10px] sm:px-[20px] md:px-[50px] xl:px-[100px]">
      {profile.map((item) => (
        <div key={item.id} className="flex flex-col items-center">
          <Link to={ROUTES.PROFILE_DETAIL.replace(':id', item.id.toString())}>
            <ProfileCard imageUrl={item.profileUrl} name={item.name} />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProfilePage;
