/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import { useTheme } from '../../../contexts/ThemeContext';
import { auth, firestore } from '../../../config/firebase';
import { UserData } from '../../../contexts/AuthContext';

export const RegisterScreen = ({ navigation }: any) => {
  const { theme } = useTheme();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Error states
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const validateForm = () => {
    const newErrors = {
      fullName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    };

    let isValid = true;

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const userCredential = await auth().createUserWithEmailAndPassword(
        email.trim(),
        password,
      );

      const user = userCredential.user;

      const userData: UserData = {
        uid: user.uid,
        email: email.trim(),
        fullName: fullName.trim(),
        phoneNumber: phoneNumber.trim(),
        dateOfBirth: formatDate(dateOfBirth),
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          fullName,
        )}&size=200&background=random`,
        createdAt: new Date().toISOString(),
      };

      await firestore().collection('users').doc(user.uid).set(userData);
    } catch (error: any) {
      console.error('Registration error:', error);
      if (error.code === 'auth/email-already-in-use') {
        setErrors({ ...errors, email: 'Email already in use' });
      } else {
        setErrors({
          ...errors,
          email: error.message || 'Failed to create account',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.yellowBase }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text
          style={[styles.headerTitle, { color: theme.colors.fontSecondary }]}
        >
          New Account
        </Text>
      </View>

      {/* Content */}
      <ScrollView
        style={[styles.content, { backgroundColor: theme.colors.background }]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.form}>
          {/* Full Name */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.colors.text }]}>
              Full name
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.colors.yellow2,
                  color: theme.colors.text,
                  borderColor: errors.fullName ? '#FF3B30' : 'transparent',
                  borderWidth: errors.fullName ? 1 : 0,
                },
              ]}
              placeholder="Enter your full name"
              placeholderTextColor={theme.colors.textSecondary}
              value={fullName}
              onChangeText={text => {
                setFullName(text);
                if (errors.fullName) {
                  setErrors({ ...errors, fullName: '' });
                }
              }}
              autoCapitalize="words"
            />
            {errors.fullName ? (
              <Text style={styles.errorText}>{errors.fullName}</Text>
            ) : null}
          </View>

          {/* Date of Birth */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.colors.text }]}>
              Date of Birth
            </Text>
            <TouchableOpacity
              style={[
                styles.input,
                {
                  backgroundColor: theme.colors.yellow2,
                  justifyContent: 'center',
                },
              ]}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={[styles.dateText, { color: theme.colors.text }]}>
                {formatDate(dateOfBirth)}
              </Text>
            </TouchableOpacity>
          </View>

          <DatePicker
            modal
            open={showDatePicker}
            date={dateOfBirth}
            mode="date"
            maximumDate={new Date()}
            onConfirm={date => {
              setShowDatePicker(false);
              setDateOfBirth(date);
            }}
            onCancel={() => {
              setShowDatePicker(false);
            }}
          />

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.colors.text }]}>
              Email
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.colors.yellow2,
                  color: theme.colors.text,
                  borderColor: errors.email ? '#FF3B30' : 'transparent',
                  borderWidth: errors.email ? 1 : 0,
                },
              ]}
              placeholder="johnsmith@example.com"
              placeholderTextColor={theme.colors.textSecondary}
              value={email}
              onChangeText={text => {
                setEmail(text);
                if (errors.email) {
                  setErrors({ ...errors, email: '' });
                }
              }}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}
          </View>

          {/* Phone Number */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.colors.text }]}>
              Phone Number
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.colors.yellow2,
                  color: theme.colors.text,
                  borderColor: errors.phoneNumber ? '#FF3B30' : 'transparent',
                  borderWidth: errors.phoneNumber ? 1 : 0,
                },
              ]}
              placeholder="+123 567 89000"
              placeholderTextColor={theme.colors.textSecondary}
              value={phoneNumber}
              onChangeText={text => {
                setPhoneNumber(text);
                if (errors.phoneNumber) {
                  setErrors({ ...errors, phoneNumber: '' });
                }
              }}
              keyboardType="phone-pad"
            />
            {errors.phoneNumber ? (
              <Text style={styles.errorText}>{errors.phoneNumber}</Text>
            ) : null}
          </View>

          {/* Password */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.colors.text }]}>
              Password
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.colors.yellow2,
                  color: theme.colors.text,
                  borderColor: errors.password ? '#FF3B30' : 'transparent',
                  borderWidth: errors.password ? 1 : 0,
                },
              ]}
              placeholder="Enter password"
              placeholderTextColor={theme.colors.textSecondary}
              value={password}
              onChangeText={text => {
                setPassword(text);
                if (errors.password) {
                  setErrors({ ...errors, password: '' });
                }
              }}
              secureTextEntry
            />
            {errors.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}
          </View>

          {/* Confirm Password */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.colors.text }]}>
              Confirm Password
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.colors.yellow2,
                  color: theme.colors.text,
                  borderColor: errors.confirmPassword
                    ? '#FF3B30'
                    : 'transparent',
                  borderWidth: errors.confirmPassword ? 1 : 0,
                },
              ]}
              placeholder="Re-enter password"
              placeholderTextColor={theme.colors.textSecondary}
              value={confirmPassword}
              onChangeText={text => {
                setConfirmPassword(text);
                if (errors.confirmPassword) {
                  setErrors({ ...errors, confirmPassword: '' });
                }
              }}
              secureTextEntry
            />
            {errors.confirmPassword ? (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            ) : null}
          </View>

          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: theme.colors.orangeBase },
            ]}
            onPress={handleRegister}
            disabled={loading}
          >
            <Text
              style={[styles.buttonText, { color: theme.colors.fontSecondary }]}
            >
              {loading ? 'Creating Account...' : 'Sign up'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text
              style={[styles.linkText, { color: theme.colors.textSecondary }]}
            >
              Already have an account?{' '}
              <Text
                style={{
                  color: theme.colors.orangeBase,
                  fontWeight: 'bold',
                }}
              >
                Login
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  scrollContent: {
    padding: 20,
  },
  form: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    height: 56,
    borderRadius: 16,
    paddingHorizontal: 20,
    fontSize: 16,
  },
  dateText: {
    fontSize: 16,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: -4,
  },
  button: {
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkButton: {
    alignItems: 'center',
    marginTop: 16,
  },
  linkText: {
    fontSize: 14,
  },
});
