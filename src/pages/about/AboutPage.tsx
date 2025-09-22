import React from 'react';
import AboutHero from './components/AboutHero';

interface AboutPageProps {}

const AboutPage = (props: AboutPageProps) => {
  return (
    <div className="min-h-screen">
      <AboutHero />
    </div>
  );
};

export default AboutPage;
