/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Alert } from 'react-native';
import { useTheme } from '../../../contexts/ThemeContext';
import { HomeHeader } from '../components/HomeHeader';
import { CategoriesSection } from '../components/CategoriesSection';
import { BestSellerSection } from '../components/BestSellerSection';
import { AdvertisingBanner, Banner } from '../components/AdvertisingBanner';
import { RecommendationsSection } from '../components/RecommendationsSection';
import { FoodItem } from '../components/FoodCard';
import { firestore } from '../../../config/firebase';
import { DrawerActions, useNavigation } from '@react-navigation/native';

export const HomeScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [bestSellers, setBestSellers] = useState<FoodItem[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [recommended, setRecommended] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      const bestSellersSnapshot = await firestore()
        .collection('bestSellers')
        .orderBy('order')
        .get();
      const bestSellersData = bestSellersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as FoodItem[];

      const bannersSnapshot = await firestore()
        .collection('banners')
        .where('isActive', '==', true)
        .orderBy('order')
        .get();
      const bannersData = bannersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Banner[];

      const recommendedSnapshot = await firestore()
        .collection('recommended')
        .orderBy('order')
        .get();
      const recommendedData = recommendedSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as FoodItem[];

      setBestSellers(bestSellersData);
      setBanners(bannersData);
      setRecommended(recommendedData);
    } catch (error) {
      console.error('Error fetching home data:', error);
      Alert.alert('Error', 'Failed to load home data');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryPress = (category: string) => {
    console.log('Category pressed:', category);
  };

  const handleItemPress = (item: FoodItem) => {
    console.log('Item pressed:', item);
  };

  const handleBannerPress = (banner: Banner) => {
    console.log('Banner pressed:', banner);
  };

  const handleFavoritePress = (item: FoodItem) => {
    console.log('Favorite pressed:', item);
  };

  const handleViewAllPress = () => {
    console.log('View all pressed');
  };

  const handleProfilePress = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <HomeHeader
          onMenuPress={() => console.log('Menu')}
          onCartPress={() => console.log('Cart')}
          onNotificationPress={() => console.log('Notifications')}
          onProfilePress={handleProfilePress}
        />

        <CategoriesSection onCategoryPress={handleCategoryPress} />

        {bestSellers.length > 0 && (
          <BestSellerSection
            items={bestSellers}
            onItemPress={handleItemPress}
            onViewAllPress={handleViewAllPress}
          />
        )}

        {banners.length > 0 && (
          <AdvertisingBanner
            banners={banners}
            onBannerPress={handleBannerPress}
          />
        )}

        {recommended.length > 0 && (
          <RecommendationsSection
            items={recommended}
            onItemPress={handleItemPress}
            onFavoritePress={handleFavoritePress}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
