import { useState, useEffect, useCallback } from "react";
import { useAudioFeedback } from "./useAudioFeedback";
import { useSettings } from "./useSettings";
import { useToast } from "@/hooks/use-toast";

export function useTimePerception() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedDuration, setSelectedDuration] = useState(1800); // 30 dakika
  const [timeSpeed, setTimeSpeed] = useState(1);
  const [activeTimeSpeed, setActiveTimeSpeed] = useState(1);
  const [reminderOpen, setReminderOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [isActive, setIsActive] = useState(false);
  const [showSeconds, setShowSeconds] = useState(true);
  const [isSettingsSaved, setIsSettingsSaved] = useState(false); // Yeni state

  const { language, setLanguage, themeColor, setThemeColor, t } = useSettings();
  const { playSpeedChangeSound } = useAudioFeedback();
  const { toast } = useToast();

  // Zaman hızına göre arka plan rengi hesaplama
  const backgroundColor = themeColor;

  // Manipüle edilmiş zamanı hesaplama
  const calculateManipulatedTime = useCallback(() => {
    if (!isActive) return new Date();

    const now = new Date();
    const elapsedMilliseconds = now.getTime() - startTime.getTime();
    const manipulatedMilliseconds = elapsedMilliseconds * activeTimeSpeed;
    const manipulatedTime = new Date(startTime.getTime() + manipulatedMilliseconds);
    return manipulatedTime;
  }, [startTime, activeTimeSpeed, isActive]);

  // Saat güncellemesi - her saniye normal olarak artar ama hızlandırılmış zamanı gösterir
  useEffect(() => {
    const interval = setInterval(() => {
      const manipulatedTime = calculateManipulatedTime();
      setCurrentTime(manipulatedTime);
    }, 1000); // Her saniye güncelle ama manipüle edilmiş zamanı göster

    return () => clearInterval(interval);
  }, [calculateManipulatedTime]);

  // Süre kontrolü
  useEffect(() => {
    if (!isActive) return;

    const checkDuration = setInterval(() => {
      const manipulatedTime = calculateManipulatedTime();
      const elapsedTime = manipulatedTime.getTime() - startTime.getTime();

      if (elapsedTime >= selectedDuration * 1000) {
        setIsActive(false);
        toast({
          title: t('title'),
          description: "Belirlediğiniz zaman dilimi sona erdi.",
          duration: 5000,
        });
      }
    }, 1000);

    return () => clearInterval(checkDuration);
  }, [isActive, selectedDuration, startTime, calculateManipulatedTime, toast, t]);

  // 15 dakikalık hatırlatıcılar
  useEffect(() => {
    if (!isActive) return;

    const reminderInterval = setInterval(() => {
      setReminderOpen(true);
    }, 15 * 60 * 1000); // 15 dakika

    return () => clearInterval(reminderInterval);
  }, [isActive]);

  // Hız değişimi kontrolü
  const handleSpeedChange = useCallback((newSpeed: number) => {
    setTimeSpeed(newSpeed);
  }, []);

  // Ayarları kaydetme
  const saveSettings = useCallback(() => {
    setStartTime(new Date()); // Yeni başlangıç zamanını ayarla
    setActiveTimeSpeed(timeSpeed);
    setIsActive(true);
    setIsSettingsSaved(true); // Ayarlar kaydedildi
    playSpeedChangeSound(timeSpeed);
    setSettingsOpen(false);

    toast({
      title: t('title'),
      description: `${t('speed')}: ${timeSpeed}x`,
      duration: 3000,
    });
  }, [timeSpeed, playSpeedChangeSound, toast, t]);

  // Normal zamana dönüş fonksiyonu
  const resetToNormalTime = useCallback(() => {
    if (!isSettingsSaved) return; // Ayarlar kaydedilmemişse çalışmaz

    setCurrentTime(new Date());
    setTimeSpeed(1);
    setActiveTimeSpeed(1);
    setStartTime(new Date());
    setIsActive(false);
    setSettingsOpen(false);
    setIsSettingsSaved(false); // Tekrar false'a çek

    toast({
      title: "Zaman Sıfırlandı",
      description: "Zaman normal akışına geri döndü.",
      duration: 3000,
    });
  }, [toast, isSettingsSaved]);

  return {
    currentTime,
    selectedDuration,
    timeSpeed,
    reminderOpen,
    settingsOpen,
    backgroundColor,
    isActive,
    showSeconds,
    language,
    themeColor,
    t,
    isSettingsSaved, // Yeni return değeri
    setSelectedDuration,
    setTimeSpeed: handleSpeedChange,
    setShowSeconds,
    setLanguage,
    setThemeColor,
    closeReminder: () => setReminderOpen(false),
    toggleSettings: (open: boolean) => setSettingsOpen(open),
    saveSettings,
    resetToNormalTime,
  };
}