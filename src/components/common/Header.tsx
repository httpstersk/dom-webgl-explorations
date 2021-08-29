import Logo from '@/components/common/Logo';
import Navigation from '@/components/common/Navigation';
import UnsplashLogo from '@/components/common/UnsplashLogo';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  align-items: center;
  display: flex;
  inset-block-start: 0;
  inline-size: 100vw;
  justify-content: center;
  padding: calc(var(--flow-space) + 1vw);
  position: fixed;
  z-index: 1;
`;

export default function Header({ ...props }) {
  return (
    <HeaderWrapper {...props}>
      <Navigation>
        <Logo />

        <Link href="https://unsplash.com/">
          <a target="_blank">
            <UnsplashLogo />
          </a>
        </Link>
      </Navigation>
    </HeaderWrapper>
  );
}
