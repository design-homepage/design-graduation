import type { PropsWithChildren } from 'react';

type ProfileSectionContainerProps = {
  title: string;
  option?: string;
};

export const ProfileSectionContainer = ({
  title,
  children,
  option = '',
}: ProfileSectionContainerProps & PropsWithChildren) => {
  return (
    <div className="flex flex-col gap-5 sm:gap-8">
      <p className="text-base sm:text-xl md:text-2xl lg:text-3xl font-bold text-primary border-b border-primary">
        {title}
      </p>
      <div className={`flex flex-col gap-5 ${option}`}>{children}</div>
    </div>
  );
};
