import Details from '@/components/exp-1/Details';
import { initialState, useHydrate } from '@/helpers/store';
import Exp1Layout from '@/layouts/exp-1';
import { UnsplashImage } from '@/types';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import React, { Fragment } from 'react';

const Page = ({ image }) => {
  return (
    <Fragment>
      <Details image={image} r3f />
    </Fragment>
  );
};

Page.Layout = Exp1Layout;
export default Page;

export async function getStaticPaths() {
  const store = useHydrate(initialState);
  const paths = store.getState().allImgs.map((img) => ({
    params: {
      id: String(img._id),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext,
) => {
  const { params = {} } = context;
  const store = useHydrate(initialState);
  const image = store
    .getState()
    .allImgs.find((img: UnsplashImage) => img._id === Number(params.id));

  return {
    props: {
      image,
    },
  };
};
