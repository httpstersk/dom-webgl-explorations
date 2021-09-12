import useStore from '@/helpers/store';
import { ReactThreeFiberProps } from '@/types';
import React from 'react';
import Project from './Project';

const Projects: React.FC<ReactThreeFiberProps> = () => {
  const exp3Imgs = useStore((state) => state.exp3Imgs);
  const [item] = exp3Imgs;

  return (
    <group>
      <Project image={item.src} isPage={false} {...item} />
    </group>
  );
};

export default React.memo(Projects);
