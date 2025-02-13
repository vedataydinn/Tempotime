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
    setSelectedDuration,
    setTimeSpeed,
    closeReminder,
    backgroundColor
  } = useTimePerception();

  return (
    <motion.div 
      className="min-h-screen flex flex-col items-center justify-center p-4"
      animate={{ backgroundColor }}
      transition={{ duration: 2 }}
    >
      <div className="w-full max-w-md space-y-8">
        <Clock currentTime={currentTime} />
        
        <TimeControls
          selectedDuration={selectedDuration}
          timeSpeed={timeSpeed}
          onDurationChange={setSelectedDuration}
          onSpeedChange={setTimeSpeed}
        />

        <ReminderDialog 
          open={reminderOpen} 
          onClose={closeReminder}
        />
      </div>
    </motion.div>
  );
}
