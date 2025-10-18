import { ProfileSectionContainer } from './ProfileSectionContainer';

type ProfileInterviewSectionProps = {
  q1: string;
  q2: string;
};

export const ProfileInterviewSection = ({ q1, q2 }: ProfileInterviewSectionProps) => {
  return (
    <ProfileSectionContainer title="INTERVIEW" option="md:flex-row md:gap-20">
      <div className="flex-1 flex flex-col gap-2 md:gap-8 text-sm md:text-base lg:text-xl">
        <p className="font-bold text-primary border-b-2 border-primary">
          Q. 자신만의 ME:WE 이야기가 있을까요?
        </p>
        <p>{q1}</p>
      </div>
      <div className="flex-1 flex flex-col gap-2 md:gap-8 text-sm md:text-base lg:text-xl">
        <p className="font-bold text-primary border-b-2 border-primary">
          Q. 작품에 대해 어떻게 바라보면 좋을까요?
        </p>
        <p>{q2}</p>
      </div>
    </ProfileSectionContainer>
  );
};
