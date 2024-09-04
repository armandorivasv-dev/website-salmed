import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  IconButton,
  Stack,
  Drawer,
  MenuItem,
  Typography,
  Divider,
  Container,
  Button,
  Toolbar,
  AppBar,
  Box,
} from '@mui/material';
import Image from 'next/image';
import { ContactForm } from '@/components/contact-form';
import MenuIcon from '@mui/icons-material/Menu';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/X';
import { Facebook, Instagram, YouTube } from '@mui/icons-material';

const menuItems = [
  {
    id: 0,
    title: 'Inicio',
    value: 'home',
  },
  {
    id: 1,
    title: 'Nosotros',
    value: 'about-us',
  },
  {
    id: 2,
    title: 'Servicios',
    value: 'services',
  },
  {
    id: 3,
    title: 'Productos',
    value: 'epp',
  },
  // {
  //   id: 4,
  //   title: 'Testimonios',
  //   value: 'testimonials',
  // },
];

function TopNav({ mode }) {
  const [open, setOpen] = useState(false);

  const [openContactForm, setOpenContactForm] = useState(false);

  const handleOpenContactForm = () => setOpenContactForm(true);
  const handleCloseContactForm = () => setOpenContactForm(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
      setOpen(false);
    }
  };

  return (
    <>
      <AppBar
        id='home'
        position='fixed'
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          mt: 2,
        }}
      >
        <Container maxWidth='lg'>
          <Toolbar
            variant='regular'
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              borderRadius: '50px',
              bgcolor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255)' : 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(24px)',
              maxHeight: 40,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow:
                theme.palette.mode === 'light'
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
            })}
          >
            <Box
              id='home'
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 0,
              }}
            >
              <Image
                src='/assets/logos/salmed-logo.png'
                width={206 * 0.6}
                height={92 * 0.6}
                alt='salmed medicina ocupacional'
                priority={true}
              />
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                {menuItems.map((item, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => scrollToSection(item.value)}
                    sx={{ py: '6px', px: '12px' }}
                  >
                    <Typography
                      variant='subtitle1'
                      color='text.primary'
                    >
                      {item.title}
                    </Typography>
                  </MenuItem>
                ))}
                <MenuItem
                  onClick={handleOpenContactForm}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography
                    variant='subtitle1'
                    color='text.primary'
                  >
                    Contacto
                  </Typography>
                </MenuItem>
              </Box>
            </Box>
            <Box sx={{ display: { xs: '', md: 'none' } }}>
              <Button
                variant='text'
                color='primary'
                aria-label='menu'
                onClick={toggleDrawer(true)}
                sx={{ minWidth: '30px', p: '4px' }}
              >
                <MenuIcon />
              </Button>
              <Drawer
                anchor='right'
                open={open}
                onClose={toggleDrawer(false)}
              >
                <Box
                  sx={{
                    minWidth: '60dvw',
                    p: 2,
                    backgroundColor: 'background.paper',
                    flexGrow: 1,
                  }}
                >
                  <Image
                    src='/assets/logos/salmed-logo.png'
                    width={206 * 0.6}
                    height={92 * 0.6}
                    alt='salmed medicina ocupacional'
                    priority={true}
                  />
                  {menuItems.map((item, index) => (
                    <MenuItem
                      key={index}
                      onClick={() => scrollToSection(item.value)}
                      sx={{ py: '6px', px: '12px' }}
                    >
                      <Typography
                        variant='subtitle1'
                        color='text.primary'
                      >
                        {item.title}
                      </Typography>
                    </MenuItem>
                  ))}
                  <MenuItem
                    onClick={handleOpenContactForm}
                    sx={{ py: '6px', px: '12px' }}
                  >
                    <Typography
                      variant='subtitle1'
                      color='text.primary'
                    >
                      Contacto
                    </Typography>
                  </MenuItem>
                  <Divider />
                  <Stack
                    direction='row'
                    justifyContent='center'
                    spacing={1}
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
                      target='_blank'
                      aria-label='LinkedIn'
                      sx={{ alignSelf: 'center', color: 'primary.main' }}
                    >
                      <LinkedInIcon />
                    </IconButton>
                    <IconButton
                      href='https://web.facebook.com/Salmedbienestar/'
                      target='_blank'
                      aria-label='Facebook'
                      sx={{ alignSelf: 'center', color: 'primary.main' }}
                    >
                      <Facebook />
                    </IconButton>
                    <IconButton
                      href='https://www.youtube.com/@salmedwebinars9591'
                      target='_blank'
                      aria-label='Youtube'
                      sx={{ alignSelf: 'center', color: 'primary.main' }}
                    >
                      <YouTube />
                    </IconButton>
                  </Stack>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <ContactForm
        open={openContactForm}
        handleClose={handleCloseContactForm}
      />
    </>
  );
}

TopNav.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  //toggleColorMode: PropTypes.func.isRequired,
};

export default TopNav;
