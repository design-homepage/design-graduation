import { ROUTES } from '@/constants';
import { useModal } from '@/contexts/ModalContext';
import { useNavigate } from 'react-router-dom';
import { arrows } from './constants/arrows';

type DetailModalProps = {
  selected: number | null;
};

export const DetailModal = ({ selected }: DetailModalProps) => {
  const { isOpen, closeModal } = useModal();
  const navigate = useNavigate();

  if (!isOpen || !selected) return null;

  const arrow = arrows.find((arrow) => arrow.id === selected);

  if (!arrow) return null;

  const gotoDetail = (id: number) => {
    navigate(`${ROUTES.WORK}/${id}`);
  };
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    closeModal();
  };

  return (
    <div className="flex fixed lg:top-[170px] md:top-[124px] sm:top-[108px] top-[104px] left-0 w-full h-full bg-black/60 xl:px-[100px] md:px-[50px] px-[20px] pb-[50px] justify-center items-center z-200">
      <div
        className="flex w-full xl:flex-row flex-col gap-[30px] xl:gap-5 cursor-pointer"
        onClick={() => gotoDetail(selected)}
      >
        <img src="/work/work_image.webp" alt="Work Detail" />
        <div className="flex flex-1 xl:flex-col flex-row gap-5 justify-between">
          <div>
            <p className="text-xl md:text-3xl lg:text-4xl text-white font-bold">
              {arrow.workTitle}
            </p>
            <p className="text-xl md:text-3xl lg:text-4xl text-white font-bold">
              {arrow.workTitle2}
            </p>
            <p className="text-base md:text-xl lg:text-3xl xl:text-3xl text-white font-bold mt-5">
              {arrow.name}
            </p>
            <p className="text-sm md:text-base lg:text-2xl text-white mt-[30px]">{arrow.intro}</p>
          </div>
          <div className="flex xl:justify-end justify-start">
            <img
              src="/chevron-left.svg"
              alt="Left Arrow"
              className="w-6 h-6 sm:w-12 sm:h-12 flex-shrink-0 cursor-pointer"
              onClick={(e) => handleClose(e)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
