import { useState, useCallback } from 'react';
import { Language, ThemeColor, THEME_COLORS } from '@/lib/constants';
import { tr, en, type Translations } from '@/lib/translations';

export function useSettings() {
  const [language, setLanguage] = useState<Language>('tr');
  const [themeColor, setThemeColor] = useState<ThemeColor>(THEME_COLORS[0].value);

  const t = useCallback((key: string): string => {
    const translations = language === 'tr' ? tr : en;
    
    // Anahtarın hangi kategoride olduğunu kontrol et
    if (key in translations.timeControl) {
      const value = translations.timeControl[key as keyof typeof translations.timeControl];
      return typeof value === 'string' ? value : 'Normal';
    } else if (key in translations.reminder) {
      const value = translations.reminder[key as keyof typeof translations.reminder];
      
      // Eğer speedStatus gibi iç içe bir yapı varsa
      if (typeof value === 'object' && 'slow' in value) {
        return (value as { slow: string, normal: string, fast: string }).normal;
      }
      
      return typeof value === 'string' ? value : 'Normal';
    }
    
    return key; // Eğer çeviri bulunamazsa anahtarı döndür
  }, [language]);

  return {
    language,
    setLanguage,
    themeColor,
    setThemeColor,
    t
  };
}
