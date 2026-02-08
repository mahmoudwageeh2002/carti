/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, Platform } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Import screens
import { HomeScreen } from '../features/home/screens/HomeScreen';
import { DynamicTabScreen } from '../features/dynamicTab/screens/DynamicTabScreen';
import { SupportScreen } from '../features/help/screens/HelpScreen';
import { OrdersScreen } from '../features/orders/screens/MyOrdersScreen';
import { useDynamicTab } from '../contexts/DynamicTabContext';
import { FavoritesScreen } from '../features/favorites/screens/FavoritesScreen';
import { MenuScreen } from '../features/menu/screens';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  const { theme } = useTheme();
  const { dynamicTab } = useDynamicTab();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.orangeBase,
          borderTopWidth: 0,
          height: Platform.OS === 'ios' ? 90 : 70,
          paddingBottom: Platform.OS === 'ios' ? 28 : 12,
          paddingTop: 8,
          elevation: 8,
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
          position: 'absolute',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.15,
          shadowRadius: 12,
        },
        tabBarActiveTintColor: theme.colors.fontSecondary,
        tabBarInactiveTintColor: theme.colors.fontSecondary + '70',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginTop: 0,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                styles.iconContainer,
                focused && styles.iconContainerActive,
              ]}
            >
              <Ionicons
                name={focused ? 'home' : 'home-outline'}
                size={focused ? 26 : 24}
                color={color}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Menu"
        component={MenuScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                styles.iconContainer,
                focused && styles.iconContainerActive,
              ]}
            >
              <MaterialCommunityIcons
                name={focused ? 'food' : 'food-outline'}
                size={focused ? 26 : 24}
                color={color}
              />
            </View>
          ),
        }}
      />

      {/* Dynamic Tab - Centered and Elevated */}
      {dynamicTab ? (
        <Tab.Screen
          name="DynamicTab"
          component={DynamicTabScreen}
          initialParams={{ tabId: dynamicTab.id }}
          options={{
            tabBarLabel: dynamicTab.name,
            tabBarIcon: ({ focused }) => (
              <View
                style={[
                  styles.dynamicTabIcon,
                  {
                    backgroundColor: theme.colors.yellowBase,
                    borderWidth: 4,
                    borderColor: theme.colors.orangeBase,
                    transform: [{ scale: focused ? 1.05 : 1 }],
                  },
                ]}
              >
                <View
                  style={[
                    styles.dynamicIconInner,
                    {
                      backgroundColor: focused
                        ? theme.colors.orangeBase
                        : 'transparent',
                    },
                  ]}
                >
                  <MaterialCommunityIcons
                    name={dynamicTab.icon as any}
                    size={28}
                    color={
                      focused
                        ? theme.colors.yellowBase
                        : theme.colors.orangeBase
                    }
                  />
                </View>
              </View>
            ),
            tabBarIconStyle: {
              marginTop: 5,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: 'bold',
            },
          }}
        />
      ) : (
        <Tab.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View
                style={[
                  styles.iconContainer,
                  focused && styles.iconContainerActive,
                ]}
              >
                <Ionicons
                  name={focused ? 'heart' : 'heart-outline'}
                  size={focused ? 26 : 24}
                  color={color}
                />
              </View>
            ),
          }}
        />
      )}

      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                styles.iconContainer,
                focused && styles.iconContainerActive,
              ]}
            >
              <MaterialCommunityIcons
                name={focused ? 'clipboard-text' : 'clipboard-text-outline'}
                size={focused ? 26 : 24}
                color={color}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Support"
        component={SupportScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                styles.iconContainer,
                focused && styles.iconContainerActive,
              ]}
            >
              <MaterialCommunityIcons
                name={focused ? 'headset' : 'headset'}
                size={focused ? 26 : 24}
                color={color}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  iconContainerActive: {
    transform: [{ scale: 1.2 }],
  },
  dynamicTabIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',

    marginBottom: 50,
  },
  dynamicIconInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
