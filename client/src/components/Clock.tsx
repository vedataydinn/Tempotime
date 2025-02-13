import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ClockProps {
  currentTime: Date;
  isActive: boolean;
  showSeconds: boolean;
  onSettingsClick: () => void;
}

export function Clock({ currentTime, showSeconds, onSettingsClick }: ClockProps) {
  const timeString = currentTime.toLocaleTimeString("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
    second: showSeconds ? "2-digit" : undefined,
    hour12: false
  });

  return (
    <motion.div
      className="relative"
      whileHover="hover"
    >
      <Card className="p-8 text-center bg-opacity-90 backdrop-blur-sm">
        <motion.h1 
          className="text-7xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {timeString}
        </motion.h1>
      </Card>
      <motion.div 
        className="absolute bottom-2 left-2"
        initial={{ opacity: 0 }}
        variants={{
          hover: { opacity: 1 }
        }}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={onSettingsClick}
          className="hover:bg-primary/20"
        >
          <Settings2 className="w-5 h-5" />
        </Button>
      </motion.div>
    </motion.div>
  );
}