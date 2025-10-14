type PropLargeSectionProps = {
  arrowData: {
    id: number;
    whiteImageUrl: string;
    greenImageUrl: string;
    workTitle: string;
    workTitle2: string;
    name: string;
    englishName: string;
    email: string;
    instagram: string;
    link: string;
    intro: string;
    koreanExplanation: string;
    englishExplanation: string;
  };
};

export const PropLargeSection = ({ arrowData }: PropLargeSectionProps) => {
  return (
    <div className="hidden lg:flex xl:flex-col gap-21 px-[10px] sm:px-[20px] md:px-[50px] xl:px-[100px] py-[100px] md:py-[150px]">
      <div className="flex flex-col gap-7 lg:gap-[70px] xl:gap-7">
        <div className="flex flex-col gap-4 xl:gap-[60px] flex-shrink-0">
          <div>
            <p className="font-bold text-sm sm:text-base md:text-xl xl:text-6xl text-primary whitespace-nowrap leading-tight">
              {arrowData.workTitle}
            </p>
            <p className="font-bold text-sm sm:text-base md:text-xl xl:text-6xl text-primary break-words leading-tight">
              {arrowData.workTitle2}
            </p>
          </div>
          <div>
            <p className="font-bold text-sm sm:text-base md:text-xl text-primary whitespace-nowrap">
              {arrowData.name}
            </p>
            <p className="font-bold text-sm sm:text-base md:text-xl text-primary whitespace-nowrap">
              {arrowData.englishName}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 flex-shrink-0">
          <div>
            <p className="font-light text-sm sm:text-base md:text-xl text-muted break-all whitespace-nowrap">
              <a href={`mailto:${arrowData.email}`} target="_blank" rel="noreferrer">
                {arrowData.email}
              </a>
            </p>
            <p className="font-light text-sm sm:text-base md:text-xl text-muted break-all whitespace-nowrap">
              {arrowData.instagram && (
                <a href={arrowData.instagram.split(' / ')[1]} target="_blank" rel="noreferrer">
                  @{arrowData.instagram.split(' / ')[0]}
                </a>
              )}
            </p>
            <p className="font-light text-sm sm:text-base md:text-xl text-muted break-all whitespace-nowrap">
              <a href={arrowData.link} target="_blank" rel="noreferrer">
                {arrowData.link}
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-7">
        <div className="flex-1">
          <p className="text-sm sm:text-base md:text-xl text-white">
            {arrowData.koreanExplanation}
          </p>
        </div>
        <div className="flex-1">
          <p className="text-sm sm:text-base md:text-xl text-white">
            {arrowData.englishExplanation}
          </p>
        </div>
      </div>
    </div>
  );
};
