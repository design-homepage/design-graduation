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
      <div className="flex box-border">
        <div className="flex items-start pt-[25px] w-[calc(100%-226px)] sm:w-[calc(100%-370px)] md:w-[calc(100%-521px)] lg:w-[calc(100%-698px)] xl:w-fit min-h-[171px] md:min-h-[500px] lg:min-h-[674px] xl:min-h-[800px]">
          <img
            src={profileData.profileDetailUrl}
            alt="Profile"
            className="object-contain max-h-[800px]"
          />
        </div>
        <div className="absolute mx-[calc(100%-256px)] sm:mx-[calc(100%-430px)] md:mx-[calc(100%-671px)] lg:mx-[calc(100%-848px)] xl:mx-[calc(100%-1062px)] w-[246px] sm:w-[410px] md:w-[621px] lg:w-[798px] xl:w-[962px]">
          <img
            src={profileData.arrowUrl}
            alt="Arrow"
            className="w-[246px] sm:w-[410px] md:w-[621px] lg:w-[798px] xl:w-[962px] h-[246px] sm:h-[410px] md:h-[621px] lg:h-[798px] xl:h-[962px] opacity-20"
          />
        </div>
        <div className="relative md:w-[621px] lg:w-[798px] xl:w-[calc(100%-654px)]">
          <div className="absolute inset-0 flex items-start pl-[25px] lg:pl-[53px]">
            <div className="flex flex-col gap-5 md:gap-9 lg:gap-11 xl:gap-[50px] pt-[50px] md:pt-[25px]">
              <div className="text-primary">
                <div className="w-fit text-2xl md:text-4xl lg:text-[60px] font-bold border-b border-primary leading-[1.2]">
                  {profileData.name}
                </div>
                <div className="w-fit text-base md:text-2xl lg:text-3xl font-bold border-b border-primary leading-[1.2]">
                  Park Soyeon
                </div>
              </div>
              <div className="flex gap-5 md:gap-[70px] lg:gap-[95px] text-xs md:text-base lg:text-2xl text-black">
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
              <div className="hidden md:flex lg:text-xl">
                디자이너 소개) ME:WE는 개인의 개별성이 서로를 밀어내는 것이 아니라, 우리의 정체성을
                확장시키고 증폭시키는 에너지가 될 수 있다는 믿음에서 출발합니다. 나를 통해 우리가
                되고, 우리 안에서 나를 본 이야기를 통해 모두 함께 새로운 에너지를 일으켜 보세요.
                가ㅏㅏㅏ ME:WE
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden text-sm">
        디자이너 소개) ME:WE는 개인의 개별성이 서로를 밀어내는 것이 아니라, 우리의 정체성을
        확장시키고 증폭시키는 에너지가 될 수 있다는 믿음에서 출발합니다. 나를 통해 우리가 되고, 우리
        안에서 나를 본 이야기를 통해 모두 함께 새로운 에너지를 일으켜 보세요. 가ㅏㅏㅏ ME:WE
      </div>
    </ProfileSectionContainer>
  );
};
