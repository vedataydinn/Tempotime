import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DURATION_OPTIONS, EXTENDED_DURATION_OPTIONS, THEME_COLORS, Language, ThemeColor } from "@/lib/constants";
import { Clock, FastForward, Rewind, Save, Palette, Globe, RefreshCcw } from "lucide-react";
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
  language: Language;
  themeColor: ThemeColor;
  t: (key: string) => string;
  onOpenChange: (open: boolean) => void;
  onDurationChange: (duration: number) => void;
  onSpeedChange: (speed: number) => void;
  onShowSecondsChange: (show: boolean) => void;
  onLanguageChange: (lang: Language) => void;
  onThemeColorChange: (color: ThemeColor) => void;
  onSaveSettings: () => void;
  onResetToNormalTime: () => void;
  isSettingsSaved: boolean;
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
  onSaveSettings,
  onResetToNormalTime,
  isSettingsSaved
}: TimeControlsProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
     <SheetContent className="bg-green-100 dark:bg-green-950 border-l border-green-200 dark:border-green-800">
     <SheetHeader className="pb-4 border-b border-green-200 dark:border-green-800">
          <SheetTitle>{t('title')}</SheetTitle>
          <SheetDescription>
            {t('description')}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6 max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
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
                  className={`
                    transition-all 
                    hover:scale-105 
                    hover:shadow-lg 
                    ${selectedDuration === duration 
                      ? 'bg-black text-white hover:bg-black/90' 
                      : 'border-primary/50 text-primary hover:bg-primary/10'}
                  `}
                >
                  {duration / 60} {t('minutes' as const)}
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
                  <SelectItem 
                    key={duration} 
                    value={duration.toString()}
                    className={`
                      cursor-pointer 
                      transition-all 
                      hover:scale-105 
                      hover:shadow-lg 
                      ${selectedDuration === duration 
                        ? 'bg-black text-white hover:bg-black/90' 
                        : 'hover:bg-primary/10'}
                    `}
                  >
                    {duration / 3600} {t('hours' as const)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Saniye gösterimi ayarı */}
            <div className="flex items-center space-x-2">
              <Switch
                id="show-seconds"
                checked={showSeconds}
                onCheckedChange={onShowSecondsChange}
              />
              <Label htmlFor="show-seconds">{t('showSeconds')}</Label>
            </div>
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
              {t('appearance')}
            </h2>
            <div className="flex flex-wrap gap-2">
              {THEME_COLORS.map((color) => (
                <Button
                  key={color.value}
                  variant={themeColor === color.value ? "default" : "outline"}
                  onClick={() => onThemeColorChange(color.value)}
                  className="transition-all hover:scale-105"
                  style={{ backgroundColor: color.value }}
                >
                  {color.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Normal zamana dönüş butonu - tema ayarları ve kaydet butonu arasına eklendi */}
          <Button 
            variant="secondary" 
            className="w-full mt-4"
            onClick={onResetToNormalTime}
            disabled={!isSettingsSaved} // Ayarlar kaydedilmemişse devre dışı
          >
            <RefreshCcw className="mr-2 w-4 h-4" />
            Normal Zamana Dön
          </Button>

          {/* Kaydet butonu her zaman altta sabit kalacak */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
            <Button 
              onClick={onSaveSettings} 
              className="w-full bg-primary hover:bg-primary/90 text-white py-6"
            >
              <Save className="w-5 h-5 mr-2" />
              {t('saveSettings')}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
