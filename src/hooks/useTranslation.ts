
import { useLanguage } from "@/contexts/LanguageContext";

export const useTranslation = () => {
  const { t, language, setLanguage } = useLanguage();
  
  return {
    t,
    language,
    setLanguage,
    isGerman: language === 'de',
    isEnglish: language === 'en',
  };
};
