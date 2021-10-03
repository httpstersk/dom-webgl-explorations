import useStore from '@/helpers/store';
import { ReactThreeFiberProps } from '@/types';
import React from 'react';
import Project from './Project';

const Projects: React.FC<ReactThreeFiberProps> = () => {
  const [image] = useStore((state) => state.exp4Imgs);

  return (
    <group>
      <Project image={image.src} isPage={false} {...image} />
    </group>
  );
};

export default React.memo(Projects);
