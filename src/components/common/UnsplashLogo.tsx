import React from 'react';
import styled from 'styled-components';

const Unsplash = styled.svg`
  cursor: pointer;
`;

export default function UnsplashLogo({ color = 'white', size = 32, ...props }) {
  return (
    <Unsplash height={size} viewBox="0 0 32 32" width={size} {...props}>
      <path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z" fill={color} />
    </Unsplash>
  );
}
