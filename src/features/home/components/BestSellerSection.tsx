import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useTheme } from '../../../contexts/ThemeContext';
import { FoodCard, FoodItem } from './FoodCard';

interface BestSellerSectionProps {
  items: FoodItem[];
  onItemPress: (item: FoodItem) => void;
  onViewAllPress: () => void;
}

export const BestSellerSection: React.FC<BestSellerSectionProps> = ({
  items,
  onItemPress,
  onViewAllPress,
}) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Best Seller
        </Text>
        <TouchableOpacity onPress={onViewAllPress} style={styles.viewAllButton}>
          <Text
            style={[styles.viewAllText, { color: theme.colors.orangeBase }]}
          >
            View All
          </Text>
          <Text style={[styles.arrow, { color: theme.colors.orangeBase }]}>
            ›
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {items.map(item => (
          <FoodCard
            key={item.id}
            item={item}
            onPress={() => onItemPress(item)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewAllText: {
    fontSize: 16,
    fontWeight: '600',
  },
  arrow: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
});
