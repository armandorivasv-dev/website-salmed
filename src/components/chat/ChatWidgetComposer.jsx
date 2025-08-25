import { useState } from 'react';
import { Box, Button, CircularProgress, TextField, Typography, useMediaQuery, Stack } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

export const ChatWidgetComposer = ({ onSend, isLoading }) => {
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSend = async () => {
    if (!message.trim()) return;
    try {
      await onSend?.(message);
      setMessage('');
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <Box sx={{ backgroundColor: 'grey.100', borderTop: '1px solid', borderColor: 'grey.300' }}>
      <Box sx={{ display: 'flex', gap: 1, px: 2, py: 1 }}>
        <TextField
          fullWidth
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder='Escribe tu consulta...'
          multiline
          minRows={1}
          maxRows={4}
          size={isMobile ? 'small' : 'medium'}
          disabled={isLoading}
          sx={{
            backgroundColor: 'white',
          }}
        />

        <Button
          variant='contained'
          onClick={handleSend}
          disabled={!message.trim() || isLoading}
          size={isMobile ? 'medium' : 'large'}
          //sx={{ height: '100%' }}
        >
          {isLoading ? (
            <CircularProgress
              size={24}
              color='inherit'
            />
          ) : (
            'Enviar'
          )}
        </Button>
      </Box>
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='center'
        spacing={1}
        sx={{ paddingBottom: { xs: 1, md: 1 } }}
      >
        <Image
          src='/assets/logos/armandorivasv-dev-isotipo-xxs.png'
          alt='armandorivasv-dev-isotipo'
          width={20}
          height={20}
        />
        <Typography
          textAlign='center'
          variant='caption'
          color='text.secondary'
        >
          {'Powered by '}
          <Link
            href='https://www.armandorivasv.dev/'
            target='_blank'
            style={{ textDecoration: 'none', color: 'primary.main' }}
          >
            @armandorivasv.dev&nbsp;
          </Link>
        </Typography>
      </Stack>
    </Box>
  );
};
