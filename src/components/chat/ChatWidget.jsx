'use client';
import { useState } from 'react';
import { Fab, Fade, Paper, Typography, useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

import { ChatWidgetContainer } from '@/components/chat/ChatWidgetContainer';

export const ChatWidget = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {/* Ventana del Chat */}
      <Fade in={isOpen}>
        <Paper
          elevation={8}
          sx={{
            position: 'fixed',
            bottom: { xs: 110, md: 135 },
            right: { xs: '5%', md: '2%' },
            width: { xs: '90%', md: '35%' },
            height: { xs: '70vh', md: '80vh' },
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '16px',
            overflow: 'hidden',
            zIndex: 1300,
          }}
        >
          <ChatWidgetContainer onClose={toggleChat} />
        </Paper>
      </Fade>

      {/* Botón Flotante */}
      <Fab
        variant='extended'
        color='primary'
        aria-label='Agente RAG'
        onClick={toggleChat}
        sx={{
          position: 'fixed',
          bottom: { xs: 40, md: 80 },
          right: 16,
          zIndex: 1301,
        }}
      >
        {isOpen ? (
          <CloseIcon sx={{ mr: 2, color: 'white', fontSize: { xs: 25, md: 35 } }} />
        ) : (
          <AutoAwesomeIcon sx={{ mr: 2, color: 'white', fontSize: { xs: 25, md: 35 } }} />
        )}
        <Typography
          variant={isMobile ? 'body1' : 'subtitle1'}
          color='white'
        >
          ASISTENTE DE CONSULTAS
        </Typography>
      </Fab>
    </>
  );
};
