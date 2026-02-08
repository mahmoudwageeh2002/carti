export const FontSizes = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 20,
  xxxl: 24,
  heading1: 32,
  heading2: 28,
  heading3: 24,
};

export const FontWeights = {
  light: '300' as const,
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

export const LineHeights = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
  loose: 2,
};

export type FontSizeKey = keyof typeof FontSizes;
export type FontWeightKey = keyof typeof FontWeights;
export type LineHeightKey = keyof typeof LineHeights;
