import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useTheme } from '../../../contexts/ThemeContext';
import SnacksSvg from '../../../assets/svgs/SnacksSvg.svg';
import MealsSvg from '../../../assets/svgs/MealsSvg.svg';
import VeganSvg from '../../../assets/svgs/VeganSvg.svg';
import DessertsSvg from '../../../assets/svgs/DessertsSvg.svg';
import DrinksSvg from '../../../assets/svgs/DrinksSvg.svg';

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface CategoriesSectionProps {
  onCategoryPress: (category: string) => void;
}

const categories: Category[] = [
  { id: '1', name: 'Snacks', icon: 'snacks' },
  { id: '2', name: 'Meal', icon: 'meals' },
  { id: '3', name: 'Vegan', icon: 'vegan' },
  { id: '4', name: 'Dessert', icon: 'desserts' },
  { id: '5', name: 'Drinks', icon: 'drinks' },
];

// Map icons to SVG components
const categoryIcons: { [key: string]: React.FC } = {
  snacks: SnacksSvg,
  meals: MealsSvg,
  vegan: VeganSvg,
  desserts: DessertsSvg,
  drinks: DrinksSvg,
};

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  onCategoryPress,
}) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map(category => {
          const IconComponent = categoryIcons[category.icon];

          return (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryItem}
              onPress={() => onCategoryPress(category.name)}
            >
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: theme.colors.yellow2 },
                ]}
              >
                <IconComponent />
              </View>
              <Text style={[styles.categoryName, { color: theme.colors.text }]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  scrollContent: {
    paddingHorizontal: 20,
    gap: 16,
  },
  categoryItem: {
    alignItems: 'center',
    gap: 8,
  },
  iconContainer: {
    width: 66,
    height: 80,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
  },
});
