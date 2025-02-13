import { useState, useCallback } from 'react';
import { Language, ThemeColor, THEME_COLORS } from '@/lib/constants';
import { tr, en, type Translations } from '@/lib/translations';

export function useSettings() {
  const [language, setLanguage] = useState<Language>('tr');
  const [themeColor, setThemeColor] = useState<ThemeColor>(THEME_COLORS[0].value);

  const t = useCallback((key: keyof Translations['timeControl'] | keyof Translations['reminder']) => {
    const translations = language === 'tr' ? tr : en;
    // Anahtarın hangi kategoride olduğunu kontrol et
    if (key in translations.timeControl) {
      return translations.timeControl[key as keyof Translations['timeControl']];
    } else if (key in translations.reminder) {
      return translations.reminder[key as keyof Translations['reminder']];
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
