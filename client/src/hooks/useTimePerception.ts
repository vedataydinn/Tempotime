import { useState, useEffect, useCallback } from "react";
import { useAudioFeedback } from "./useAudioFeedback";
import { useToast } from "@/hooks/use-toast";

export function useTimePerception() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedDuration, setSelectedDuration] = useState(1800); // 30 dakika
  const [timeSpeed, setTimeSpeed] = useState(1);
  const [activeTimeSpeed, setActiveTimeSpeed] = useState(1);
  const [reminderOpen, setReminderOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [startTime] = useState(new Date());
  const [isActive, setIsActive] = useState(false);
  const [showSeconds, setShowSeconds] = useState(true);

  const { playSpeedChangeSound } = useAudioFeedback();
  const { toast } = useToast();

  // Zaman hızına göre arka plan rengi hesaplama
  const backgroundColor = activeTimeSpeed < 1 
    ? `hsl(220, ${Math.round((1 - activeTimeSpeed) * 100)}%, 95%)`
    : `hsl(350, ${Math.round((activeTimeSpeed - 1) * 100)}%, 95%)`;

  // Manipüle edilmiş zamanı hesaplama
  const calculateManipulatedTime = useCallback(() => {
    const now = new Date();
    const elapsedMilliseconds = now.getTime() - startTime.getTime();
    const manipulatedMilliseconds = elapsedMilliseconds * activeTimeSpeed;
    const manipulatedTime = new Date(startTime.getTime() + manipulatedMilliseconds);
    return manipulatedTime;
  }, [startTime, activeTimeSpeed]);

  // Saat güncellemesi - her saniye normal olarak artar ama hızlandırılmış zamanı gösterir
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      const manipulatedTime = calculateManipulatedTime();
      setCurrentTime(manipulatedTime);
    }, 1000); // Her saniye güncelle ama manipüle edilmiş zamanı göster

    return () => clearInterval(interval);
  }, [isActive, calculateManipulatedTime]);

  // Süre kontrolü
  useEffect(() => {
    if (!isActive) return;

    const checkDuration = setInterval(() => {
      const manipulatedTime = calculateManipulatedTime();
      const elapsedTime = manipulatedTime.getTime() - startTime.getTime();

      if (elapsedTime >= selectedDuration * 1000) {
        setIsActive(false);
        toast({
          title: "Süre Doldu!",
          description: "Belirlediğiniz zaman dilimi sona erdi.",
          duration: 5000,
        });
      }
    }, 1000);

    return () => clearInterval(checkDuration);
  }, [isActive, selectedDuration, startTime, calculateManipulatedTime, toast]);

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
    setActiveTimeSpeed(timeSpeed);
    setIsActive(true);
    playSpeedChangeSound(timeSpeed);
    setSettingsOpen(false);

    toast({
      title: "Ayarlar Kaydedildi",
      description: `Zaman hızı ${timeSpeed}x olarak ayarlandı.`,
      duration: 3000,
    });
  }, [timeSpeed, playSpeedChangeSound, toast]);

  return {
    currentTime,
    selectedDuration,
    timeSpeed,
    reminderOpen,
    settingsOpen,
    backgroundColor,
    isActive,
    showSeconds,
    setSelectedDuration,
    setTimeSpeed: handleSpeedChange,
    setShowSeconds,
    closeReminder: () => setReminderOpen(false),
    toggleSettings: (open: boolean) => setSettingsOpen(open),
    saveSettings
  };
}