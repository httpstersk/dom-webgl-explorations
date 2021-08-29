import Header from '@/components/common/Header';
import Title from '@/components/common/Title';
import { Wrapper } from '@/components/common/Wrapper';
import React, { Fragment } from 'react';
import { SplitChars, Timeline, Tween } from 'react-gsap';

export default function Layout({ children }) {
  return (
    <Fragment>
      <Header />

      <Title blendMode="normal" isFixed>
        <Timeline
          target={
            <SplitChars wrapper={<div style={{ display: 'inline-block' }} />}>
              №1
            </SplitChars>
          }
        >
          <Tween
            duration={0.5}
            from={{ opacity: 0, y: '100vh' }}
            stagger={{ each: 0.05, ease: 'expo.in' }}
            position="+=1"
          ></Tween>
        </Timeline>
      </Title>

      {children && <Wrapper direction="vertical">{children}</Wrapper>}
    </Fragment>
  );
}
