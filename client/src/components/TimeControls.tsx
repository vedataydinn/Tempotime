import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { DURATION_OPTIONS } from "@/lib/constants";
import { Clock, FastForward, Rewind, Save } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";

interface TimeControlsProps {
  selectedDuration: number;
  timeSpeed: number;
  showSeconds: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDurationChange: (duration: number) => void;
  onSpeedChange: (speed: number) => void;
  onShowSecondsChange: (show: boolean) => void;
  onSaveSettings: () => void;
}

export function TimeControls({
  selectedDuration,
  timeSpeed,
  showSeconds,
  open,
  onOpenChange,
  onDurationChange,
  onSpeedChange,
  onShowSecondsChange,
  onSaveSettings
}: TimeControlsProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Zaman Kontrolü</SheetTitle>
          <SheetDescription>
            Zamanı hızlandırabilir veya yavaşlatabilirsiniz. Seçtiğiniz süre gizli kalacak.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2 text-primary">
              <Clock className="w-5 h-5" />
              Süre Seçimi
            </h2>
            <p className="text-sm text-muted-foreground">
              Deneyimlemek istediğiniz zaman dilimini seçin
            </p>
            <div className="flex flex-wrap gap-2">
              {DURATION_OPTIONS.map((duration) => (
                <Button
                  key={duration}
                  variant={selectedDuration === duration ? "default" : "outline"}
                  onClick={() => onDurationChange(duration)}
                  className="transition-all hover:scale-105"
                >
                  {duration / 60} dakika
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2 text-primary">
              {timeSpeed < 1 ? (
                <Rewind className="w-5 h-5" />
              ) : (
                <FastForward className="w-5 h-5" />
              )}
              Zaman Hızı
            </h2>
            <p className="text-sm text-muted-foreground">
              Zamanın akış hızını ayarlayın
            </p>
            <Slider
              value={[timeSpeed]}
              min={0.5}
              max={2}
              step={0.1}
              onValueChange={([value]) => onSpeedChange(value)}
              className="py-4"
            />
            <p className="text-sm text-center font-medium">
              {timeSpeed < 1 
                ? "Yavaş" 
                : timeSpeed > 1 
                  ? "Hızlı" 
                  : "Normal"} ({timeSpeed}x)
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2 text-primary">
              <Clock className="w-5 h-5" />
              Görünüm
            </h2>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Saniye gösterimi
              </p>
              <Switch
                checked={showSeconds}
                onCheckedChange={onShowSecondsChange}
              />
            </div>
          </div>
        </div>

        <SheetFooter className="mt-6">
          <Button onClick={onSaveSettings} className="w-full">
            <Save className="w-4 h-4 mr-2" />
            Ayarları Kaydet
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}