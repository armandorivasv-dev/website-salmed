import Head from 'next/head';
import { Hero } from '@/sections/hero';
import { AboutUs } from '@/sections/about-us';
import { Features } from '@/sections/features';
import { Services } from '@/sections/services';
import { Epp } from '@/sections/epp';
//import { Testimonials } from '@/sections/testimonials';
import { Quotes } from '@/sections/quotes';

export default function Home() {
  return (
    <>
      <Head>
        <title>Salmed - Medicina Ocupacional</title>
        <meta
          name='description'
          content='Soluciones ágiles y personalizadas para la salud ocupacional.'
        />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1'
        />
        <link
          rel='icon'
          href='/favicon.ico'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap'
          rel='stylesheet'
        />
      </Head>

      <main>
        <Hero />
        <AboutUs />
        <Features />
        <Services />
        <Epp />
        {/* <Testimonials /> */}
        <Quotes />
      </main>
    </>
  );
}
