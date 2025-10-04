import { profile } from './constants/profile';
import { ProfileCard } from './ProfileCard';

const ProfilePage = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-[10px] sm:gap-[20px] xl:gap-[35px] px-[10px] sm:px-[20px] md:px-[50px] xl:px-[100px]">
      {profile.map((item) => (
        <div key={item.id} className="flex flex-col items-center">
          <ProfileCard imageUrl={item.profileUrl} name={item.name} />
        </div>
      ))}
    </div>
  );
};

export default ProfilePage;
