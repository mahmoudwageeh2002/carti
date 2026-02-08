import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../../../contexts/ThemeContext';
import { FoodCard, FoodItem } from './FoodCard';

interface RecommendationsSectionProps {
  items: FoodItem[];
  onItemPress: (item: FoodItem) => void;
  onFavoritePress: (item: FoodItem) => void;
}

export const RecommendationsSection: React.FC<RecommendationsSectionProps> = ({
  items,
  onItemPress,
  onFavoritePress,
}) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.colors.text }]}>
        Recommend
      </Text>

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
            onFavoritePress={() => onFavoritePress(item)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
});
