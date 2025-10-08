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
    <div className="flex flex-col">
      <p className="text-base font-bold text-primary border-b border-primary">WORK</p>
      <img src={WorkImage} alt="Work" className="object-cover" />
    </div>
  );
};
