export const Colors = {
  light: {
    // Primary Colors
    yellowBase: '#F5CB58',
    yellow2: '#F3E9B5',
    orangeBase: '#E95322',
    orange2: '#FFDECF',

    // Font Colors
    fontPrimary: '#391713',
    fontSecondary: '#F8F8F8',

    // Background Colors
    background: '#FFFFFF',
    backgroundSecondary: '#F8F8F8',
    surface: '#FFFFFF',

    // Text Colors
    text: '#391713',
    textSecondary: '#666666',
    textInverse: '#F8F8F8',

    // Status Colors
    success: '#4CAF50',
    error: '#F44336',
    warning: '#FF9800',
    info: '#2196F3',

    // Borders & Dividers
    border: '#E0E0E0',
    divider: '#EEEEEE',
  },
  dark: {
    // Primary Colors
    yellowBase: '#F5CB58',
    yellow2: '#8B7830',
    orangeBase: '#E95322',
    orange2: '#994015',

    // Font Colors
    fontPrimary: '#F8F8F8',
    fontSecondary: '#391713',

    // Background Colors
    background: '#121212',
    backgroundSecondary: '#1E1E1E',
    surface: '#2C2C2C',

    // Text Colors
    text: '#F8F8F8',
    textSecondary: '#B0B0B0',
    textInverse: '#391713',

    // Status Colors
    success: '#66BB6A',
    error: '#EF5350',
    warning: '#FFA726',
    info: '#42A5F5',

    // Borders & Dividers
    border: '#3C3C3C',
    divider: '#2C2C2C',
  },
};

export type ColorScheme = keyof typeof Colors;
export type ThemeColors = typeof Colors.light;
