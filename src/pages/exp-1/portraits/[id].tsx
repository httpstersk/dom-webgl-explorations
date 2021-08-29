import Details from '@/components/exp-1/Details';
import { initializeStore } from '@/helpers/store';
import Exp1Layout from '@/layouts/exp-1';
import { UnsplashImage } from '@/types';
import React, { Fragment, useState } from 'react';

const Page = ({ image }) => {
  return (
    <Fragment>
      <Details image={image} r3f />
    </Fragment>
  );
};

Page.Layout = Exp1Layout;
export default Page;

export async function getServerSideProps(context) {
  const store = initializeStore();
  const image = store
    .getState()
    .allImgs.find((img: UnsplashImage) => img._id === Number(context.query.id));

  return {
    props: {
      image,
    },
  };
}
