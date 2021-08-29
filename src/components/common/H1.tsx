import React from 'react';
import styled from 'styled-components';

const HeadLevel1 = styled.h1`
  align-items: center;
  animation: var(--hue-animation);
  color: var(--accent-color);
  display: inline-flex;
  font-family: inherit;
  font-size: calc(1.2rem + 2vw);
  font-weight: 700;
  margin: 0;
  margin-inline: -0.1ch;
  user-select: none;
`;

export default function H1({ children, ...props }) {
  return <HeadLevel1 {...props}>{children}</HeadLevel1>;
}
