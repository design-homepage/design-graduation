import { useParams } from 'react-router-dom';
import { PropLargeSection } from './PropLargeSection';
import { PropSmallSection } from './PropSmallSection';
import { useMemo } from 'react';
import { arrows } from './constants/arrows';

const WorkDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const arrowData = useMemo(() => arrows.find((item) => item.id.toString() === id), [id]);

  if (!arrowData) {
    return <div>Profile not found</div>;
  }

  return (
    <>
      <img src="/work/work_image.png" alt="Work Detail" className="w-full h-auto" />
      <PropSmallSection arrowData={arrowData} />
      <PropLargeSection arrowData={arrowData} />
      <img src="/work/work_person.png" alt="Work Person" className="w-full h-auto" />
    </>
  );
};

export default WorkDetailPage;
