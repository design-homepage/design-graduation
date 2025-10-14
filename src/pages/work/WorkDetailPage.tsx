import { useParams } from 'react-router-dom';
import { PropLargeSection } from './PropLargeSection';
import { PropSmallSection } from './PropSmallSection';
import { useEffect, useMemo } from 'react';
import { arrows } from './constants/arrows';

const WorkDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const arrowData = useMemo(() => arrows.find((item) => item.id.toString() === id), [id]);

  if (!arrowData) {
    return <div>Profile not found</div>;
  }

  return (
    <>
      <img src="/work/work_image.webp" alt="Work Detail" className="w-full h-auto" />
      <PropSmallSection arrowData={arrowData} />
      <PropLargeSection arrowData={arrowData} />
      <img src="/work/work_person.webp" alt="Work Person" className="w-full h-auto" />
    </>
  );
};

export default WorkDetailPage;
