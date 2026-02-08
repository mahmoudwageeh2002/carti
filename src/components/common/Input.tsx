import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import Entypo from 'react-native-vector-icons/Entypo';

type InputType =
  | 'text'
  | 'textarea'
  | 'password'
  | 'picker'
  | 'bottomsheet'
  | 'mobile';

interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  type?: InputType;
  error?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  onPickerPress?: () => void;
  onBottomSheetPress?: () => void;
  rightIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  error,
  containerStyle,
  inputStyle,
  onPickerPress,
  onBottomSheetPress,
  rightIcon,
  ...textInputProps
}) => {
  const { theme } = useTheme();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isInteractive = type === 'picker' || type === 'bottomsheet';

  const handlePress = () => {
    if (type === 'picker' && onPickerPress) {
      onPickerPress();
    } else if (type === 'bottomsheet' && onBottomSheetPress) {
      onBottomSheetPress();
    }
  };

  const getKeyboardType = () => {
    if (type === 'mobile') {
      return 'phone-pad';
    }
    return textInputProps.keyboardType || 'default';
  };

  const getInputComponent = () => {
    if (isInteractive) {
      return (
        <TouchableOpacity
          style={[
            styles.input,
            {
              backgroundColor: theme.colors.yellow2,
              borderRadius: theme.radius.lg,
              paddingHorizontal: theme.spacing.lg,
              paddingVertical: theme.spacing.md,
              borderWidth: 1,
              borderColor: error ? theme.colors.error : 'transparent',
            },
            inputStyle,
          ]}
          onPress={handlePress}
          activeOpacity={0.7}
        >
          <Text
            style={{
              color: theme.colors.fontPrimary,
              fontSize: theme.fontSize.md,
            }}
          >
            {textInputProps.placeholder}
          </Text>
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.inputContainer}>
        <TextInput
          {...textInputProps}
          style={[
            styles.input,
            type === 'textarea' && styles.textarea,
            {
              backgroundColor: theme.colors.yellow2,
              borderRadius: theme.radius.lg,
              paddingHorizontal: theme.spacing.lg,
              paddingVertical: theme.spacing.md,
              color: theme.colors.fontPrimary,
              fontSize: theme.fontSize.md,
              borderWidth: 1,
              borderColor: error ? theme.colors.error : 'transparent',
            },
            inputStyle,
          ]}
          placeholderTextColor={theme.colors.fontPrimary + '80'}
          secureTextEntry={type === 'password' && !isPasswordVisible}
          multiline={type === 'textarea'}
          numberOfLines={type === 'textarea' ? 4 : 1}
          textAlignVertical={type === 'textarea' ? 'top' : 'center'}
          keyboardType={getKeyboardType()}
        />
        {type === 'password' && (
          <TouchableOpacity
            style={[
              styles.eyeIcon,
              { right: theme.spacing.md, top: theme.spacing.sm + 2 },
            ]}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            activeOpacity={0.7}
          >
            <Text
              style={{
                color: theme.colors.orangeBase,
                fontSize: 20,
              }}
            >
              {isPasswordVisible ? (
                <Entypo name="eye" size={20} />
              ) : (
                <Entypo name="eye-with-line" size={20} />
              )}
            </Text>
          </TouchableOpacity>
        )}
        {rightIcon && (
          <View style={[styles.rightIcon, { right: theme.spacing.lg }]}>
            {rightIcon}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text
          style={[
            styles.label,
            {
              color: theme.colors.text,
              fontSize: theme.fontSize.md,
              marginBottom: theme.spacing.sm,
              fontWeight: theme.fontWeight.medium,
            },
          ]}
        >
          {label}
        </Text>
      )}
      {getInputComponent()}
      {error && (
        <Text
          style={[
            styles.error,
            {
              color: theme.colors.error,
              fontSize: theme.fontSize.sm,
              marginTop: theme.spacing.xs,
            },
          ]}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {},
  inputContainer: {
    position: 'relative',
  },
  input: {
    width: '100%',
  },
  textarea: {
    minHeight: 100,
  },
  eyeIcon: {
    position: 'absolute',
    padding: 4,
  },
  rightIcon: {
    position: 'absolute',
    top: 12,
  },
  error: {},
});
