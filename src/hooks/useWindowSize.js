import { useState, useEffect } from 'react';
import useStore from '@/helpers/store';

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      function handleResize() {
        const viewport = {
          height: window.innerHeight,
          width: window.innerWidth,
        };

        setWindowSize(viewport);
        useStore.setState({ viewport });
      }

      window.addEventListener('resize', handleResize);
      handleResize();

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return windowSize;
};
