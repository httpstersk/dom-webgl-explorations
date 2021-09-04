import router from 'next/router';
import React from 'react';
import Project from './Project';

const Details = ({ details }) => {
  return (
    <Project
      image={details.src}
      isPage
      onClick={() => router.push('/exp-2')}
      {...details}
      r3f
    />
  );
};

export default React.memo(Details);
