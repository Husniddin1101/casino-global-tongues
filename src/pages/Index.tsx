
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="mb-2 text-sm text-muted-foreground">
          Current language: {language === 'de' ? 'Deutsch' : 'English'}
        </div>
        <h1 className="text-4xl font-bold mb-4">{t('welcome')}</h1>
        <p className="text-xl text-muted-foreground">{t('subtitle')}</p>
      </div>
    </div>
  );
};

export default Index;
