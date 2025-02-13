// Duration options in seconds
export const DURATION_OPTIONS = [
  900,  // 15 minutes
  1800, // 30 minutes
  3600, // 1 hour
  7200  // 2 hours
];

export const THEME_COLORS = [
  { name: "mor", value: "hsl(250, 95%, 60%)" },
  { name: "mavi", value: "hsl(210, 95%, 60%)" },
  { name: "yeşil", value: "hsl(150, 95%, 60%)" },
  { name: "turuncu", value: "hsl(30, 95%, 60%)" },
  { name: "kırmızı", value: "hsl(350, 95%, 60%)" }
] as const;

export type Language = "tr" | "en";
export type ThemeColor = typeof THEME_COLORS[number]["value"];