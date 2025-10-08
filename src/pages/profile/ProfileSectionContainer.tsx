import type { PropsWithChildren } from 'react';

type ProfileSectionContainerProps = {
  title: string;
};

export const ProfileSectionContainer = ({
  title,
  children,
}: ProfileSectionContainerProps & PropsWithChildren) => {
  return (
    <div className="flex flex-col gap-5 sm:gap-8">
      <p className="text-base sm:text-xl font-bold text-primary border-b border-primary">{title}</p>
      <div className="flex flex-col gap-5">{children}</div>
    </div>
  );
};
