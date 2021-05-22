const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";

export const currentTheme = "light";

export default {
  light: {
    text: "#4b5563",
    background: "#fff",
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#fff",
    background: "#000",
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
  },
  colors: {
    // Using Tailwind reference colors
    buttons: "#3B82F6",
    borders: "#E5E7EB",
    red: {
      400: "#F87171",
      500: "#EF4444",
      600: "#DC2626",
    },
    gray: {
      200: "#E5E7EB",
      300: "#D1D5DB",
      400: "#9CA3AF",
      500: "#6B7280",
      600: "#4B5563",
      700: "#374151",
    },
    blue: {
      300: "#60A5FA",
      400: "#3B82F6",
      500: "#2563EB",
      600: "#2563EB",
    },
    pink: {
      300: "#F9A8D4",
      400: "#F472B6",
      500: "#EC4899",
      600: "#DB2777",
    },
    green: {
      300: "#6EE7B7",
      400: "#34D399",
      500: "#10B981",
      600: "#059669",
    },
  },
};
