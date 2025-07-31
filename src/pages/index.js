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
        <title>Salmed - Servicios de Salud Ocupacional, Ergonomía y Bienestar laboral</title>
        <meta
          name='description'
          content='Expertos en Salud Ocupacional y Medicina del Trabajo en Venezuela. Ofrecemos servicios de Ergonomía, gestión de Riesgos Laborales y Psicosociales, evaluaciones de puesto de trabajo y programas de seguridad y salud laboral (INPSASEL). Suministramos Equipos de Protección Personal (EPP) como botas de seguridad. Atendemos en Caracas, Valencia, Porlamar, Maturín, Barcelona y Puerto La Cruz.'
        />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1'
        />
        <link
          rel='icon'
          href='/favicon.ico'
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
