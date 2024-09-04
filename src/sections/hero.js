import { useState } from 'react';
import { Box, Stack, Typography, Button, useMediaQuery } from '@mui/material';
import { ContactForm } from '../components/contact-form';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import { getImageProps } from 'next/image';

function getBackgroundImage(srcSet = '') {
  const imageSet = srcSet
    .split(', ')
    .map((str) => {
      const [url, dpi] = str.split(' ');
      return `url("${url}") ${dpi}`;
    })
    .join(', ');
  return `image-set(${imageSet})`;
}

export const Hero = () => {
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const {
    props: { srcSet },
  } = getImageProps({
    alt: '',
    width: 1920,
    height: 1168,
    src: mdUp ? '/assets/images/salmed-hero.png' : '/assets/images/salmed-hero-mobile.png',
  });
  const backgroundImage = getBackgroundImage(srcSet);
  const style = { height: '100vh', width: '100vw', backgroundSize: 'cover', backgroundImage };

  const [openContactForm, setOpenContactForm] = useState(false);
  const handleOpenContactForm = () => setOpenContactForm(true);
  const handleCloseContactForm = () => setOpenContactForm(false);
  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <Box style={style}>
      <Stack
        direction='column'
        justifyContent='flex-end'
        alignItems='center'
        spacing={2}
        zIndex={1}
      >
        <Typography
          variant={mdUp ? 'h1' : 'h2'}
          color='white'
          textAlign='center'
          sx={{ pt: '30vh' }}
        >
          Medicina <br /> Ocupacional
        </Typography>

        <Typography
          variant='h6'
          color='white'
          maxWidth={600}
          textAlign='center'
        >
          Soluciones ágiles y personalizadas para la salud ocupacional.
        </Typography>
        <Button
          variant='contained'
          color='primary'
          size='large'
          onClick={handleOpenContactForm}
        >
          Escríbenos
        </Button>
        <Box
          position='absolute'
          bottom='1%'
        >
          <ArrowCircleDownIcon
            onClick={handleScroll}
            style={{ cursor: 'pointer' }}
            sx={{ fontSize: '60px', color: 'white' }}
          />
        </Box>
      </Stack>
      <ContactForm
        open={openContactForm}
        handleClose={handleCloseContactForm}
      />
    </Box>
  );
};
