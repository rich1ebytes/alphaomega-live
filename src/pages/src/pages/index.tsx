import Head from 'next/head';
import Component from '@/components/Component';

export default function Home() {
  return (
    <>
      <Head>
        <title>Alpha Omega Artworks</title>
        <meta
          name="description"
          content="Creative studio bringing your artistic visions to life."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component />
    </>
  );
}
