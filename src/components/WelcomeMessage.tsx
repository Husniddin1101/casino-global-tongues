
import React from 'react';
import { Sparkles, Lightbulb } from 'lucide-react';

interface WelcomeMessageProps {
  language: 'en' | 'de';
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ language }) => {
  const translations = {
    en: {
      title: "Welcome to your smart online assistant",
      text: "Discover trending platforms, tips, and games with ChaCha AI\nLooking for something fun or useful online? I'm here to help.",
    },
    de: {
      title: "Willkommen bei deinem smarten Online-Assistenten", 
      text: "Entdecke trendige Plattformen, Tipps und Spiele mit ChaCha AI\nSuchst du etwas Lustiges oder Nützliches online? Ich helfe dir gern.",
    },
  };

  const t = translations[language];

  return (
    <div className="flex items-center justify-center min-h-full">
      <div className="text-center space-y-8 py-8 animate-fade-in">
        {/* Welcome Header */}
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              {t.title}
            </h2>
            <p className="text-gray-600 text-lg">
              {t.text.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index < t.text.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </p>
            <div className="mt-4 text-yellow-600">
              <Lightbulb className="w-8 h-8 mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;
