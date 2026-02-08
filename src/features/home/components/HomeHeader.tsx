/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useTheme } from '../../../contexts/ThemeContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface HomeHeaderProps {
  onMenuPress: () => void;
  onCartPress: () => void;
  onNotificationPress: () => void;
  onProfilePress: () => void;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({
  onMenuPress,
  onCartPress,
  onNotificationPress,
  onProfilePress,
}) => {
  const { theme } = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.yellowBase }]}
    >
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View
          style={[
            styles.searchBar,
            { backgroundColor: theme.colors.fontSecondary },
          ]}
        >
          <TextInput
            placeholder="Search"
            placeholderTextColor={theme.colors.textSecondary}
            style={[styles.searchInput, { color: theme.colors.text }]}
          />
          <TouchableOpacity
            style={[
              styles.searchButton,
              { backgroundColor: theme.colors.orangeBase },
            ]}
          >
            <MaterialCommunityIcons
              name="tune"
              size={20}
              color={theme.colors.fontSecondary}
            />
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              { backgroundColor: theme.colors.fontSecondary },
            ]}
            onPress={onCartPress}
          >
            <Ionicons
              name="cart-outline"
              size={24}
              color={theme.colors.orangeBase}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.actionButton,
              { backgroundColor: theme.colors.fontSecondary },
            ]}
            onPress={onNotificationPress}
          >
            <Ionicons
              name="notifications-outline"
              size={24}
              color={theme.colors.orangeBase}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.actionButton,
              { backgroundColor: theme.colors.fontSecondary },
            ]}
            onPress={onProfilePress}
          >
            <Ionicons
              name="person-outline"
              size={24}
              color={theme.colors.orangeBase}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Greeting */}
      <View style={styles.greetingContainer}>
        <Text
          style={[styles.greetingText, { color: theme.colors.fontSecondary }]}
        >
          Good Morning
        </Text>
        <Text
          style={[styles.subGreetingText, { color: theme.colors.orangeBase }]}
        >
          Rise And Shine! It's Breakfast Time
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  time: {
    fontSize: 14,
    fontWeight: '600',
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 8,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 8,
  },
  searchButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingContainer: {
    paddingHorizontal: 20,
  },
  greetingText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subGreetingText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
