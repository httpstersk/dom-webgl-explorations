import Header from '@/components/common/Header';
import { Wrapper } from '@/components/common/Wrapper';
import React, { Fragment } from 'react';

export default function Layout({ children }) {
  return (
    <Fragment>
      <Header />

      {children && <Wrapper>{children}</Wrapper>}
    </Fragment>
  );
}
