import React from 'react';
import styled from 'styled-components';

const SmallCaps = styled.small`
  font-family: inherit;
  font-size: small;
  font-variant: small-caps;
  letter-spacing: 0.1vw;
  text-transform: lowercase;
`;

export default function Small({ children, ...props }) {
  return <SmallCaps {...props}>{children}</SmallCaps>;
}
