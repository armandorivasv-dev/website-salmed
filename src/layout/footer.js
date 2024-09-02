import { Box, Container, IconButton, Link, Stack, Typography, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/X';
import { Facebook, Instagram, YouTube } from '@mui/icons-material';

function Copyright() {
  return (
    <Typography
      textAlign='center'
      variant='body2'
      color='text.secondary'
      mt={1}
    >
      {'Copyright © '}
      Salmed {new Date().getFullYear()}
    </Typography>
  );
}

function DevelopedBy() {
  return (
    <Typography
      textAlign='center'
      variant='body2'
      color='text.secondary'
      mt={1}
    >
      {'createb by '}
      <Link
        href='https://armandorivasv-dev.web.app/'
        target='_blank'
      >
        @armandorivasv-dev.web.app&nbsp;
      </Link>
    </Typography>
  );
}

export default function Footer() {
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 4, md: 8 },
        py: { xs: 8, md: 10 },
        textAlign: { xs: 'center', md: 'left' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 4, md: 8 },
          width: '100%',
          justifyContent: 'flex-start',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,

            minWidth: { xs: '100%', md: '20%' },
          }}
        >
          <Box sx={{ width: { xs: '100%', md: '60%' } }}>
            <Box sx={{ ml: '0px' }}>
              <Image
                src='/assets/logos/salmed-logo.png'
                width={206 * 0.6}
                height={92 * 0.6}
                alt='salmed medicina ocupacional'
                priority={true}
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: 'flex', md: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography
            variant='subtitle1'
            fontWeight={600}
          >
            Dirección
          </Typography>
          <Typography
            variant='subtitle1'
            fontWeight={400}
          >
            Av Bolivar con Avenida Aldonza Manrique
          </Typography>
          <Typography
            variant='subtitle1'
            fontWeight={400}
          >
            Centro Comercial AB, Local PB-82
          </Typography>
          <Typography
            variant='subtitle1'
            fontWeight={400}
          >
            Pampatar - Isla De Margarita - Venezuela
          </Typography>
        </Box>
        <Box
          sx={{
            display: { xs: 'flex', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography
            variant='subtitle1'
            fontWeight={600}
          >
            Contactos
          </Typography>
          <Link
            color='text.secondary'
            href='mailto:contacto@salmed.net'
          >
            contacto@salmed.net
          </Link>
          <Typography
            variant='subtitle1'
            fontWeight={400}
          >
            +58 (0412)607.09.25
          </Typography>
        </Box>
        <Box
          sx={{
            display: { xs: 'flex', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography
            variant='subtitle1'
            fontWeight={600}
          >
            Redes Sociales
          </Typography>
          <Stack
            direction='row'
            justifyContent={mdUp ? 'left' : 'center'}
            spacing={1}
            useFlexGap
            sx={{
              color: 'text.secondary',
            }}
          >
            <IconButton
              href='https://www.instagram.com/salmedbienestar/'
              target='_blank'
              aria-label='Instagram'
              sx={{ alignSelf: 'center', color: 'primary.main' }}
            >
              <Instagram />
            </IconButton>
            <IconButton
              href='https://x.com/salmedca?s=11'
              target='_blank'
              aria-label='X'
              sx={{ alignSelf: 'center', color: 'primary.main' }}
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              href='https://www.linkedin.com/company/salmed-servicio-m-dicos-integrales/'
              aria-label='LinkedIn'
              sx={{ alignSelf: 'center', color: 'primary.main' }}
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton
              href='https://web.facebook.com/Salmedbienestar/'
              aria-label='Facebook'
              sx={{ alignSelf: 'center', color: 'primary.main' }}
            >
              <Facebook />
            </IconButton>
            <IconButton
              href='https://www.youtube.com/@salmedwebinars9591'
              aria-label='Youtube'
              sx={{ alignSelf: 'center', color: 'primary.main' }}
            >
              <YouTube />
            </IconButton>
          </Stack>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          pt: { xs: 4, sm: 2 },
          width: '100%',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <div>
          <Copyright />
          <DevelopedBy />
        </div>
      </Box>
    </Container>
  );
}
