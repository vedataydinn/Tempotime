import { Clock } from "@/components/Clock";
import { TimeControls } from "@/components/TimeControls";
import { ReminderDialog } from "@/components/ReminderDialog";
import { useTimePerception } from "@/hooks/useTimePerception";
import { motion } from "framer-motion";
import { Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Language, ThemeColor } from "@/lib/constants";

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
    isSettingsSaved, // Yeni değişken
    setSelectedDuration,
    setTimeSpeed,
    setShowSeconds,
    setLanguage,
    setThemeColor,
    closeReminder,
    toggleSettings,
    saveSettings,
    resetToNormalTime
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
          onLanguageChange={(langCode: Language) => setLanguage(langCode)}
          onThemeColorChange={(color: ThemeColor) => setThemeColor(color)}
          onSaveSettings={saveSettings}
          onResetToNormalTime={resetToNormalTime}
          isSettingsSaved={isSettingsSaved} // Yeni prop
        />

        <ReminderDialog 
          open={reminderOpen} 
          onClose={closeReminder}
          timeSpeed={timeSpeed}
          t={t}
        />
      </div>

      {/* Ayarlar butonu - sağ alt köşede */}
      <motion.div 
        className="fixed bottom-4 right-4"
        initial={{ opacity: 1 }}
      >
        <Button
          variant="outline" 
          size="icon"
          onClick={() => toggleSettings(true)}
          className="w-14 h-14 rounded-full shadow-2xl 
                     bg-black text-white 
                     hover:bg-white hover:text-black hover:border-black
                     border-2 border-black
                     transition-all duration-300"
        >
          <Settings2 className="w-9 h-9" />
        </Button>
      </motion.div>
    </motion.div>
  );
}