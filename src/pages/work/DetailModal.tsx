import { useModal } from '@/contexts/ModalContext';

export const DetailModal = () => {
  const { isOpen, closeModal } = useModal();

  if (!isOpen) return null;

  return (
    <div className="flex fixed lg:top-[170px] md:top-[124px] sm:top-[108px] top-[104px] left-0 w-full h-full bg-black/60 xl:px-[100px] md:px-[50px] px-[20px] pb-[50px] justify-center items-center">
      <div className="flex w-full xl:flex-row flex-col gap-[30px] xl:gap-5">
        <img src="/work_image.png" alt="Work Detail" />
        <div className="flex xl:flex-col flex-row gap-5 justify-between">
          <div>
            <p className="text-xl md:text-3xl lg:text-4xl text-white font-bold">
              디지털 미니멀리즘
            </p>
            <p className="text-xl md:text-3xl lg:text-4xl text-white font-bold">
              Digital Minimalism
            </p>
            <p className="text-base md:text-xl lg:text-3xl xl:text-3xl text-white font-bold mt-5">
              권민정
            </p>
            <p className="text-sm md:text-base lg:text-2xl text-white mt-[30px]">
              ‘정보의 무게에 묻혀 있다. 정보는 지식과 혼동되고, 양은 풍요와 행복으로 착각된다.’
            </p>
          </div>
          <div className="flex xl:justify-end justify-start">
            <img
              src="/chevron-left.svg"
              alt="Left Arrow"
              className="w-6 h-6 sm:w-12 sm:h-12 flex-shrink-0 cursor-pointer"
              onClick={closeModal}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
