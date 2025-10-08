type ProfileInterviewSectionProps = {
  profileData: {
    profileDetailUrl: string;
    arrowUrl: string;
    name: string;
  };
};

export const ProfileInterviewSection = ({ profileData }: ProfileInterviewSectionProps) => {
  return (
    <div className="flex flex-col gap-7">
      <p className="text-base font-bold text-primary border-b border-primary">INTERVIEW</p>
      <div className="flex flex-col gap-2">
        <p className="text-sm font-bold text-primary border-b border-primary">
          Q. 자신만의 ME:WE 이야기가 있을까요?
        </p>
        <p className="text-sm">
          디자이너 소개) ME:WE는 개인의 개별성이 서로를 밀어내는 것이 아니라, 우리의 정체성을
          확장시키고 증폭시키는 에너지가 될 수 있다는 믿음에서 출발합니다. 나를 통해 우리가 되고,
          우리 안에서 나를 본 이야기를 통해 모두 함께 새로운 에너지를 일으켜 보세요.
          가ㅏㅏㅏ디자이너 소개) ME:WE는 개인의 개별성이 서로를 밀어내는 것이 아니라, 우리의 정
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm font-bold text-primary border-b border-primary">
          Q. 작품에 대해 어떻게 바라보면 좋을까요?
        </p>
        <p className="text-sm">
          디자이너 소개) ME:WE는 개인의 개별성이 서로를 밀어내는 것이 아니라, 우리의 정체성을
          확장시키고 증폭시키는 에너지가 될 수 있다는 믿음에서 출발합니다. 나를 통해 우리가 되고,
          우리 안에서 나를 본 이야기를 통해 모두 함께 새로운 에너지를 일으켜 보세요.
          가ㅏㅏㅏ디자이너 소개) ME:WE는 개인의 개별성이 서로를 밀어내는 것이 아니라, 우리의 정
        </p>
      </div>
    </div>
  );
};
