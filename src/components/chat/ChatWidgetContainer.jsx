import { useState } from 'react';
import { Box } from '@mui/material';
import { useChatMessages } from '@/hooks/useChatMessages';
import { ChatWidgetThread } from './ChatWidgetThread';
import { ChatWidgetComposer } from './ChatWidgetComposer';
import { ChatWidgetHeader } from './ChatWidgetHeader';

export const ChatWidgetContainer = ({ onClose }) => {
  const { messages, addUserQuestion, addChatResponse, sessionId } = useChatMessages();
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (userQuestion) => {
    if (!userQuestion.trim() || isLoading) return;

    try {
      setIsLoading(true);
      addUserQuestion(userQuestion);

      //await createSessionIfNeeded();

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userQuestion,
          sessionId,
        }),
      });

      if (!response.ok) {
        throw new Error(response.status);
      }

      const data = await response.json();
      addChatResponse(data.systemResponse);
    } catch (error) {
      if (error == 'Error: 404') {
        addChatResponse('Lo siento, ocurrió un error. Por favor, inténtalo de nuevo.');
      } else if (error == 'Error: 429') {
        addChatResponse('Demasiadas solicitudes, favor intente su consulta más tarde.');
      } else {
        console.error('❌ Error al enviar el mensaje:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <ChatWidgetHeader onClose={onClose} />
      <ChatWidgetThread
        messages={messages}
        isLoading={isLoading}
      />
      <ChatWidgetComposer
        onSend={handleSend}
        isLoading={isLoading}
      />
    </Box>
  );
};
