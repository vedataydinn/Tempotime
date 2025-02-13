import { Clock } from "@/components/Clock";
import { TimeControls } from "@/components/TimeControls";
import { ReminderDialog } from "@/components/ReminderDialog";
import { useTimePerception } from "@/hooks/useTimePerception";
import { motion } from "framer-motion";
import { Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const {
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
    setSelectedDuration,
    setTimeSpeed,
    setShowSeconds,
    setLanguage,
    setThemeColor,
    closeReminder,
    toggleSettings,
    saveSettings
  } = useTimePerception();

  return (
    <motion.div 
      className="min-h-screen flex flex-col items-center justify-center p-4 relative"
      animate={{ backgroundColor }}
      transition={{ duration: 2 }}
    >
      <div className="w-full max-w-lg space-y-8">
        <Clock 
          currentTime={currentTime}
          isActive={isActive}
          showSeconds={showSeconds}
          onSettingsClick={() => toggleSettings(true)}
        />

        <TimeControls
          selectedDuration={selectedDuration}
          timeSpeed={timeSpeed}
          showSeconds={showSeconds}
          open={settingsOpen}
          language={language}
          themeColor={themeColor}
          t={t}
          onOpenChange={toggleSettings}
          onDurationChange={setSelectedDuration}
          onSpeedChange={setTimeSpeed}
          onShowSecondsChange={setShowSeconds}
          onLanguageChange={setLanguage}
          onThemeColorChange={setThemeColor}
          onSaveSettings={saveSettings}
        />

        <ReminderDialog 
          open={reminderOpen} 
          onClose={closeReminder}
          timeSpeed={timeSpeed}
          t={t}
        />
      </div>

      {/* Ayarlar butonu - sol alt köşede */}
      <motion.div 
        className="fixed bottom-4 left-4"
        initial={{ opacity: 0.3 }}
        whileHover={{ opacity: 1 }}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => toggleSettings(true)}
          className="hover:bg-primary/20"
        >
          <Settings2 className="w-6 h-6" />
        </Button>
      </motion.div>
    </motion.div>
  );
}