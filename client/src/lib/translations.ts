// Türkçe metinler
export const tr = {
  timeControl: {
    title: "Zaman Kontrolü",
    description: "Zamanı hızlandırabilir veya yavaşlatabilirsiniz. Seçtiğiniz süre gizli kalacak.",
    duration: "Süre Seçimi",
    durationDesc: "Deneyimlemek istediğiniz zaman dilimini seçin",
    minutes: "dakika",
    hours: "saat",
    speed: "Zaman Hızı",
    speedDesc: "Zamanın akış hızını ayarlayın",
    slow: "Yavaş",
    normal: "Normal",
    fast: "Hızlı",
    appearance: "Görünüm",
    showSeconds: "Saniye gösterimi",
    saveSettings: "Ayarları Kaydet ve Başlat",
    language: "Dil",
    theme: "Tema",
  },
  reminder: {
    title: "Zaman Kontrolü",
    howExperiencing: "Şu an zamanı nasıl deneyimliyorsunuz?",
    speedStatus: {
      slow: "Zaman yavaşlatıldı, her an daha uzun sürebilir.",
      normal: "Zaman normal hızında akıyor.",
      fast: "Zaman hızlandırıldı, anlar daha hızlı geçebilir."
    },
    feelTime: "Bir an durun ve zamanın nasıl aktığını hissedin...",
    continue: "Devam Et"
  }
};

// İngilizce metinler
export const en = {
  timeControl: {
    title: "Time Control",
    description: "You can speed up or slow down time. Your selected duration will remain hidden.",
    duration: "Duration Selection",
    durationDesc: "Select the time period you want to experience",
    minutes: "minutes",
    hours: "hours",
    speed: "Time Speed",
    speedDesc: "Adjust the flow speed of time",
    slow: "Slow",
    normal: "Normal",
    fast: "Fast",
    appearance: "Appearance",
    showSeconds: "Show seconds",
    saveSettings: "Save Settings and Start",
    language: "Language",
    theme: "Theme",
  },
  reminder: {
    title: "Time Check",
    howExperiencing: "How are you experiencing time right now?",
    speedStatus: {
      slow: "Time is slowed down, each moment might feel longer.",
      normal: "Time is flowing at normal speed.",
      fast: "Time is accelerated, moments might pass faster."
    },
    feelTime: "Take a moment to feel how time flows...",
    continue: "Continue"
  }
};

export type Translations = typeof en;