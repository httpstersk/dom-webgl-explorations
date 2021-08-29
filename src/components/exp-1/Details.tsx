import { ReactThreeFiberProps, UnsplashImage } from '@/types';
import router from 'next/router';
import React from 'react';
import Portrait from './Portrait';

type Props = ReactThreeFiberProps & {
  image: UnsplashImage;
};

const Details: React.FC<Props> = ({ image }) => {
  return (
    <Portrait
      image={image.src}
      isPage
      index={0}
      onClick={() => router?.push('/exp-1')}
      {...image}
      r3f
    />
  );
};

export default React.memo(Details);
