import Header from '@/components/common/Header';
import Title from '@/components/common/Title';
import { Wrapper } from '@/components/common/Wrapper';
import gsap, { Back } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import React, { Fragment } from 'react';
import { Tween } from 'react-gsap';

gsap.registerPlugin(ScrollTrigger);

const easeConfig = Back.easeOut.config(2);
const scrollTriggerConfig = {
  start: 0,
  end: '100%',
  scrub: 1,
};

export default function Layout({ children }) {
  return (
    <Fragment>
      <Header />

      <Tween
        ease={easeConfig}
        from={{
          opacity: 0,
          xPercent: -30,
        }}
        to={{
          opacity: 1,
          xPercent: -14.25,
          scrollTrigger: scrollTriggerConfig,
        }}
      >
        <Title blendMode="normal" isFixed>
          №
        </Title>
      </Tween>

      <Tween
        ease={easeConfig}
        from={{
          opacity: 0,
          xPercent: 30,
        }}
        to={{
          opacity: 1,
          xPercent: 14.25,
          scrollTrigger: scrollTriggerConfig,
        }}
      >
        <Title blendMode="normal" isFixed>
          3
        </Title>
      </Tween>

      {children && <Wrapper>{children}</Wrapper>}
    </Fragment>
  );
}
