import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { auth, firestore } from '../config/firebase';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserData {
  uid: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  dateOfBirth: string;
  avatar?: string;
  createdAt: string;
}

interface AuthContextType {
  user: FirebaseAuthTypes.User | null;
  userData: UserData | null;
  loading: boolean;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  updateUserData: (data: Partial<UserData>) => Promise<void>;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const USER_DATA_KEY = '@carti_user_data';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user data from AsyncStorage
  const loadUserData = async () => {
    try {
      const storedData = await AsyncStorage.getItem(USER_DATA_KEY);
      if (storedData) {
        setUserData(JSON.parse(storedData));
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  // Save user data to AsyncStorage
  const saveUserData = async (data: UserData) => {
    try {
      await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(data));
      setUserData(data);
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  // Fetch user data from Firestore
  const fetchUserData = async (uid: string) => {
    try {
      const userDoc = await firestore().collection('users').doc(uid).get();
      if (userDoc.exists) {
        const data = userDoc.data() as UserData;
        await saveUserData(data);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Refresh user data from Firestore
  const refreshUserData = async () => {
    if (user) {
      await fetchUserData(user.uid);
    }
  };

  // Update user data
  const updateUserData = async (data: Partial<UserData>) => {
    if (!user || !userData) return;

    try {
      const updatedData = { ...userData, ...data };
      await firestore().collection('users').doc(user.uid).update(data);
      await saveUserData(updatedData);
    } catch (error) {
      console.error('Error updating user data:', error);
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await auth().signOut();
      await AsyncStorage.removeItem(USER_DATA_KEY);
      setUserData(null);
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (authUser) => {
      setUser(authUser);
      
      if (authUser) {
        // Load cached data first
        await loadUserData();
        // Then fetch fresh data from Firestore
        await fetchUserData(authUser.uid);
      } else {
        setUserData(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        userData,
        loading,
        isAuthenticated: !!user,
        logout,
        updateUserData,
        refreshUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
