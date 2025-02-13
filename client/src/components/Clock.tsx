import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface ClockProps {
  currentTime: Date;
}

export function Clock({ currentTime }: ClockProps) {
  const timeString = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });

  return (
    <Card className="p-8 text-center bg-opacity-80">
      <motion.h1 
        className="text-6xl font-bold tracking-tight"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {timeString}
      </motion.h1>
    </Card>
  );
}
