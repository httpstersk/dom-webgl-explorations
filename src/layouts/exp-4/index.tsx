import Header from '@/components/common/Header';
import SvgCircle from '@/components/common/SvgCircle';
import Title from '@/components/common/Title';
import { Wrapper } from '@/components/common/Wrapper';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/dist/MotionPathPlugin';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import React, { Fragment, useRef } from 'react';
import { PlayState, Tween } from 'react-gsap';

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

const CIRCLE_SIZE = 1920;

export default function Layout({ children }) {
  const ref = useRef(null);
  const [path] = MotionPathPlugin.convertToPath(ref.current, false);

  return (
    <Fragment>
      <Header />

      {ref.current && (
        <Tween
          playState={PlayState.pause}
          to={{
            scrollTrigger: {
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },

            motionPath: {
              align: 'self',
              alignOrigin: [0.5, 0.5],
              autoRotate: true,
              start: -Math.PI / 2,
              end: Math.PI / 2,
              path,
            },
          }}
        >
          <Title blendMode="normal" isFixed>
            №4
          </Title>
        </Tween>
      )}

      <SvgCircle ref={ref} size={CIRCLE_SIZE} />

      {children && <Wrapper>{children}</Wrapper>}
    </Fragment>
  );
}
