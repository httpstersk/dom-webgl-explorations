import { MixBlendMode } from '@/types';
import React, { forwardRef } from 'react';
import styled from 'styled-components';

const H2 = styled.h2`
  align-items: center;
  color: var(--text-color);
  display: flex;
  font-family: ${({ font = 'Object Sans' }) => font};
  font-size: var(--title-size);
  font-weight: 500;
  inset: 0;
  justify-content: center;
  mix-blend-mode: ${({ blendMode = 'initial' }) => blendMode};
  line-height: 1;
  opacity: ${({ opacity = 1 }) => opacity};
  pointer-events: none;
  position: ${({ isFixed = false }) => (isFixed ? 'fixed' : 'initial')};
  text-align: center;
  text-transform: uppercase;
  transform: ${({ isFixed = false }) =>
    isFixed ? 'translateY(-50%)' : 'none'};
  transition: all 0.15s;
  top: ${({ isFixed = false }) => (isFixed ? '55%' : 0)};
  user-select: none;
  will-change: transform;
  word-break: keep-all;
  z-index: 1;
`;

type Props = {
  children: React.ReactNode;
  blendMode?: MixBlendMode;
  font?: string;
  isFixed?: boolean;
  opacity?: number;
};

export type Ref = HTMLHeadingElement;

const Title = forwardRef<Ref, Props>(({ children, font, ...props }, ref) => {
  return (
    <H2 font={font} ref={ref} {...props}>
      {children}
    </H2>
  );
});

export default React.memo(Title);
