
import React from 'react';
import { User, Bot } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div className={`w-full ${message.isUser ? 'bg-transparent' : 'bg-gray-50'} transition-colors duration-200`}>
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-start space-x-4">
          {/* Avatar */}
          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${
            message.isUser 
              ? 'bg-gradient-to-br from-purple-600 to-blue-600' 
              : 'bg-green-600'
          }`}>
            {message.isUser ? (
              <User className="h-4 w-4 text-white" />
            ) : (
              <Bot className="h-4 w-4 text-white" />
            )}
          </div>

          {/* Message Content */}
          <div className="flex-1 min-w-0 max-w-full">
            <div className="text-sm font-semibold text-gray-900 mb-3">
              {message.isUser ? 'You' : 'ChaCha AI'}
            </div>
            
            {message.isUser ? (
              // User message styling
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-2xl px-4 py-3 shadow-sm max-w-2xl break-words">
                <div className="text-sm leading-relaxed whitespace-pre-wrap">
                  {message.text}
                </div>
              </div>
            ) : (
              // AI message styling
              <div className="bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100 max-w-full break-words">
                <div className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap font-normal">
                  {message.text}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
