import { useState } from 'react';
import HoverImage from '/profile/card-hover.webp';

type ProfileCardProps = {
  imageUrl: string;
  name: string;
};

export const ProfileCard = ({ imageUrl, name }: ProfileCardProps) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className="relative h-full overflow-hidden"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <img
        src={imageUrl}
        alt={name}
        className={`w-full h-full object-contain object-center transition-opacity duration-300 ease-out ${isHover ? 'opacity-0' : 'opacity-100'} z-10`}
        draggable={false}
      />
      <img
        src={HoverImage}
        alt={name}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-out ${isHover ? 'opacity-100' : 'opacity-0'} z-20`}
        draggable={false}
      />
      <div
        className={`absolute inset-0 bg-primary/50 flex justify-center items-center transition-opacity duration-300 ease-out z-30 ${isHover ? 'opacity-100' : 'opacity-0'}`}
      >
        <p className="text-white text-4xl font-bold">{name}</p>
      </div>
    </div>
  );
};
