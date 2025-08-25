'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Paper, TextField, Button, Typography, Alert, Box, CircularProgress } from '@mui/material';
import { AdminPanelSettings } from '@mui/icons-material';

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Verificar si ya está autenticado
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/admin/auth/verify');
        if (response.ok) {
          router.push('/admin/dashboard');
        }
      } catch (error) {
        // Usuario no autenticado, continuar con login
      }
    };
    checkAuth();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/admin/dashboard');
      } else {
        setError(data.error || 'Error de autenticación');
      }
    } catch (error) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth='sm'
      sx={{ pt: '20vh', pb: '20vh' }}
    >
      <Paper
        elevation={3}
        sx={{ p: 4 }}
      >
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          mb={3}
        >
          <AdminPanelSettings
            color='primary'
            sx={{ fontSize: 60, mb: 2 }}
          />
          <Typography
            variant='h4'
            component='h1'
            gutterBottom
          >
            Administración InfoChat
          </Typography>
          <Typography
            variant='subtitle1'
            color='textSecondary'
          >
            Ingresa tus credenciales para acceder
          </Typography>
        </Box>

        {error && (
          <Alert
            severity='error'
            sx={{ mb: 2 }}
          >
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label='Usuario'
            margin='normal'
            value={credentials.username}
            onChange={(e) => setCredentials((prev) => ({ ...prev, username: e.target.value }))}
            disabled={loading}
            required
          />
          <TextField
            fullWidth
            label='Contraseña'
            type='password'
            margin='normal'
            value={credentials.password}
            onChange={(e) => setCredentials((prev) => ({ ...prev, password: e.target.value }))}
            disabled={loading}
            required
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} />}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
