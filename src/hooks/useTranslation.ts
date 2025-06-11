
import { useLanguage } from "@/contexts/LanguageContext";

export const useTranslation = () => {
  const { language, setLanguage } = useLanguage();
  
  return {
    language,
    setLanguage,
    isGerman: language === 'de',
    isEnglish: language === 'en',
  };
};
