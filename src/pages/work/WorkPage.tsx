import { useModal } from '@/contexts/ModalContext';
import { ArrowButton } from './ArrowButton';
import { DetailModal } from './DetailModal';

const WorkPage = () => {
  const { openModal } = useModal();

  return (
    <div className="py-12 bg-primary min-h-[calc(100vh-170px)]">
      <ArrowButton x={500} y={500} buttonClick={() => openModal()} />
      <ArrowButton x={300} y={300} buttonClick={() => openModal()} />
      <DetailModal />
    </div>
  );
};

export default WorkPage;
