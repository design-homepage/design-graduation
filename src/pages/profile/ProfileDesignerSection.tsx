import { ProfileSectionContainer } from './ProfileSectionContainer';

type ProfileDesignerSectionProps = {
  profileData: {
    profileDetailUrl: string;
    arrowUrl: string;
    name: string;
  };
};

export const ProfileDesignerSection = ({ profileData }: ProfileDesignerSectionProps) => {
  return (
    <ProfileSectionContainer title="DESIGNER">
      <div className="flex">
        <div className="flex items-start pt-[25px] w-[calc(100%-246px)] sm:w-[calc(100%-410px)]">
          <img src={profileData.profileDetailUrl} alt="Profile" className="object-cover" />
        </div>
        <div className="absolute mx-[calc(100%-246px)] sm:mx-[calc(100%-410px)] w-[246px] sm:w-[410px]">
          <img
            src={profileData.arrowUrl}
            alt="Arrow"
            className="w-[246px] sm:w-[410px] h-[246px] sm:h-[410px] opacity-20"
          />
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-start pl-[25px]">
            <div className="flex flex-col gap-5 pt-[50px]">
              <div className="text-primary">
                <div className="text-2xl font-bold border-b border-primary">{profileData.name}</div>
                <div className="text-base font-bold border-b border-primary">Park Soyeon</div>
              </div>

              <div className="flex gap-5 text-xs text-black">
                <div className="flex flex-col">
                  <p>Email</p>
                  <p>Instagram</p>
                  <p>Behance</p>
                </div>
                <div className="flex flex-col">
                  <p>thdus6288@gmail.com</p>
                  <p>@parksxyexn</p>
                  <p>@parksxyexn</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-sm">
        디자이너 소개) ME:WE는 개인의 개별성이 서로를 밀어내는 것이 아니라, 우리의 정체성을
        확장시키고 증폭시키는 에너지가 될 수 있다는 믿음에서 출발합니다. 나를 통해 우리가 되고, 우리
        안에서 나를 본 이야기를 통해 모두 함께 새로운 에너지를 일으켜 보세요. 가ㅏㅏㅏ ME:WE
      </div>
    </ProfileSectionContainer>
  );
};
