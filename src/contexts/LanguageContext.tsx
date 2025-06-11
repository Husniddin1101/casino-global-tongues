
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isDetecting: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [isDetecting, setIsDetecting] = useState(true);

  const detectLanguageFromIP = async () => {
    try {
      console.log('Detecting user location for language preference...');
      const response = await fetch('https://ipapi.co/json/');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      console.log('Full IP API response:', data);
      console.log('User location detected:', data.country_name, 'Country code:', data.country_code);
      
      // Check if user is from Germany, Austria, or Netherlands
      const germanSpeakingCountries = ['DE', 'AT', 'NL'];
      const userCountry = data.country_code;
      
      console.log('Checking if country code', userCountry, 'is in', germanSpeakingCountries);
      
      if (userCountry && germanSpeakingCountries.includes(userCountry)) {
        console.log('Setting language to German based on location:', userCountry);
        setLanguage('de');
      } else {
        console.log('Setting language to English (default) for country:', userCountry);
        setLanguage('en');
      }
    } catch (error) {
      console.error('Failed to detect location, defaulting to English:', error);
      setLanguage('en');
    } finally {
      setIsDetecting(false);
    }
  };

  useEffect(() => {
    // Check if language preference was already detected in this session
    const savedLanguage = sessionStorage.getItem('detectedLanguage');
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'de')) {
      console.log('Using previously detected language:', savedLanguage);
      setLanguage(savedLanguage as Language);
      setIsDetecting(false);
    } else {
      detectLanguageFromIP();
    }
  }, []);

  useEffect(() => {
    // Save the detected language to session storage
    if (!isDetecting) {
      sessionStorage.setItem('detectedLanguage', language);
    }
  }, [language, isDetecting]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isDetecting }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
