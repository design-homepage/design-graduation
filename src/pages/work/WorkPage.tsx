import { useModal } from '@/contexts/ModalContext';
import { DetailModal } from './DetailModal';
import { arrows } from './constants/arrows';
import { useState } from 'react';

const WorkPage = () => {
  const { openModal } = useModal();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const rowCounts = [1, 3, 5, 7, 3, 3];
  let startIndex = 0;

  const clickArrow = (id: number) => {
    setSelectedId(id);
    openModal();
  };

  return (
    <>
      <div className="flex flex-col p-[50px] md:p-[100px]">
        {rowCounts.map((count, rowIndex) => {
          const rowArrows = arrows.slice(startIndex, startIndex + count);
          startIndex += count;

          return (
            <div key={rowIndex} className="flex justify-center">
              {rowArrows.map((arrow) => (
                <img
                  key={arrow.id}
                  src={hoveredId === arrow.id ? arrow.greenImageUrl : arrow.whiteImageUrl}
                  alt="Arrow"
                  onClick={() => clickArrow(arrow.id)}
                  onMouseEnter={() => setHoveredId(arrow.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="cursor-pointer w-[42px] sm:w-[71px] md:w-[117px] lg:w-[192px] xl:w-[196px] hover:invert"
                />
              ))}
            </div>
          );
        })}
      </div>
      <DetailModal selected={selectedId} />
    </>
  );
};

export default WorkPage;
