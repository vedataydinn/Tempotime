import { useState, useEffect, useCallback } from "react";
import { useAudioFeedback } from "./useAudioFeedback";

export function useTimePerception() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedDuration, setSelectedDuration] = useState(1800); // 30 minutes
  const [timeSpeed, setTimeSpeed] = useState(1);
  const [reminderOpen, setReminderOpen] = useState(false);
  const [startTime] = useState(new Date());
  
  const { playSpeedChangeSound } = useAudioFeedback();

  // Calculate background color based on time speed
  const backgroundColor = timeSpeed < 1 
    ? `hsl(220, ${Math.round((1 - timeSpeed) * 100)}%, 95%)`
    : `hsl(350, ${Math.round((timeSpeed - 1) * 100)}%, 95%)`;

  // Update clock
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000 / timeSpeed);

    return () => clearInterval(interval);
  }, [timeSpeed]);

  // 15-minute reminders
  useEffect(() => {
    const reminderInterval = setInterval(() => {
      setReminderOpen(true);
    }, 15 * 60 * 1000); // 15 minutes

    return () => clearInterval(reminderInterval);
  }, []);

  // Handle speed changes
  const handleSpeedChange = useCallback((newSpeed: number) => {
    setTimeSpeed(newSpeed);
    playSpeedChangeSound(newSpeed);
  }, [playSpeedChangeSound]);

  return {
    currentTime,
    selectedDuration,
    timeSpeed,
    reminderOpen,
    backgroundColor,
    setSelectedDuration,
    setTimeSpeed: handleSpeedChange,
    closeReminder: () => setReminderOpen(false)
  };
}
