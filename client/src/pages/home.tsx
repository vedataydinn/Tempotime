import { Clock } from "@/components/Clock";
import { TimeControls } from "@/components/TimeControls";
import { ReminderDialog } from "@/components/ReminderDialog";
import { useTimePerception } from "@/hooks/useTimePerception";
import { motion } from "framer-motion";

export default function Home() {
  const {
    currentTime,
    selectedDuration,
    timeSpeed,
    reminderOpen,
    settingsOpen,
    backgroundColor,
    setSelectedDuration,
    setTimeSpeed,
    closeReminder,
    toggleSettings
  } = useTimePerception();

  return (
    <motion.div 
      className="min-h-screen flex flex-col items-center justify-center p-4"
      animate={{ backgroundColor }}
      transition={{ duration: 2 }}
    >
      <div className="w-full max-w-lg space-y-8">
        <Clock 
          currentTime={currentTime}
          onSettingsClick={toggleSettings}
        />

        <TimeControls
          selectedDuration={selectedDuration}
          timeSpeed={timeSpeed}
          open={settingsOpen}
          onOpenChange={toggleSettings}
          onDurationChange={setSelectedDuration}
          onSpeedChange={setTimeSpeed}
        />

        <ReminderDialog 
          open={reminderOpen} 
          onClose={closeReminder}
          timeSpeed={timeSpeed}
        />
      </div>
    </motion.div>
  );
}