/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useTheme } from '../../../contexts/ThemeContext';
import {
  dynamicTabService,
  DynamicTabData,
} from '../services/dynamicTabService';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');
const BANNER_WIDTH = width - 40;

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  imageUrl: string;
  category: string;
  inStock: boolean;
  rating?: number;
  reviewCount?: number;
}

interface Category {
  id: string;
  name: string;
  imageUrl: string;
  productCount: number;
  order: number;
}

interface Banner {
  id: string;
  imageUrl: string;
  title: string;
  subtitle: string;
  order: number;
  isActive: boolean;
}

export const DynamicTabScreen = ({ route }: any) => {
  const { theme } = useTheme();
  const { tabId } = route.params;
  const [data, setData] = useState<DynamicTabData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    fetchTabData();
  }, [tabId]);

  const fetchTabData = async () => {
    try {
      setLoading(true);
      const tabData = await dynamicTabService.getDynamicTabData(tabId);
      setData(tabData);
    } catch (error) {
      console.error('Error fetching tab data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts =
    selectedCategory === 'All'
      ? data?.products || []
      : (data?.products || []).filter(
          (p: Product) => p.category === selectedCategory,
        );

  if (loading) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <ActivityIndicator size="large" color={theme.colors.orangeBase} />
      </View>
    );
  }

  if (!data) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <Text style={[styles.errorText, { color: theme.colors.text }]}>
          No data found
        </Text>
      </View>
    );
  }

  const brandColor = data.metadata?.backgroundColor || theme.colors.yellowBase;
  const accentColor = data.metadata?.accentColor || theme.colors.orangeBase;

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: brandColor }]}>
          <Text
            style={[styles.brandName, { color: theme.colors.fontSecondary }]}
          >
            {data.brandName}
          </Text>
          <Text
            style={[
              styles.brandDescription,
              { color: theme.colors.fontSecondary },
            ]}
          >
            {data.description}
          </Text>
        </View>

        {/* Banners */}
        {data.banners && data.banners.length > 0 && (
          <View style={styles.bannersSection}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.bannersScroll}
            >
              {data.banners.map((banner: Banner) => (
                <TouchableOpacity
                  key={banner.id}
                  style={[styles.bannerCard, { backgroundColor: accentColor }]}
                  activeOpacity={0.9}
                >
                  <View style={styles.bannerTextContainer}>
                    <Text
                      style={[
                        styles.bannerTitle,
                        { color: theme.colors.fontSecondary },
                      ]}
                    >
                      {banner.title}
                    </Text>
                    <Text
                      style={[
                        styles.bannerSubtitle,
                        { color: theme.colors.fontSecondary },
                      ]}
                    >
                      {banner.subtitle}
                    </Text>
                  </View>
                  <Image
                    source={{ uri: banner.imageUrl }}
                    style={styles.bannerImage}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Categories */}
        {data.categories && data.categories.length > 0 && (
          <View style={styles.categoriesSection}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Categories
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesScroll}
            >
              <TouchableOpacity
                style={[
                  styles.categoryChip,
                  {
                    backgroundColor:
                      selectedCategory === 'All'
                        ? accentColor
                        : theme.colors.yellow2,
                  },
                ]}
                onPress={() => setSelectedCategory('All')}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    {
                      color:
                        selectedCategory === 'All'
                          ? theme.colors.fontSecondary
                          : theme.colors.text,
                    },
                  ]}
                >
                  All
                </Text>
              </TouchableOpacity>
              {data.categories.map((category: Category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryChip,
                    {
                      backgroundColor:
                        selectedCategory === category.name
                          ? accentColor
                          : theme.colors.yellow2,
                    },
                  ]}
                  onPress={() => setSelectedCategory(category.name)}
                >
                  <Text
                    style={[
                      styles.categoryChipText,
                      {
                        color:
                          selectedCategory === category.name
                            ? theme.colors.fontSecondary
                            : theme.colors.text,
                      },
                    ]}
                  >
                    {category.name} ({category.productCount})
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Products Grid */}
        <View style={styles.productsSection}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Products
          </Text>
          <View style={styles.productsGrid}>
            {filteredProducts.map((product: Product) => (
              <TouchableOpacity
                key={product.id}
                style={[
                  styles.productCard,
                  { backgroundColor: theme.colors.cardBackground },
                ]}
                activeOpacity={0.9}
              >
                <Image
                  source={{ uri: product.imageUrl }}
                  style={styles.productImage}
                />

                {/* Discount Badge */}
                {product.discount && (
                  <View
                    style={[
                      styles.discountBadge,
                      { backgroundColor: accentColor },
                    ]}
                  >
                    <Text
                      style={[
                        styles.discountText,
                        { color: theme.colors.fontSecondary },
                      ]}
                    >
                      -{product.discount}%
                    </Text>
                  </View>
                )}

                {/* Stock Status */}
                {!product.inStock && (
                  <View style={styles.outOfStockOverlay}>
                    <Text style={styles.outOfStockText}>Out of Stock</Text>
                  </View>
                )}

                <View style={styles.productInfo}>
                  <Text
                    style={[styles.productName, { color: theme.colors.text }]}
                    numberOfLines={1}
                  >
                    {product.name}
                  </Text>
                  <Text
                    style={[
                      styles.productDescription,
                      { color: theme.colors.textSecondary },
                    ]}
                    numberOfLines={2}
                  >
                    {product.description}
                  </Text>

                  {/* Rating */}
                  {product.rating && (
                    <View style={styles.ratingContainer}>
                      <Ionicons name="star" size={14} color="#FFC107" />
                      <Text
                        style={[
                          styles.ratingText,
                          { color: theme.colors.text },
                        ]}
                      >
                        {product.rating.toFixed(1)}
                      </Text>
                      <Text
                        style={[
                          styles.reviewCount,
                          { color: theme.colors.textSecondary },
                        ]}
                      >
                        ({product.reviewCount})
                      </Text>
                    </View>
                  )}

                  {/* Price */}
                  <View style={styles.priceContainer}>
                    <Text style={[styles.price, { color: accentColor }]}>
                      ${product.price.toFixed(2)}
                    </Text>
                    {product.originalPrice && (
                      <Text
                        style={[
                          styles.originalPrice,
                          { color: theme.colors.textSecondary },
                        ]}
                      >
                        ${product.originalPrice.toFixed(2)}
                      </Text>
                    )}
                  </View>
                </View>

                {/* Add to Cart Button */}
                <TouchableOpacity
                  style={[styles.addButton, { backgroundColor: accentColor }]}
                  disabled={!product.inStock}
                >
                  <Ionicons
                    name="add"
                    size={20}
                    color={theme.colors.fontSecondary}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  brandName: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  brandDescription: {
    fontSize: 18,
    fontWeight: '500',
  },
  bannersSection: {
    marginTop: 20,
  },
  bannersScroll: {
    paddingHorizontal: 20,
  },
  bannerCard: {
    width: BANNER_WIDTH,
    height: 180,
    borderRadius: 24,
    padding: 20,
    marginRight: 16,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  bannerTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bannerSubtitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  bannerImage: {
    position: 'absolute',
    right: -20,
    top: 0,
    bottom: 0,
    width: '55%',
    height: '100%',
    resizeMode: 'cover',
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
  },
  categoriesSection: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  categoriesScroll: {
    gap: 12,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: '600',
  },
  productsSection: {
    marginTop: 24,
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  productCard: {
    width: (width - 56) / 2,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
  },
  discountBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  discountText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  outOfStockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 140,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  outOfStockText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 12,
    marginBottom: 8,
    lineHeight: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
  },
  reviewCount: {
    fontSize: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  originalPrice: {
    fontSize: 14,
    textDecorationLine: 'line-through',
  },
  addButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
