import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DURATION_OPTIONS, EXTENDED_DURATION_OPTIONS, THEME_COLORS } from "@/lib/constants";
import { Clock, FastForward, Rewind, Save, Palette, Globe } from "lucide-react";
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
  language: string;
  themeColor: string;
  t: (key: string) => string;
  onOpenChange: (open: boolean) => void;
  onDurationChange: (duration: number) => void;
  onSpeedChange: (speed: number) => void;
  onShowSecondsChange: (show: boolean) => void;
  onLanguageChange: (lang: string) => void;
  onThemeColorChange: (color: string) => void;
  onSaveSettings: () => void;
}

export function TimeControls({
  selectedDuration,
  timeSpeed,
  showSeconds,
  open,
  language,
  themeColor,
  t,
  onOpenChange,
  onDurationChange,
  onSpeedChange,
  onShowSecondsChange,
  onLanguageChange,
  onThemeColorChange,
  onSaveSettings
}: TimeControlsProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{t('title')}</SheetTitle>
          <SheetDescription>
            {t('description')}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2 text-primary">
              <Clock className="w-5 h-5" />
              {t('duration')}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t('durationDesc')}
            </p>
            <div className="flex flex-wrap gap-2">
              {DURATION_OPTIONS.map((duration) => (
                <Button
                  key={duration}
                  variant={selectedDuration === duration ? "default" : "outline"}
                  onClick={() => onDurationChange(duration)}
                  className="transition-all hover:scale-105"
                >
                  {duration / 60} {t('minutes')}
                </Button>
              ))}
            </div>

            {/* Uzun süreler için açılır menü */}
            <Select 
              value={EXTENDED_DURATION_OPTIONS.includes(selectedDuration) ? selectedDuration.toString() : ''} 
              onValueChange={(value) => onDurationChange(parseInt(value))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Daha uzun süreler..." />
              </SelectTrigger>
              <SelectContent>
                {EXTENDED_DURATION_OPTIONS.map((duration) => (
                  <SelectItem key={duration} value={duration.toString()}>
                    {duration / 3600} {t('hours')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2 text-primary">
              {timeSpeed < 1 ? (
                <Rewind className="w-5 h-5" />
              ) : (
                <FastForward className="w-5 h-5" />
              )}
              {t('speed')}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t('speedDesc')}
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
                ? t('slow')
                : timeSpeed > 1 
                  ? t('fast')
                  : t('normal')} ({timeSpeed}x)
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2 text-primary">
              <Globe className="w-5 h-5" />
              {t('language')}
            </h2>
            <Select value={language} onValueChange={onLanguageChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tr">Türkçe</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2 text-primary">
              <Palette className="w-5 h-5" />
              {t('theme')}
            </h2>
            <div className="flex flex-wrap gap-2">
              {THEME_COLORS.map((color) => (
                <Button
                  key={color.value}
                  variant="outline"
                  className="w-8 h-8 rounded-full p-0 relative"
                  style={{ backgroundColor: color.value }}
                  onClick={() => onThemeColorChange(color.value)}
                >
                  {themeColor === color.value && (
                    <div className="absolute inset-0 rounded-full border-2 border-white" />
                  )}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2 text-primary">
              <Clock className="w-5 h-5" />
              {t('appearance')}
            </h2>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {t('showSeconds')}
              </p>
              <Switch
                checked={showSeconds}
                onCheckedChange={onShowSecondsChange}
              />
            </div>
          </div>
        </div>

        <SheetFooter className="mt-8">
          <Button 
            onClick={onSaveSettings} 
            className="w-full bg-primary hover:bg-primary/90 text-white py-6"
          >
            <Save className="w-5 h-5 mr-2" />
            {t('saveSettings')}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}