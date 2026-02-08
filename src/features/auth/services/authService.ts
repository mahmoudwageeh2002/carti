import { auth, firestore } from '../../../config/firebase';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export interface RegisterData {
  name: string;
  email: string;
  mobile: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const authService = {
  // Register user
  register: async (
    data: RegisterData,
  ): Promise<FirebaseAuthTypes.UserCredential> => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        data.email,
        data.password,
      );

      // Update display name
      await userCredential.user.updateProfile({
        displayName: data.name,
      });

      // Save additional user data to Firestore
      await firestore().collection('users').doc(userCredential.user.uid).set({
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      return userCredential;
    } catch (error: any) {
      throw new Error(error.message || 'Registration failed');
    }
  },

  // Login user
  login: async (data: LoginData): Promise<FirebaseAuthTypes.UserCredential> => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        data.email,
        data.password,
      );
      return userCredential;
    } catch (error: any) {
      throw new Error(error.message || 'Login failed');
    }
  },

  // Logout user
  logout: async (): Promise<void> => {
    try {
      await auth().signOut();
    } catch (error: any) {
      throw new Error(error.message || 'Logout failed');
    }
  },

  // Get current user
  getCurrentUser: () => {
    return auth().currentUser;
  },

  // Password reset
  resetPassword: async (email: string): Promise<void> => {
    try {
      await auth().sendPasswordResetEmail(email);
    } catch (error: any) {
      throw new Error(error.message || 'Password reset failed');
    }
  },
};
