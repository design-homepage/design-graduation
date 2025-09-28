import { PropLargeSection } from './PropLargeSection';
import { PropSmallSection } from './PropSmallSection';

const WorkDetailPage = () => {
  return (
    <div className="pt-[104px] sm:pt-[108px] md:pt-[124px] lg:pt-[170px] bg-black min-h-screen">
      <img src="/work/work_image.png" alt="Work Detail" className="w-full h-auto" />
      <PropSmallSection />
      <PropLargeSection />
      <img src="/work/work_person.png" alt="Work Person" className="w-full h-auto" />
    </div>
  );
};

export default WorkDetailPage;
