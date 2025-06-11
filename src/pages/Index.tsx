
import React from 'react';
import ChatInterface from '../components/ChatInterface';
import Header from '../components/Header';
import LoadingSpinner from '../components/LoadingSpinner';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { language, isDetecting } = useLanguage();

  if (isDetecting) {
    return <LoadingSpinner />;
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      <Header language={language} />
      <div className="flex-1 overflow-hidden bg-gray-50">
        <ChatInterface />
      </div>
    </div>
  );
};

export default Index;
