import useStore, { top } from '@/helpers/store';
import { ScrollDirection } from '@/types';
import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';

type WrapperProps<T> = {
  children: React.ReactNode;
};

const Main = styled.main`
  --content-padding: 10vw;
  display: grid;
  height: ${({ height }) => `${height}vh`};
  inline-size: 100vw;
  inset-block-start: 0;
  inset-inline-start: 50%;
  min-height: 100vh;
  overflow-x: ${({ direction }) =>
    direction === 'vertical' ? 'hidden' : 'auto'};
  overflow-y: scroll;
  place-content: center;
  pointer-events: none;
  position: absolute;
  scroll-behavior: smooth;
  transform: translateX(-50%);
  z-index: 0;
`;

const getScrollTop = () => {
  if (!document.body) return 0;

  const { body, documentElement } = document;
  const scrollTop = documentElement
    ? documentElement.scrollTop || body.scrollTop
    : body.scrollTop;

  return scrollTop;
};

const WrapperInner = ({ children, direction = 'vertical', ...rest }, ref) => {
  const onScroll = useCallback(() => {
    const scrollTop = getScrollTop();
    return ((top as React.MutableRefObject<number>).current = scrollTop);
  }, []);

  useEffect(() => {
    addEventListener('scroll', onScroll);
    return () => removeEventListener('scroll', onScroll);
  }, [onScroll]);

  return (
    <Main height={200} direction={direction} ref={ref} {...rest}>
      {children}
    </Main>
  );
};

export const Wrapper = React.forwardRef(WrapperInner) as <T>(
  props: WrapperProps<T> & {
    direction?: ScrollDirection;
    ref?: React.ForwardedRef<HTMLElement>;
  },
) => ReturnType<typeof WrapperInner>;
