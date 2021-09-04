import useStore from '@/helpers/store';
import { ReactThreeFiberProps } from '@/types';
import React from 'react';
import Project from './Project';

const Projects: React.FC<ReactThreeFiberProps> = () => {
  const [startImage, endImage] = useStore((state) => state.exp2Imgs);

  return (
    <group>
      <Project
        texture1={startImage.src}
        texture2={endImage.src}
        isPage={false}
        {...startImage}
      />
    </group>
  );
};

export default React.memo(Projects);
