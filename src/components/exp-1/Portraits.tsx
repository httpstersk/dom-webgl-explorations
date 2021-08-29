import useStore from '@/helpers/store';
import { ReactThreeFiberProps } from '@/types';
import React, { useCallback, useMemo } from 'react';
import Portrait from './Portrait';

const Portraits: React.FC<ReactThreeFiberProps> = () => {
  const [exp1Imgs, router] = useStore((state) => [
    state.exp1Imgs,
    state.router,
  ]);

  const images = useMemo(() => exp1Imgs.map(({ src }) => src), []);

  const onPortraitPress = useCallback((event, id) => {
    event.stopPropagation();
    router.push(`/exp-1/portraits/${id}`);
  }, []);

  return (
    <group>
      {exp1Imgs.map((item, i) => (
        <Portrait
          image={images[i]}
          index={i}
          isPage={false}
          key={i}
          onClick={(event) => onPortraitPress(event, item._id)}
          {...item}
        />
      ))}
    </group>
  );
};

export default React.memo(Portraits);
