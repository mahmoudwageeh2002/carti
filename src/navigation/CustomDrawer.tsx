import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

interface DrawerMenuItem {
  id: string;
  title: string;
  icon: string;
  iconType: 'ionicons';
  onPress: () => void;
}

export const CustomDrawer: React.FC<DrawerContentComponentProps> = props => {
  const { theme } = useTheme();
  const { navigation } = props;
  const { userData, logout } = useAuth();

  const menuItems: DrawerMenuItem[] = [
    {
      id: '1',
      title: 'My Orders',
      icon: 'bag-handle-outline',
      iconType: 'ionicons',
      onPress: () => navigation.navigate('Orders'),
    },
    {
      id: '2',
      title: 'My Profile',
      icon: 'person-outline',
      iconType: 'ionicons',
      onPress: () => navigation.navigate('Profile'),
    },
    {
      id: '3',
      title: 'Delivery Address',
      icon: 'location-outline',
      iconType: 'ionicons',
      onPress: () => navigation.navigate('Address'),
    },
    {
      id: '4',
      title: 'Payment Methods',
      icon: 'card-outline',
      iconType: 'ionicons',
      onPress: () => navigation.navigate('Payment'),
    },
    {
      id: '5',
      title: 'Contact Us',
      icon: 'call-outline',
      iconType: 'ionicons',
      onPress: () => navigation.navigate('Support'),
    },
    {
      id: '6',
      title: 'Help & FAQs',
      icon: 'chatbubble-outline',
      iconType: 'ionicons',
      onPress: () => navigation.navigate('Support'),
    },
    {
      id: '7',
      title: 'Settings',
      icon: 'settings-outline',
      iconType: 'ionicons',
      onPress: () => navigation.navigate('Settings'),
    },
  ];

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          try {
            await logout();
            navigation.closeDrawer();
          } catch (error: any) {
            console.log('error', error);

            Alert.alert('Error', 'Failed to logout');
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[theme.colors.yellowBase, theme.colors.orangeBase]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Close Button */}
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.closeDrawer()}
        >
          <Ionicons
            name="chevron-forward-outline"
            size={28}
            color={theme.colors.fontSecondary}
          />
        </TouchableOpacity>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* User Profile Section */}
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <Image
                source={{
                  uri: userData?.avatar || 'https://via.placeholder.com/150',
                }}
                style={styles.avatar}
              />
            </View>
            <Text
              style={[styles.userName, { color: theme.colors.fontSecondary }]}
            >
              {userData?.fullName || 'Guest User'}
            </Text>
            <Text
              style={[styles.userEmail, { color: theme.colors.fontSecondary }]}
            >
              {userData?.email || 'guest@example.com'}
            </Text>
          </View>

          {/* Menu Items */}
          <View style={styles.menuSection}>
            {menuItems.map((item, index) => (
              <View key={item.id}>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={item.onPress}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.iconContainer,
                      { backgroundColor: theme.colors.fontSecondary },
                    ]}
                  >
                    <Ionicons
                      name={item.icon as any}
                      size={28}
                      color={theme.colors.orangeBase}
                    />
                  </View>
                  <Text
                    style={[
                      styles.menuText,
                      { color: theme.colors.fontSecondary },
                    ]}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
                {index < menuItems.length - 1 && (
                  <View
                    style={[
                      styles.separator,
                      { backgroundColor: theme.colors.fontSecondary + '30' },
                    ]}
                  />
                )}
              </View>
            ))}
          </View>

          {/* Logout Button */}
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: theme.colors.fontSecondary },
              ]}
            >
              <Ionicons
                name="log-out-outline"
                size={24}
                color={theme.colors.orangeBase}
              />
            </View>
            <Text
              style={[styles.logoutText, { color: theme.colors.fontSecondary }]}
            >
              Log Out
            </Text>
          </TouchableOpacity>

          {/* Decorative circles */}
          <View style={[styles.decorCircle, styles.decorCircle1]} />
          <View style={[styles.decorCircle, styles.decorCircle2]} />
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopLeftRadius: 60,
    borderBottomLeftRadius: 60,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  gradient: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 10,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingTop: 100,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    marginBottom: 16,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    opacity: 0.9,
  },
  menuSection: {
    marginBottom: 40,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuText: {
    fontSize: 20,
    fontWeight: '600',
  },
  separator: {
    height: 1,
    marginLeft: 68,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 20,
  },
  logoutText: {
    fontSize: 20,
    fontWeight: '600',
  },
  decorCircle: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  decorCircle1: {
    bottom: -50,
    left: -70,
  },
  decorCircle2: {
    top: 50,
    right: -80,
    width: 200,
    height: 200,
    borderRadius: 100,
  },
});
