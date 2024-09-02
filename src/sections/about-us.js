import { Container, Typography, useMediaQuery } from '@mui/material';

export const AboutUs = () => {
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
  return (
    <Container maxWidth='xxl'>
      <Container
        id='about-us'
        maxWidth='md'
        sx={{ py: 10 }}
      >
        <Typography
          variant={mdUp ? 'h2' : 'h3'}
          textAlign='center'
        >
          Nosotros
        </Typography>
        <Typography
          textAlign='center'
          variant='subtitle1'
        >
          Desde el 2005, Salmed ha sido el aliado estratégico de empresas en todo el país. Nuestro equipo
          multidisciplinario, compuesto por ingenieros y médicos certificados en materia ocupacional, te acompaña en el
          camino hacia la excelencia. Juntos, te apoyamos a transformar tu organización en una empresa de clase mundial,
          saludable y altamente productiva.
        </Typography>
      </Container>
    </Container>
  );
};
