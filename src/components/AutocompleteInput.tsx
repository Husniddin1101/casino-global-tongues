
import React, { useState, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface AutocompleteInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  disabled?: boolean;
}

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  value,
  onChange,
  onSubmit,
  disabled = false
}) => {
  const { language } = useLanguage();

  const translations = {
    en: {
      inputPlaceholder: "Type your message...",
    },
    de: {
      inputPlaceholder: "Schreibe deine Nachricht...",
    },
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !disabled) {
        onSubmit(value);
      }
    }
  };

  const handleSubmit = () => {
    if (value.trim() && !disabled) {
      onSubmit(value);
    }
  };

  return (
    <div className="flex items-end space-x-2">
      <div className="flex-1 min-w-0">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={translations[language].inputPlaceholder}
          disabled={disabled}
          rows={1}
          className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            minHeight: '48px',
            maxHeight: '120px',
          }}
        />
      </div>
      <Button
        onClick={handleSubmit}
        disabled={disabled || !value.trim()}
        size="icon"
        className="h-12 w-12 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default AutocompleteInput;
