
import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';
import ChatMessage from './ChatMessage';
import AutocompleteInput from './AutocompleteInput';
import WelcomeMessage from './WelcomeMessage';
import { processWebhookResponse } from '@/utils/webhookUtils';
import { useLanguage } from '@/contexts/LanguageContext';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { language } = useLanguage();

  // n8n webhook URL
  const webhookUrl = 'https://adsgbt.app.n8n.cloud/webhook/e2dc160f-2238-4a55-a5bb-0a1ec18ebdbe/chat';

  // Generate a session ID for this chat session
  const [sessionId] = useState(uuidv4());

  const getUserIP = async (): Promise<string | null> => {
    try {
      const res = await fetch('https://api.ipify.org?format=json');
      const data = await res.json();
      return data.ip; // example: "123.45.67.89"
    } catch (error) {
      console.error('Failed to fetch IP:', error);
      return null;
    }
  };

  const translations = {
    en: {
      welcomeTitle: "Welcome to your smart online assistant",
      welcomeText: "Discover trending platforms, tips, and games with ChaCha AI",
      inputPlaceholder: "Type your message...",
    },
    de: {
      welcomeTitle: "Willkommen bei deinem smarten Online-Assistenten",
      welcomeText: "Entdecke trendige Plattformen, Tipps und Spiele mit ChaCha AI",
      inputPlaceholder: "Schreibe deine Nachricht...",
    },
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages]);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const webhookPayload = {
        sessionId: sessionId,
        action: "sendMessage",
        chatInput: messageText,
        timestamp: new Date(),
        userIP: await getUserIP() || "unknown"
      };

      console.log("Sending webhook payload:", webhookPayload);

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookPayload),
      });

      if (!response.ok) {
        throw new Error(`Webhook request failed with status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Received webhook response:", data);

      // Process the response using the utility function
      const aiResponse = processWebhookResponse(data);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error('Error sending/receiving message:', error);

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, unable to connect to AI service. Please try again.',
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);

      toast({
        title: "Connection Error",
        description: "Unable to connect to AI service. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputSubmit = (value: string) => {
    sendMessage(value);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Chat Messages Area - space for header */}
      <div className="flex-1 overflow-y-auto pt-4" ref={messagesContainerRef}>
        <div className="w-full">
          {messages.length === 0 ? (
            <WelcomeMessage language={language} />
          ) : (
            <div className="w-full">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </div>
          )}

          {isLoading && (
            <div className="w-full">
              <div className="max-w-4xl mx-auto px-4 py-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-white animate-pulse"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 mb-2">ChaCha AI</div>
                    <div className="bg-gray-50 rounded-2xl px-4 py-3 shadow-sm border border-gray-100">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto p-4">
          <AutocompleteInput
            value={inputValue}
            onChange={setInputValue}
            onSubmit={handleInputSubmit}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
