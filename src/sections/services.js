import { Container, Typography, CardContent, Card, useMediaQuery } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

const cardData = [
  {
    id: '01.',
    title: 'Servicio Medico Ocupacional',
    description:
      'Exámenes laborales, Vigilancia Epidemiológica, Programas de Prevención, Audiometría, Espirometrías, Electrocardiograma, Rayos X, Resonancias Magnética. ',
  },
  {
    id: '02.',
    title: 'Medicina Ocupacional Especializada',
    description:
      'Diseñamos programas de capacitación a la medida de tu organización. Analizamos tus necesidades específicas y desarrollamos soluciones personalizadas que impulsan el crecimiento y el desarrollo de tu equipo. ',
  },
  {
    id: '03.',
    title: 'Ergonomía',
    description:
      'Ergonomía Ocupacional, Organizacional, Cognitiva, Estudio Antropométrico, Evaluación y Diseño de Puesto de trabajo, Programa ergonómico, Diseño de herramienta, Estudio de riesgos psicosociales. ',
  },
  {
    id: '04.',
    title: 'Seguridad Laboral e Higiene',
    description:
      'Programas de SSL, Levantamiento de Procesos Peligrosos, Programas de Mediciones Ambientales, Gestión de Comités de Seguridad y Salud Laboral, Planes de Evacuación y Emergencias. ',
  },
  {
    id: '05.',
    title: 'Odontología Empresarial',
    description:
      'Odontología General,  Atención personalizada y de calidad, Jornadas Odontológicas y  Programas flexibles adaptados a tus necesidades, Mejora de la calidad de vida de tus empleados. ',
  },
  {
    id: '06.',
    title: 'Capacitación y Adiestramiento',
    description:
      'Impulsamos una cultura de seguridad en tu empresa a través de programas de capacitación personalizados. Diseñamos soluciones prácticas y efectivas que permiten a tus colaboradores identificar y prevenir riesgos. ',
  },
];

export const Services = () => {
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
  return (
    <Container
      id='services'
      maxWidth='xxl'
      sx={{ backgroundColor: 'secondary.main' }}
    >
      <Container
        maxWidth='lg'
        sx={{ py: 10 }}
      >
        <Grid container>
          <Grid
            xs={12}
            md={12}
          >
            <Typography
              variant={mdUp ? 'h2' : 'h3'}
              textAlign='center'
              color='white'
            >
              Nuestros Servicios
            </Typography>
            <Typography
              textAlign='center'
              variant='subtitle1'
              color='white'
              //width='50%'
            >
              Expertos en salud ocupacional, Soluciones personalizadas para cada organización
            </Typography>
          </Grid>

          <Grid
            xs={12}
            md={12}
            container
            spacing={4}
            marginTop={2}
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
                      color='secondary.main'
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
