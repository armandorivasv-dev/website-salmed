import Fab from '@mui/material/Fab';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Typography, useMediaQuery } from '@mui/material';
import Link from 'next/link';

export const WhatsappWidget = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <Link
      href='https://wa.me/584126070925?text=Hola,%20me%20gustaría%20agendar%20una%20cita%20con%20Salmed.'
      passHref
      target='_blank'
      aria-label='Botón Acceso a WhatsApp'
    >
      <Fab
        variant='extended'
        color='success'
        aria-label='Botón Acceso a WhatsApp'
        sx={{
          position: 'fixed',
          //padding: 4,

          bottom: { xs: 5, md: 16 },
          right: 16,
          '&:hover': {
            backgroundColor: '#128C7E',
          },
        }}
      >
        <WhatsAppIcon
          sx={{ mr: 1, color: 'white', fontSize: { xs: 35, md: 40 } }}
          aria-label='Ícono de WhatsApp'
        />
        <Typography
          variant={isMobile ? 'body1' : 'subtitle1'}
          color='white'
          sx={{ textTransform: 'none' }}
        >
          WhatsApp
        </Typography>
      </Fab>
    </Link>
  );
};
