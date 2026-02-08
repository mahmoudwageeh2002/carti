/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  DimensionValue,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  width?: DimensionValue;
  height?: number;
  backgroundColor?: string;
  textColor?: string;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
  textStyle,
  width,
  height,
  backgroundColor,
  textColor,
}) => {
  const { theme } = useTheme();

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: theme.radius.full,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.xl,
      width: width || '80%',
      height: height || 56,
      alignSelf: 'center',
    };

    // Variant styles
    const variantStyles: Record<string, ViewStyle> = {
      primary: { backgroundColor: backgroundColor || theme.colors.orangeBase },
      secondary: {
        backgroundColor: backgroundColor || theme.colors.yellowBase,
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: theme.colors.orangeBase,
      },
    };

    return {
      ...baseStyle,
      ...variantStyles[variant],
      ...(disabled && { opacity: 0.5 }),
    };
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontWeight: theme.fontWeight.semibold,
      fontSize: theme.fontSize.lg,
    };

    const variantStyles: Record<string, TextStyle> = {
      primary: { color: textColor || theme.colors.fontSecondary },
      secondary: { color: textColor || theme.colors.fontPrimary },
      outline: { color: textColor || theme.colors.orangeBase },
    };

    return {
      ...baseStyle,
      ...variantStyles[variant],
    };
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={
            variant === 'outline'
              ? theme.colors.orangeBase
              : theme.colors.fontSecondary
          }
        />
      ) : (
        <Text style={[getTextStyle(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {},
  text: {},
});
