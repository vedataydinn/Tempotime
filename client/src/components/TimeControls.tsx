import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { DURATION_OPTIONS } from "@/lib/constants";
import { Clock, FastForward, Rewind } from "lucide-react";

interface TimeControlsProps {
  selectedDuration: number;
  timeSpeed: number;
  onDurationChange: (duration: number) => void;
  onSpeedChange: (speed: number) => void;
}

export function TimeControls({
  selectedDuration,
  timeSpeed,
  onDurationChange,
  onSpeedChange
}: TimeControlsProps) {
  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Duration
        </h2>
        <div className="flex flex-wrap gap-2">
          {DURATION_OPTIONS.map((duration) => (
            <Button
              key={duration}
              variant={selectedDuration === duration ? "default" : "outline"}
              onClick={() => onDurationChange(duration)}
            >
              {duration / 60} min
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          {timeSpeed < 1 ? (
            <Rewind className="w-5 h-5" />
          ) : (
            <FastForward className="w-5 h-5" />
          )}
          Time Speed
        </h2>
        <Slider
          value={[timeSpeed]}
          min={0.5}
          max={2}
          step={0.1}
          onValueChange={([value]) => onSpeedChange(value)}
        />
        <p className="text-sm text-muted-foreground text-center">
          {timeSpeed < 1 ? "Slower" : timeSpeed > 1 ? "Faster" : "Normal"} ({timeSpeed}x)
        </p>
      </div>
    </Card>
  );
}
