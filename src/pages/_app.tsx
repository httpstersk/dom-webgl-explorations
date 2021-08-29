import MetaTags from '@/config';
import { CONSTANTS } from '@/constants';
import useStore from '@/helpers/store';
import DefaultLayout from '@/layouts/default';
import '@/styles/fonts.css';
import '@/styles/index.css';
import '@/styles/reset.css';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { Children, Fragment, Suspense, useEffect } from 'react';
import styled from 'styled-components';

const Viewport = styled.div`
  margin: auto;
  max-width: ${({ isSquare }) =>
    isSquare ? `${CONSTANTS.SIZES.INSTAGRAM}px` : 'none'};
  overflow-x: hidden;
`;

const Scene =
  process.env.NODE_ENV === 'production'
    ? dynamic(() => import('@/components/common/Scene'), { ssr: false })
    : require('@/components/common/Scene').default;

function ForwardPropsToR3FComponent({ Component, pageProps }) {
  const Layout = Component.Layout || DefaultLayout;
  const webgl = [];
  const dom = [];

  try {
    Children.forEach(Component(pageProps).props.children, (child) => {
      if (child?.props && child.props.r3f) {
        webgl.push(child);
      } else {
        dom.push(child);
      }
    });

    return (
      <Fragment>
        {dom && (
          <Viewport isSquare={false}>
            <Layout>{dom}</Layout>
          </Viewport>
        )}

        {webgl && (
          <Scene isSquare={false}>
            <Suspense fallback={``}>{webgl}</Suspense>
          </Scene>
        )}
      </Fragment>
    );
  } catch (error) {
    // Fallback security for SSG
    return <Component {...pageProps} />;
  }
}

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    useStore.setState({ router });
  }, [router]);

  return (
    <Fragment>
      <MetaTags title={pageProps.title} />
      <ForwardPropsToR3FComponent Component={Component} pageProps={pageProps} />
    </Fragment>
  );
}
