import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../../../contexts/ThemeContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

export interface FoodItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  imageUrl: string;
  rating?: number;
  reviewCount?: number;
  isFavorite?: boolean;
}

interface FoodCardProps {
  item: FoodItem;
  onPress: () => void;
  onFavoritePress?: () => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({
  item,
  onPress,
  onFavoritePress,
}) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity style={[styles.card]} onPress={onPress}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />

      {/* Rating Badge */}
      {item.rating && (
        <View
          style={[
            styles.ratingBadge,
            { backgroundColor: theme.colors.fontSecondary },
          ]}
        >
          <Ionicons name="star" size={14} color="#FFC107" />
          <Text style={[styles.ratingText, { color: theme.colors.text }]}>
            {item.rating.toFixed(1)}
          </Text>
        </View>
      )}

      {/* Favorite Button */}
      {onFavoritePress && (
        <TouchableOpacity
          style={[
            styles.favoriteButton,
            { backgroundColor: theme.colors.fontSecondary },
          ]}
          onPress={onFavoritePress}
        >
          <Ionicons
            name={item.isFavorite ? 'heart' : 'heart-outline'}
            size={20}
            color={item.isFavorite ? '#E95322' : theme.colors.textSecondary}
          />
        </TouchableOpacity>
      )}

      {/* Price Tag */}
      <View
        style={[styles.priceTag, { backgroundColor: theme.colors.orangeBase }]}
      >
        <Text style={[styles.priceText, { color: theme.colors.fontSecondary }]}>
          ${item.price.toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 160,
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 16,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  ratingBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceTag: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: 'center',
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
