import { useState } from 'react';
import { Box, Stack, Typography, Button, useMediaQuery } from '@mui/material';
import { ContactForm } from '../components/contact-form';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';

export const Hero = () => {
  const [openContactForm, setOpenContactForm] = useState(false);
  const handleOpenContactForm = () => setOpenContactForm(true);
  const handleCloseContactForm = () => setOpenContactForm(false);
  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url(assets/images/salmed-hero.png)',

        minHeight: '100vh',
        backgroundSize: 'cover',
        '::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 0,
        },
      }}
    >
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
      </Stack>
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
      <ContactForm
        open={openContactForm}
        handleClose={handleCloseContactForm}
      />
    </Box>
  );
};
