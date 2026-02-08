/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  Platform,
} from 'react-native';
import { useTheme } from '../../../contexts/ThemeContext';
import { useAuth } from '../../../contexts/AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  launchImageLibrary,
  launchCamera,
  ImagePickerResponse,
} from 'react-native-image-picker';

export const ProfileScreen = ({ navigation }: any) => {
  const { theme } = useTheme();
  const { userData, updateUserData } = useAuth();

  const [fullName, setFullName] = useState(userData?.fullName || '');
  const [dateOfBirth, setDateOfBirth] = useState(userData?.dateOfBirth || '');
  const [email, setEmail] = useState(userData?.email || '');
  const [phoneNumber, setPhoneNumber] = useState(userData?.phoneNumber || '');
  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      await updateUserData({
        fullName,
        dateOfBirth,
        phoneNumber,
      });
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChangeAvatar = () => {
    Alert.alert(
      'Change Profile Picture',
      'Choose an option',
      [
        {
          text: 'Take Photo',
          onPress: () => openCamera(),
        },
        {
          text: 'Choose from Library',
          onPress: () => openGallery(),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true },
    );
  };

  const openCamera = async () => {
    try {
      const result: ImagePickerResponse = await launchCamera({
        mediaType: 'photo',
        quality: 0.8,
        saveToPhotos: true,
      });

      if (result.assets && result.assets[0].uri) {
        await updateUserData({ avatar: result.assets[0].uri });
      }
    } catch (error) {
      console.log('Camera error:', error);
    }
  };

  const openGallery = async () => {
    try {
      const result: ImagePickerResponse = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
        selectionLimit: 1,
      });

      if (result.assets && result.assets[0].uri) {
        await updateUserData({ avatar: result.assets[0].uri });
      }
    } catch (error) {
      console.log('Gallery error:', error);
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.yellowBase }]}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="chevron-back"
            size={28}
            color={theme.colors.orangeBase}
          />
        </TouchableOpacity>
        <Text
          style={[styles.headerTitle, { color: theme.colors.fontSecondary }]}
        >
          My profile
        </Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Content */}
      <ScrollView
        style={[styles.content, { backgroundColor: theme.colors.background }]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={{
                uri: userData?.avatar || 'https://via.placeholder.com/150',
              }}
              style={styles.avatar}
            />
            <TouchableOpacity
              style={[
                styles.cameraButton,
                { backgroundColor: theme.colors.orangeBase },
              ]}
              onPress={handleChangeAvatar}
            >
              <Ionicons
                name="camera"
                size={20}
                color={theme.colors.fontSecondary}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.colors.text }]}>
              Full Name
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.colors.yellow2,
                  color: theme.colors.text,
                },
              ]}
              value={fullName}
              onChangeText={setFullName}
              placeholder="Enter your full name"
              placeholderTextColor={theme.colors.textSecondary}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.colors.text }]}>
              Date of Birth
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.colors.yellow2,
                  color: theme.colors.text,
                },
              ]}
              value={dateOfBirth}
              onChangeText={setDateOfBirth}
              placeholder="DD / MM / YYYY"
              placeholderTextColor={theme.colors.textSecondary}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.colors.text }]}>
              Email
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.colors.yellow2,
                  color: theme.colors.textSecondary,
                },
              ]}
              value={email}
              editable={false}
              placeholderTextColor={theme.colors.textSecondary}
            />
          </View>

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
                },
              ]}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="Enter your phone number"
              placeholderTextColor={theme.colors.textSecondary}
              keyboardType="phone-pad"
            />
          </View>

          <TouchableOpacity
            style={[
              styles.updateButton,
              { backgroundColor: theme.colors.orangeBase },
            ]}
            onPress={handleUpdateProfile}
            disabled={loading}
          >
            <Text
              style={[
                styles.updateButtonText,
                { color: theme.colors.fontSecondary },
              ]}
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 24,
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
  avatarSection: {
    alignItems: 'center',
    marginVertical: 30,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 40,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#F5F5F5',
  },
  form: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
  },
  input: {
    height: 60,
    borderRadius: 20,
    paddingHorizontal: 20,
    fontSize: 16,
  },
  updateButton: {
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  updateButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
