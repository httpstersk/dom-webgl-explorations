import H1 from '@/components/common/H1';
import Plus from '@/components/common/Plus';
import Small from '@/components/common/Small';
import React from 'react';
import styled from 'styled-components';

const Logotype = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding-block-end: var(--flow-space);
  position: relative;
  overflow: hidden;
`;

const Marquee = styled(Small)`
  --offset: calc(var(--marquee-size) * -2);
  animation: marquee 6s linear infinite;
  font-size: calc(0.875rem + 0.375vw);
  inset-block-end: 0;
  position: absolute;
  text-shadow: var(--marquee-size) 0 currentColor,
    calc(var(--marquee-size) * 2) 0 currentColor,
    calc(var(--marquee-size) * 3) 0 currentColor;
  transform: translateX(var(--offset));
  white-space: nowrap;
  will-change: transform;

  @keyframes marquee {
    to {
      transform: translateX(var(--marquee-size-reversed));
    }
  }
`;

export default function Logo({ ...props }) {
  return (
    <Logotype {...props}>
      <H1>
        DOM
        <Plus />
        WEBGL
      </H1>
      <Marquee>Explorations</Marquee>
    </Logotype>
  );
}
