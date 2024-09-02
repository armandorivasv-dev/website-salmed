import { useState } from 'react';
import { Container, Typography, Button, Stack, useMediaQuery } from '@mui/material';
import { ContactForm } from '../components/contact-form';

export const Quotes = () => {
  const [openContactForm, setOpenContactForm] = useState(false);
  const handleOpenContactForm = () => setOpenContactForm(true);
  const handleCloseContactForm = () => setOpenContactForm(false);
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
  return (
    <Container
      id='quotes'
      maxWidth='xxl'
      sx={{ backgroundColor: 'primary.main' }}
    >
      <Container
        maxWidth='lg'
        sx={{ py: 10 }}
      >
        <Stack
          direction='column'
          justifyContent='flex-end'
          alignItems='center'
          spacing={2}
          zIndex={1}
        >
          <Typography
            variant={mdUp ? 'h3' : 'h4'}
            textAlign='center'
            color='white'
          >
            ¿Quieres conocer cómo podemos mejorar la salud y seguridad en tu empresa?
          </Typography>
          <Typography
            textAlign='center'
            variant='subtitle1'
            color='white'
          >
            Contáctanos y descubre cómo nuestros servicios pueden beneficiar a tu organización.
          </Typography>
          <Button
            onClick={handleOpenContactForm}
            variant='contained'
            color='primary'
            size='large'
          >
            Escríbenos
          </Button>
        </Stack>
      </Container>
      <ContactForm
        open={openContactForm}
        handleClose={handleCloseContactForm}
      />
    </Container>
  );
};
