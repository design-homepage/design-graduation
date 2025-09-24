import { useModal } from '@/contexts/ModalContext';
import { ArrowButton } from './ArrowButton';
import { DetailModal } from './DetailModal';

const WorkPage = () => {
  const { openModal } = useModal();

  return (
    <div className="pt-[104px] sm:pt-[108px] md:pt-[124px] lg:pt-[170px] bg-primary min-h-screen">
      <ArrowButton x={500} y={500} buttonClick={() => openModal()} />
      <ArrowButton x={300} y={300} buttonClick={() => openModal()} />
      <DetailModal />
    </div>
  );
};

export default WorkPage;
