'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../hooks/useAuth';
import {
  Container,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Alert,
  CircularProgress,
  Chip,
} from '@mui/material';
import { Download, Logout, Refresh } from '@mui/icons-material';

export default function AdminDashboard() {
  const { isAuthenticated, isLoading, logout } = useAuth();
  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(true);
  const [error, setError] = useState('');
  const [downloading, setDownloading] = useState(false);
  const router = useRouter();

  const fetchLogs = async () => {
    if (!isAuthenticated) return;

    try {
      setMessagesLoading(true);
      const response = await fetch('/api/admin/messages', {
        credentials: 'include',
      });
      const data = await response.json();

      if (response.ok) {
        setMessages(data.messages);
        setError('');
      } else {
        setError(data.error || 'Error cargando messages');
      }
    } catch (error) {
      setError('Error de conexión');
    } finally {
      setMessagesLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Error en logout:', error);
    }
  };

  const handleDownload = async () => {
    try {
      setDownloading(true);
      const response = await fetch('/api/admin/messages/download', {
        credentials: 'include',
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `messages-infochat-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        setError('Error descargando archivo');
      }
    } catch (error) {
      setError('Error descargando archivo');
    } finally {
      setDownloading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        Verificando autenticación...
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // El hook redirigirá automáticamente
  }

  return (
    <Container
      maxWidth='xl'
      sx={{ pt: '10vh', pb: '50vh' }}
    >
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        mb={3}
      >
        <Typography
          variant='h4'
          component='h1'
        >
          Panel de Administración - InfoChat
        </Typography>
        <Box>
          <Button
            variant='outlined'
            startIcon={<Refresh />}
            onClick={fetchLogs}
            sx={{ mr: 1 }}
            disabled={messagesLoading}
          >
            {messagesLoading ? 'Actualizando...' : 'Actualizar'}
          </Button>
          <Button
            variant='contained'
            startIcon={<Download />}
            onClick={handleDownload}
            disabled={downloading || !messages.length}
            sx={{ mr: 1 }}
          >
            {downloading ? 'Descargando...' : 'Descargar CSV'}
          </Button>
          <Button
            variant='outlined'
            color='error'
            startIcon={<Logout />}
            onClick={handleLogout}
          >
            Cerrar Sesión
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert
          severity='error'
          sx={{ mb: 2 }}
        >
          {error}
        </Alert>
      )}

      <Paper elevation={2}>
        <Box p={2}>
          <Typography
            variant='h6'
            gutterBottom
          >
            Registros de Conversaciones ({messages.length})
          </Typography>

          {messagesLoading ? (
            <Box
              display='flex'
              justifyContent='center'
              p={4}
            >
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer sx={{ maxHeight: 600 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Fecha</TableCell>
                    <TableCell>Hora</TableCell>
                    <TableCell>IP Usuario</TableCell>
                    <TableCell>Pregunta</TableCell>
                    <TableCell>Respuesta</TableCell>
                    <TableCell>Tiempo (ms)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {messages.map((message, index) => (
                    <TableRow
                      key={index}
                      hover
                    >
                      <TableCell>{message.date}</TableCell>
                      <TableCell>{message.hour}</TableCell>
                      <TableCell>
                        <Chip
                          label={message.user_ip}
                          size='small'
                        />
                      </TableCell>
                      <TableCell sx={{ maxWidth: 300 }}>
                        <Typography
                          variant='body2'
                          noWrap
                          title={message.user_question}
                        >
                          {message.user_question}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ maxWidth: 400 }}>
                        <Typography
                          variant='body2'
                          noWrap
                          title={message.system_response}
                        >
                          {message.system_response}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={`${message.system_response_time}ms`}
                          size='small'
                          color={message.system_response_time > 2000 ? 'warning' : 'success'}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                  {messages.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        align='center'
                      >
                        <Typography color='textSecondary'>No hay registros disponibles</Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Paper>
    </Container>
  );
}
