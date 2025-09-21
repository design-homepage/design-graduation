import React from 'react';

interface WorkPageProps {}

const WorkPage = (props: WorkPageProps) => {
  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Work</h1>
        <div className="bg-white rounded-lg shadow-md p-8">
          <p className="text-gray-600 text-lg leading-relaxed">
            Work 페이지입니다. 여기에 작업물들을 보여주세요.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorkPage;
