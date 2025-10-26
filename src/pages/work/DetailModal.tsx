import { ROUTES } from '@/constants';
import { useModal } from '@/contexts/ModalContext';
import { useNavigate } from 'react-router-dom';
import { arrows } from './constants/arrows';
import React, { useEffect } from 'react';

type DetailModalProps = {
  selected: number | null;
};

export const DetailModal = ({ selected }: DetailModalProps) => {
  const { isOpen, closeModal } = useModal();
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      window.scrollTo(0, 0);
    }
  }, [isOpen]);

  if (!isOpen || !selected) return null;

  const arrow = arrows.find((arrow) => arrow.id === selected);

  if (!arrow) return null;

  const gotoDetail = (id: number) => {
    closeModal();
    navigate(`${ROUTES.WORK}/${id}`);
  };
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    closeModal();
  };

  return (
    <div className="fixed lg:top-[120px] md:top-[100px] top-[80px] left-0 w-full lg:h-[calc(100vh-120px)] md:h-[calc(100vh-100px)] h-[calc(100vh-80px)] bg-black/60 overflow-y-auto z-[200]">
      <div className="flex min-h-full justify-center items-center xl:px-[100px] md:px-[50px] px-[20px] py-[200px]">
        <div className="flex w-full flex-col gap-[30px] xl:gap-5 cursor-pointer">
          <div className="relative overflow-hidden">
            <img
              src={arrow.thumbnail}
              alt="Work Detail"
              className="transition-transform duration-300 ease-out hover:scale-105 hover:grayscale w-full object-cover"
              onClick={() => gotoDetail(selected)}
            />
          </div>
          <div className="flex flex-1 xl:flex-col flex-row gap-5 justify-between">
            <div>
              <div className="flex flex-col xl:flex-row xl:gap-2">
                <p className="text-xl md:text-3xl lg:text-4xl text-white font-bold">
                  {arrow.workTitle}
                </p>
                <p className="text-xl md:text-3xl lg:text-4xl text-white font-bold">
                  {arrow.workTitle2}
                </p>
              </div>
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
    </div>
  );
};
