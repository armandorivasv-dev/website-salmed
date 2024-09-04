import React from 'react';
import { Box, Stack, Typography, Button, Container, useMediaQuery } from '@mui/material';
import { getImageProps } from 'next/image';
import { Padding } from '@mui/icons-material';

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

export const Epp = () => {
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const {
    props: { srcSet },
  } = getImageProps({
    alt: '',
    width: mdUp ? 1920 : 500,
    height: 572,
    src: mdUp ? '/assets/images/salmed-epp.png' : '/assets/images/salmed-epp-mobile.png',
  });
  const backgroundImage = getBackgroundImage(srcSet);
  const style = {
    height: '50vh',
    width: '100vw',
    backgroundSize: 'cover',
    maxHeight: '70vh',
    paddingTop: '100px',
    paddingBottom: '400px',

    backgroundImage,
  };
  return (
    <Box
      id='epp'
      style={style}
    >
      <Container>
        <Stack
          direction='column'
          justifyContent='center'
          alignItems={mdUp ? 'flex-start' : 'center'}
          spacing={2}
        >
          <Typography
            variant={mdUp ? 'h2' : 'h3'}
            color='white'
            textAlign={mdUp ? 'left' : 'center'}
            zIndex={1}
          >
            Equipos de <br />
            Protección <br />
            Personal
          </Typography>

          <Typography
            variant='subtitle1'
            color='white'
            width={mdUp ? '50%' : '100%'}
            textAlign={mdUp ? 'left' : 'center'}
            zIndex={1}
          >
            Protegemos a tus colaboradores, potenciamos tu negocio.
          </Typography>
          <Button
            variant='contained'
            color='primary'
            size='large'
          >
            Descargar Catálogo (PDF)
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};
