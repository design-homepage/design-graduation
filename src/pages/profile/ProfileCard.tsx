import { useState } from 'react';
import HoverImage from '/profile/card-hover.webp';
import { arrows } from '../work/constants/arrows';

type ProfileCardProps = {
  imageUrl: string;
  name: string;
  cursor: string;
  id: number;
};

export const ProfileCard = ({ imageUrl, name, cursor, id }: ProfileCardProps) => {
  const [isHover, setIsHover] = useState(false);
  const arrow = arrows.find((item) => item.id === id);

  return (
    <div
      className="relative h-full"
      style={{ cursor: `url(${cursor}) 4 4, auto` }}
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
        src={arrow?.thumbnail || HoverImage}
        alt={name}
        className={`absolute inset-0 w-full scale-x-[115%] xl:scale-x-[122%] h-full object-cover transition-opacity duration-300 ease-out ${isHover ? 'opacity-100' : 'opacity-0'} z-20`}
        draggable={false}
      />
      <div
        className={`absolute inset-0 flex justify-center items-center transition-opacity duration-300 ease-out z-30 ${isHover ? 'opacity-100' : 'opacity-0'}`}
      >
        <p className=" text-4xl font-bold text-white">{name}</p>
      </div>
    </div>
  );
};
