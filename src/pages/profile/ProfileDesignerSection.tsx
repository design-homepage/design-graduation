type ProfileDesignerSectionProps = {
  profileData: {
    profileDetailUrl: string;
    arrowUrl: string;
    name: string;
  };
};

export const ProfileDesignerSection = ({ profileData }: ProfileDesignerSectionProps) => {
  return (
    <div className="flex flex-col">
      <p className="text-base font-bold text-primary border-b border-primary">DESIGNER</p>
      <div className="flex">
        <div className="flex items-center w-[calc(100%-246px)]">
          <img src={profileData.profileDetailUrl} alt="Profile" className="object-cover" />
        </div>
        <div className="relative">
          <img src={profileData.arrowUrl} alt="Arrow" className="w-[246px] h-[246px] opacity-20" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="pt-[35px] flex flex-col gap-5">
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
    </div>
  );
};
