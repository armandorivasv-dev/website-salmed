import React from 'react';
import { Box, Stack, Typography, Button, Container, useMediaQuery } from '@mui/material';

export const Epp = () => {
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
  return (
    <Box
      id='epp'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundImage: 'url(assets/images/salmed-epp.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '50vh',
        py: 10,
        '::before': {
          content: '""',
          position: 'absolute',
          width: '100%',
          height: '50%',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 0,
        },
      }}
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
