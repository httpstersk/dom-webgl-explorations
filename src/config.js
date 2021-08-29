import Head from 'next/head';

const url = '';
const description = '';
const author = 'HTTPSTER';

const MetaTags = ({ title = 'DOM+WEBGL Explorations' }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="language" content="english" />
        <meta httpEquiv="content-type" content="text/html" />
        <meta name="author" content={author} />
        <meta name="designer" content={author} />
        <meta name="publisher" content={author} />

        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="" />
        <meta name="robots" content="index,follow" />
        <meta name="distribution" content="web" />
        <meta name="og:title" content={title} />
        <meta name="og:type" content="site" />
        <meta name="og:url" content={url} />
        <meta name="og:image" content={'/icons/share.png'} />
        <meta name="og:site_name" content={title} />
        <meta name="og:description" content={description} />

        <meta
          name="viewport"
          content="width=device-width, minimum-scale=1, initial-scale=1.0"
        />
        <meta name="theme-color" content="#000" />
      </Head>
    </>
  );
};

export default MetaTags;
