import { PropLargeSection } from './PropLargeSection';
import { PropSmallSection } from './PropSmallSection';

const WorkDetailPage = () => {
  return (
    <>
      <img src="/work/work_image.png" alt="Work Detail" className="w-full h-auto" />
      <PropSmallSection />
      <PropLargeSection />
      <img src="/work/work_person.png" alt="Work Person" className="w-full h-auto" />
    </>
  );
};

export default WorkDetailPage;
