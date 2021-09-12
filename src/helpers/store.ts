import { bikes, buildings, food, nature, portraits } from '@/constants/images';
import { IZustandState } from '@/types';
import { pickItems } from '@/utils';
import { createRef, useLayoutEffect } from 'react';
import create, { SetState } from 'zustand';

let store;

export const initialState: IZustandState = {
  allImgs: [...bikes, ...buildings, ...food, ...nature, ...portraits],
  exp1Imgs: pickItems(portraits, 3),
  exp2Imgs: pickItems(portraits, 2),
  exp3Imgs: pickItems(portraits, 1),
  events: null,
  initialScale: 0.175,
  router: null,
  vhMultiplier: 2,
  viewport: { x: 0, y: 0 },
};

export const top = createRef();

const initializeStore = (preloadedState = {}) =>
  create((set, get) => ({
    ...initialState,
    ...preloadedState,
  }));

export function useHydrate(initialState) {
  let _store = store ?? initializeStore(initialState);

  // For SSR & SSG, always use a new store.
  if (typeof window !== 'undefined') {
    // For CSR, always re-use same store.
    if (!store) {
      store = _store;
    }

    useLayoutEffect(() => {
      if (initialState && store) {
        store.setState({
          ...store.getState(),
          ...initialState,
        });
      }
    }, [initialState]);
  }

  return _store;
}

const useStore = create<IZustandState>((set: SetState<IZustandState>) => ({
  ...initialState,
}));

export default useStore;
