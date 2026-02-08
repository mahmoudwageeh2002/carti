import { Colors, ColorScheme, ThemeColors } from './colors';
import { Spacing, SpacingKey } from './spacing';
import { Radius, RadiusKey } from './radius';
import {
  FontSizes,
  FontWeights,
  LineHeights,
  FontSizeKey,
  FontWeightKey,
  LineHeightKey,
} from './typography';

export interface Theme {
  colors: ThemeColors;
  spacing: typeof Spacing;
  radius: typeof Radius;
  fontSize: typeof FontSizes;
  fontWeight: typeof FontWeights;
  lineHeight: typeof LineHeights;
  isDark: boolean;
}

export const createTheme = (scheme: ColorScheme): Theme => ({
  colors: Colors[scheme],
  spacing: Spacing,
  radius: Radius,
  fontSize: FontSizes,
  fontWeight: FontWeights,
  lineHeight: LineHeights,
  isDark: scheme === 'dark',
});

export { Colors, Spacing, Radius, FontSizes, FontWeights, LineHeights };
export type {
  ColorScheme,
  ThemeColors,
  SpacingKey,
  RadiusKey,
  FontSizeKey,
  FontWeightKey,
  LineHeightKey,
};
