import { ProfileSectionContainer } from './ProfileSectionContainer';

type ProfileDesignerSectionProps = {
  name: string;
  englishName: string;
  email: string;
  instagram: string;
  behance: string;
  intro: string;
  imageUrl: string;
  arrowUrl: string;
};

export const ProfileDesignerSection = ({
  name,
  englishName,
  email,
  instagram,
  behance,
  intro,
  imageUrl,
  arrowUrl,
}: ProfileDesignerSectionProps) => {
  return (
    <ProfileSectionContainer title="DESIGNER" gap={false}>
      <div className="flex box-border">
        <div className="flex items-start pt-[25px] w-fit z-1">
          <img
            src={imageUrl}
            alt="Profile"
            className="object-contain h-[171px] md:h-[500px] lg:h-[674px] xl:h-[800px]"
          />
        </div>
        <div className="absolute mx-[calc(100%-256px)] sm:mx-[calc(100%-430px)] md:mx-[calc(100%-671px)] lg:mx-[calc(100%-848px)] xl:mx-[calc(100%-1062px)] w-[246px] sm:w-[410px] md:w-[621px] lg:w-[798px] xl:w-[962px]">
          <img
            src={arrowUrl}
            alt="Arrow"
            className="w-[246px] sm:w-[410px] md:w-[621px] lg:w-[798px] xl:w-[962px] h-[246px] sm:h-[410px] md:h-[621px] lg:h-[798px] xl:h-[962px] opacity-20"
          />
        </div>
        <div className="relative w-[calc(100%-145px)] md:w-[calc(100%-409px)] lg:w-[calc(100%-551px)] xl:w-[calc(100%-654px)] overflow-hidden">
          <div className="absolute inset-0 flex items-start pl-[25px] lg:pl-[53px]">
            <div className="flex flex-col gap-5 md:gap-9 lg:gap-11 xl:gap-[50px] pt-[50px] md:pt-[25px] w-full">
              <div className="text-primary">
                <div className="w-fit text-2xl md:text-4xl lg:text-[60px] font-bold border-b-2 border-primary leading-[1.2]">
                  {name}
                </div>
                <div className="w-fit text-base md:text-2xl lg:text-3xl font-bold border-b-2 border-primary leading-[1.2]">
                  {englishName}
                </div>
              </div>
              <div className="flex gap-5 md:gap-[70px] lg:gap-[95px] text-xs md:text-base lg:text-2xl text-black w-full">
                <div className="flex flex-col flex-shrink-0">
                  {email && <p>Email</p>}
                  {instagram && <p>Instagram</p>}
                  {behance && <p>Behance</p>}
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <p className="truncate">{email}</p>
                  <p className="truncate">
                    {instagram && (
                      <a href={instagram.split(' / ')[1]} target="_blank" rel="noopener noreferrer">
                        @{instagram.split(' / ')[0]}
                      </a>
                    )}
                  </p>
                  <p className="truncate">
                    <a href={behance} target="_blank" rel="noopener noreferrer">
                      {behance}
                    </a>
                  </p>
                </div>
              </div>
              <div className="hidden md:flex lg:text-xl">{intro}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden text-sm">{intro}</div>
    </ProfileSectionContainer>
  );
};
