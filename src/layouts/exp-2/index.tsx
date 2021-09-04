import Header from '@/components/common/Header';
import Title from '@/components/common/Title';
import { Wrapper } from '@/components/common/Wrapper';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import React, { Fragment } from 'react';
import { Tween } from 'react-gsap';

gsap.registerPlugin(ScrollTrigger);

export default function Layout({ children }) {
  return (
    <Fragment>
      <Header />

      <Tween
        from={{ xPercent: -100 }}
        to={{
          xPercent: 100,
          scrollTrigger: {
            start: '0',
            end: '100%',
            scrub: 1,
          },
        }}
      >
        <Title blendMode="difference" isFixed>
          №2
        </Title>
      </Tween>

      {children && <Wrapper>{children}</Wrapper>}
    </Fragment>
  );
}
