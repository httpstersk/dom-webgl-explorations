import React from 'react';
import styled from 'styled-components';

const PlusAnimatedGradient = styled.svg`
  animation: var(--hue-animation);
`;

export default function Plus({ size = '3vw' }) {
  return (
    <PlusAnimatedGradient
      fill="none"
      height={size}
      strokeWidth="2"
      strokeLinecap="butt"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      style={{ stroke: 'var(--accent-color)' }}
      width={size}
    >
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </PlusAnimatedGradient>
  );
}
