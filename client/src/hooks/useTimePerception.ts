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

  const { playSpeedChangeSound } = useAudioFeedback();
  const { toast } = useToast();

  // Zaman hızına göre arka plan rengi hesaplama
  const backgroundColor = activeTimeSpeed < 1 
    ? `hsl(220, ${Math.round((1 - activeTimeSpeed) * 100)}%, 95%)`
    : `hsl(350, ${Math.round((activeTimeSpeed - 1) * 100)}%, 95%)`;

  // Saat güncellemesi
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000 / activeTimeSpeed);

    return () => clearInterval(interval);
  }, [activeTimeSpeed]);

  // 15 dakikalık hatırlatıcılar
  useEffect(() => {
    const reminderInterval = setInterval(() => {
      setReminderOpen(true);
    }, 15 * 60 * 1000); // 15 dakika

    return () => clearInterval(reminderInterval);
  }, []);

  // Hız değişimi kontrolü
  const handleSpeedChange = useCallback((newSpeed: number) => {
    setTimeSpeed(newSpeed);
  }, []);

  // Ayarları kaydetme
  const saveSettings = useCallback(() => {
    setActiveTimeSpeed(timeSpeed);
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
    setSelectedDuration,
    setTimeSpeed: handleSpeedChange,
    closeReminder: () => setReminderOpen(false),
    toggleSettings: (open: boolean) => setSettingsOpen(open),
    saveSettings
  };
}