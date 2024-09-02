import { Container, Typography, CardContent, Card, useMediaQuery } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

const cardData = [
  {
    id: '01.',
    title: 'Innovación',
    description: 'Actualización y formación permanente y continua. ',
  },
  {
    id: '02.',
    title: 'Profesionalismo',
    description: 'Contratación selectiva de profesionales altamente calificados. ',
  },
  {
    id: '03.',
    title: 'Certificaciones',
    description: 'Certificación y afiliación en Organismos encargados. ',
  },
  {
    id: '04.',
    title: 'Certificaciones',
    description: 'Servicios personalizados y acordes a las necesidades de los clientes. ',
  },
];

export const Features = () => {
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
  return (
    <Container
      id='features'
      maxWidth='xxl'
      sx={{ backgroundColor: 'primary.main' }}
    >
      <Container
        maxWidth='lg'
        sx={{ py: 10 }}
      >
        <Grid container>
          <Grid
            xs={12}
            md={6}
          >
            <Typography
              variant={mdUp ? 'h2' : 'h3'}
              textAlign={mdUp ? 'left' : 'center'}
              color='white'
            >
              ¿Porqué <br /> Elegirnos?
            </Typography>
            <Typography
              textAlign={mdUp ? 'left' : 'center'}
              variant='subtitle1'
              color='white'
              width={mdUp ? '50%' : '100%'}
            >
              Ofrecemos soluciones integrales en medicina ocupacional, higiene industrial, ergonomía y seguridad
              laboral. Ayudamos a tu empresa a minimizar riesgos ocupacionales, mejorar la productividad y fomentar el
              bienestar de tus colaboradores.
            </Typography>
          </Grid>

          <Grid
            xs={12}
            md={6}
            container
            spacing={4}
            marginTop={mdUp ? 0 : 2}
          >
            {cardData.map((item, index) => (
              <Grid
                key={index}
                xs={12}
                md={6}
              >
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                    <Typography
                      variant='h5'
                      fontWeight={600}
                      color='primary.main'
                    >
                      {item.id}
                    </Typography>
                    <Typography variant='h5'>{item.title}</Typography>

                    <Typography
                      variant='body2'
                      marginTop={2}
                    >
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
};
