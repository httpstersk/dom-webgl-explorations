import Details from '@/components/exp-1/Details';
import useStore, { initializeStore } from '@/helpers/store';
import Exp1Layout from '@/layouts/exp-1';
import { UnsplashImage } from '@/types';
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

export async function getServerSideProps(context) {
  const store = initializeStore();
  const allImgs = useStore((state) => state.allImgs);
  const image = allImgs.find(
    (img: UnsplashImage) => img._id === Number(context.query.id),
  );

  return {
    props: {
      image,
    },
  };
}
