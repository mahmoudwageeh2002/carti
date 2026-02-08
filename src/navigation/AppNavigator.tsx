/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';
import { AuthNavigator } from './AuthNavigator';
import { BottomTabNavigator } from './BottomTabNavigator';
import { CustomDrawer } from './CustomDrawer';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { DynamicTabProvider } from '../contexts/DynamicTabContext';
import { ProfileScreen } from '../features/profile/screens/MyProfileScreen';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const MainDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
        drawerType: 'front',
        overlayColor: 'rgba(0, 0, 0, 0.5)',
        drawerStyle: {
          width: '80%',
          backgroundColor: 'transparent',
        },
        sceneContainerStyle: {
          backgroundColor: 'transparent',
        },
      }}
    >
      <Drawer.Screen name="MainTabs" component={BottomTabNavigator} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
};

export const AppNavigator = () => {
  const { user, loading } = useAuth();
  const { theme } = useTheme();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.colors.background,
        }}
      >
        <ActivityIndicator size="large" color={theme.colors.orangeBase} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <DynamicTabProvider>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!user ? (
            <Stack.Screen name="Auth" component={AuthNavigator} />
          ) : (
            <Stack.Screen name="Main" component={MainDrawer} />
          )}
        </Stack.Navigator>
      </DynamicTabProvider>
    </NavigationContainer>
  );
};
