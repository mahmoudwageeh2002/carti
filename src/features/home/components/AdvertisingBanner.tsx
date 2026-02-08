/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { useTheme } from '../../../contexts/ThemeContext';

const { width } = Dimensions.get('window');
const BANNER_WIDTH = width - 40; // Account for padding
const AUTO_SCROLL_INTERVAL = 5000; // 5 seconds

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  backgroundColor?: string;
  textColor?: string;
}

interface AdvertisingBannerProps {
  banners: Banner[];
  onBannerPress: (banner: Banner) => void;
}

export const AdvertisingBanner: React.FC<AdvertisingBannerProps> = ({
  banners,
  onBannerPress,
}) => {
  const { theme } = useTheme();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollTimerRef = useRef<number | null>(null);

  // Auto-scroll effect
  useEffect(() => {
    if (banners.length <= 1) return;

    scrollTimerRef.current = setInterval(() => {
      const nextIndex = (activeIndex + 1) % banners.length;
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
      setActiveIndex(nextIndex);
    }, AUTO_SCROLL_INTERVAL);

    return () => {
      if (scrollTimerRef.current) {
        clearInterval(scrollTimerRef.current);
      }
    };
  }, [activeIndex, banners.length]);

  // Handle manual scroll
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / BANNER_WIDTH);
    setActiveIndex(index);

    // Reset auto-scroll timer when user scrolls manually
    if (scrollTimerRef.current) {
      clearInterval(scrollTimerRef.current);
    }
  };

  const renderBanner = ({ item }: { item: Banner }) => (
    <TouchableOpacity
      style={[
        styles.banner,
        {
          backgroundColor: item.backgroundColor || theme.colors.orangeBase,
          width: BANNER_WIDTH,
        },
      ]}
      onPress={() => onBannerPress(item)}
      activeOpacity={0.9}
    >
      <View style={styles.textContainer}>
        <Text
          style={[
            styles.title,
            { color: item.textColor || theme.colors.fontSecondary },
          ]}
        >
          {item.title}
        </Text>
        <Text
          style={[
            styles.subtitle,
            { color: item.textColor || theme.colors.fontSecondary },
          ]}
        >
          {item.subtitle}
        </Text>
      </View>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />

      {/* Decorative circles */}
      <View style={[styles.decorCircle, styles.decorCircle1]} />
      <View style={[styles.decorCircle, styles.decorCircle2]} />
    </TouchableOpacity>
  );

  if (banners.length === 0) return null;

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={banners}
        renderItem={renderBanner}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        snapToInterval={BANNER_WIDTH}
        decelerationRate="fast"
        contentContainerStyle={styles.flatListContent}
        getItemLayout={(data, index) => ({
          length: BANNER_WIDTH,
          offset: BANNER_WIDTH * index,
          index,
        })}
      />

      {/* Pagination Dots */}
      {banners.length > 1 && (
        <View style={styles.pagination}>
          {banners.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    index === activeIndex
                      ? theme.colors.orangeBase
                      : theme.colors.yellow2,
                  width: index === activeIndex ? 32 : 8,
                },
              ]}
              onPress={() => {
                flatListRef.current?.scrollToIndex({
                  index,
                  animated: true,
                });
                setActiveIndex(index);
              }}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  flatListContent: {
    // paddingHorizontal: 20,
    paddingEnd: 20,
  },
  banner: {
    height: 200,
    flexDirection: 'row',
    padding: 24,
    borderRadius: 24,
    overflow: 'hidden',
    marginRight: 0,
    marginHorizontal: 15,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    zIndex: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    lineHeight: 28,
  },
  subtitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  image: {
    position: 'absolute',
    right: -20,
    top: 0,
    bottom: 0,
    width: '60%',
    height: '100%',
    resizeMode: 'cover',
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
  },
  decorCircle: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  decorCircle1: {
    bottom: -30,
    left: -20,
  },
  decorCircle2: {
    top: -20,
    left: 60,
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 16,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
});
