import { useState, useEffect, useCallback } from "react";
import { useAudioFeedback } from "./useAudioFeedback";

export function useTimePerception() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedDuration, setSelectedDuration] = useState(1800); // 30 dakika
  const [timeSpeed, setTimeSpeed] = useState(1);
  const [reminderOpen, setReminderOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [startTime] = useState(new Date());

  const { playSpeedChangeSound } = useAudioFeedback();

  // Zaman hızına göre arka plan rengi hesaplama
  const backgroundColor = timeSpeed < 1 
    ? `hsl(220, ${Math.round((1 - timeSpeed) * 100)}%, 95%)`
    : `hsl(350, ${Math.round((timeSpeed - 1) * 100)}%, 95%)`;

  // Saat güncellemesi
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000 / timeSpeed);

    return () => clearInterval(interval);
  }, [timeSpeed]);

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
    playSpeedChangeSound(newSpeed);
  }, [playSpeedChangeSound]);

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
    toggleSettings: (open: boolean) => setSettingsOpen(open)
  };
}