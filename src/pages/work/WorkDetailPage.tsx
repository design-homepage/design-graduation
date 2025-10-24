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
      <img src={arrowData.thumbnail} alt="Work Detail" className="w-full h-auto" />
      <PropSmallSection arrowData={arrowData} />
      <PropLargeSection arrowData={arrowData} />
      {arrowData.work.map((workImage, index) =>
        typeof workImage === 'string' ? (
          <img
            key={index}
            src={workImage}
            alt={`Work Detail ${index + 1}`}
            className="w-full h-auto"
          />
        ) : (
          <iframe
            key={index}
            className="w-full aspect-video"
            src={workImage[1]}
            title={`YouTube video player ${index + 1}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        )
      )}
    </>
  );
};

export default WorkDetailPage;
