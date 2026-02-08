/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useTheme } from '../../../contexts/ThemeContext';
import { Input } from '../../../components/common/Input';
import { Button } from '../../../components/common/Button';
import { authService } from '../services/authService';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const LoginScreen = ({ navigation }: any) => {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // Reset errors
    setEmailError('');
    setPasswordError('');

    // Validation
    if (!email) {
      setEmailError('Email is required');
      return;
    }
    if (!password) {
      setPasswordError('Password is required');
      return;
    }

    try {
      setLoading(true);
      await authService.login({ email, password });
      // Navigation will be handled automatically by AuthContext
    } catch (error: any) {
      Alert.alert('Login Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBiometricLogin = () => {
    console.log('Biometric login');
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.yellowBase }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={[styles.header, { paddingTop: theme.spacing.xxxl }]}>
          <Text
            style={[
              styles.greeting,
              {
                color: theme.colors.fontSecondary,
                fontSize: theme.fontSize.heading1,
                fontWeight: theme.fontWeight.bold,
              },
            ]}
          >
            Hello!
          </Text>
        </View>

        {/* Form Section */}
        <View
          style={[
            styles.formContainer,
            {
              backgroundColor: theme.colors.background,
              borderTopLeftRadius: theme.radius.xl,
              borderTopRightRadius: theme.radius.xl,
              paddingHorizontal: theme.spacing.xl,
              paddingTop: theme.spacing.xxxl,
            },
          ]}
        >
          <Text
            style={[
              styles.title,
              {
                color: theme.colors.text,
                fontSize: theme.fontSize.heading2,
                fontWeight: theme.fontWeight.bold,
                marginBottom: theme.spacing.xl,
              },
            ]}
          >
            Welcome
          </Text>

          <Input
            label="Email or Mobile Number"
            type="text"
            placeholder="example@example.com"
            value={email}
            onChangeText={setEmail}
            error={emailError}
            keyboardType="email-address"
            autoCapitalize="none"
            containerStyle={{ marginBottom: theme.spacing.lg }}
          />

          <Input
            label="Password"
            type="password"
            placeholder="**************"
            value={password}
            onChangeText={setPassword}
            error={passwordError}
            containerStyle={{ marginBottom: theme.spacing.sm }}
          />

          <TouchableOpacity
            style={[styles.forgotPassword, { marginBottom: theme.spacing.xl }]}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.forgotPasswordText,
                {
                  color: theme.colors.orangeBase,
                  fontSize: theme.fontSize.md,
                  textAlign: 'right',
                },
              ]}
            >
              Forget Password
            </Text>
          </TouchableOpacity>

          <Button
            title="Log In"
            onPress={handleLogin}
            variant="primary"
            loading={loading}
            style={{ marginTop: theme.spacing.lg }}
          />

          <View
            style={[
              styles.divider,
              { marginVertical: theme.spacing.lg, alignItems: 'center' },
            ]}
          >
            <Text
              style={[
                styles.dividerText,
                {
                  color: theme.colors.textSecondary,
                  fontSize: theme.fontSize.md,
                },
              ]}
            >
              or
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.biometricButton,
              {
                backgroundColor: theme.colors.orange2,
                borderRadius: theme.radius.full,
                width: 64,
                height: 64,
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}
            onPress={handleBiometricLogin}
            activeOpacity={0.7}
          >
            {Platform.OS === 'ios' ? (
              <MaterialCommunityIcons
                name="face-recognition"
                color={theme.colors.text}
                size={35}
              />
            ) : (
              <Ionicons
                name="finger-print"
                color={theme.colors.text}
                size={40}
              />
            )}
          </TouchableOpacity>

          <View
            style={[
              styles.signupContainer,
              {
                marginTop: theme.spacing.xl,
                marginBottom: theme.spacing.xxl,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
              },
            ]}
          >
            <Text
              style={[
                styles.signupText,
                {
                  color: theme.colors.textSecondary,
                  fontSize: theme.fontSize.md,
                },
              ]}
            >
              Don't have an account?{' '}
            </Text>

            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text
                style={{ color: theme.colors.orangeBase, fontWeight: '600' }}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.3,
    minHeight: 150,
  },
  greeting: {
    textAlign: 'center',
  },
  formContainer: {
    flex: 0.7,
    minHeight: 500,
  },
  title: {},
  forgotPassword: {
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {},
  divider: {},
  dividerText: {},
  biometricButton: {},
  signupContainer: {},
  signupText: {},
});
