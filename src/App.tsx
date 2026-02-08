/* eslint-disable @typescript-eslint/no-unused-vars */
import { StyleSheet, Alert, View, Button as RNButton } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { AppNavigator } from './navigation/AppNavigator';
import { useState } from 'react';
import { seedDynamicTab } from './features/dynamicTab/scripts/seedDynamicTab';
import { seedHomeData } from './features/home/scripts/seedHomeData';

function App() {
  const [showSeedButtons, setShowSeedButtons] = useState(true);

  const runDynamicTabSeed = async () => {
    try {
      console.log('Starting dynamic tab seed...');
      Alert.alert('Info', 'Seeding dynamic tab...');
      const result = await seedDynamicTab();
      console.log('Seed result:', result);
      Alert.alert('Success', 'Dynamic tab seeded!');
    } catch (error: any) {
      console.error('Failed to seed:', error);
      Alert.alert('Error', `Failed: ${error.message}`);
    }
  };

  const runHomeDataSeed = async () => {
    try {
      console.log('Starting home data seed...');
      Alert.alert('Info', 'Seeding home data...');
      const result = await seedHomeData();
      console.log('Seed result:', result);
      Alert.alert(
        'Success',
        'Home data seeded! Remove seed buttons from App.tsx now.',
      );
      setShowSeedButtons(false);
    } catch (error: any) {
      console.error('Failed to seed:', error);
      Alert.alert('Error', `Failed: ${error.message}`);
    }
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <SafeAreaProvider>
          <AppNavigator />
        </SafeAreaProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  seedButtons: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 9999,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default App;
