import React from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
  align-items: center;
  color: var(--text-color);
  display: flex;
  justify-content: space-between;
  inline-size: 100%;
`;

export default function Navigation({ children, ...props }) {
  return <Nav {...props}>{children}</Nav>;
}
