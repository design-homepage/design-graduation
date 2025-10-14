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
    <div className="flex justify-center items-center min-h-[calc(100vh-104px)] sm:min-h-[calc(100vh-108px)] md:min-h-[calc(100vh-124px)] lg:min-h-[calc(100vh-170px)]">
      <div className="flex flex-col p-[50px] md:p-[100px] w-full">
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
                  className="cursor-pointer max-w-[42px] sm:max-w-[71px] md:max-w-[117px] lg:max-w-[192px] xl:max-w-[196px] object-contain min-w-0 w-[calc(100%/7)] hover:mix-blend-difference"
                />
              ))}
            </div>
          );
        })}
      </div>
      <DetailModal selected={selectedId} />
    </div>
  );
};

export default WorkPage;
