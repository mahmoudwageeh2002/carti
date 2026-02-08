import { firestore } from '../../../config/firebase';

/**
 * Seeds home screen data: bestSellers, banners, and recommended items
 * Run once, then delete this file
 */

export const seedHomeData = async () => {
  try {
    console.log('🌱 Starting to seed home data...');

    // Step 1: Clean up existing data
    console.log('🗑️ Cleaning up existing data...');
    const collections = ['bestSellers', 'banners', 'recommended'];

    for (const collectionName of collections) {
      const snapshot = await firestore().collection(collectionName).get();
      const batch = firestore().batch();
      snapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });
      await batch.commit();
      console.log(`✅ Cleaned ${collectionName}`);
    }

    await new Promise(resolve => setTimeout(resolve as any, 1000));

    // Step 2: Seed Best Sellers
    console.log('📦 Seeding Best Sellers...');
    const bestSellers = [
      {
        id: 'bs_001',
        name: 'Salmon Sushi Roll',
        description: 'Fresh salmon with avocado and cucumber',
        price: 103.0,
        imageUrl:
          'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400',
        rating: 4.8,
        reviewCount: 245,
        category: 'Meal',
        isPopular: true,
        preparationTime: '15-20 min',
        calories: 350,
        order: 1,
        createdAt: firestore.FieldValue.serverTimestamp(),
      },
      {
        id: 'bs_002',
        name: 'Butter Chicken Rice Bowl',
        description: 'Creamy butter chicken served with basmati rice',
        price: 50.0,
        imageUrl:
          'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400',
        rating: 4.9,
        reviewCount: 432,
        category: 'Meal',
        isPopular: true,
        preparationTime: '25-30 min',
        calories: 580,
        order: 2,
        createdAt: firestore.FieldValue.serverTimestamp(),
      },
      {
        id: 'bs_003',
        name: 'Spinach Lasagna',
        description: 'Layered pasta with spinach and ricotta cheese',
        price: 12.99,
        imageUrl:
          'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400',
        rating: 4.7,
        reviewCount: 189,
        category: 'Meal',
        isPopular: true,
        preparationTime: '20-25 min',
        calories: 420,
        order: 3,
        createdAt: firestore.FieldValue.serverTimestamp(),
      },
      {
        id: 'bs_004',
        name: 'Berry Cupcake',
        description: 'Vanilla cupcake topped with fresh berries',
        price: 8.2,
        imageUrl:
          'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=400',
        rating: 4.6,
        reviewCount: 156,
        category: 'Dessert',
        isPopular: true,
        preparationTime: '5 min',
        calories: 280,
        order: 4,
        createdAt: firestore.FieldValue.serverTimestamp(),
      },
    ];

    for (const item of bestSellers) {
      await firestore().collection('bestSellers').doc(item.id).set(item);
      await new Promise(resolve => setTimeout(resolve as any, 300));
    }
    console.log('✅ Best Sellers seeded');

    await new Promise(resolve => setTimeout(resolve as any, 1000));

    // Step 3: Seed Banners
    console.log('📦 Seeding Banners...');
    const banners = [
      {
        id: 'banner_001',
        title: 'Experience our delicious new dish',
        subtitle: '30% OFF',
        imageUrl:
          'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800',
        actionType: 'category',
        actionValue: 'Meal',
        backgroundColor: '#E95322',
        textColor: '#FFFFFF',
        isActive: true,
        order: 1,
        createdAt: firestore.FieldValue.serverTimestamp(),
      },
      {
        id: 'banner_002',
        title: 'Fresh Breakfast Deals',
        subtitle: 'Starting at $5.99',
        imageUrl:
          'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800',
        actionType: 'category',
        actionValue: 'Meal',
        backgroundColor: '#F5CB58',
        textColor: '#391713',
        isActive: true,
        order: 2,
        createdAt: firestore.FieldValue.serverTimestamp(),
      },
      {
        id: 'banner_003',
        title: 'Sweet Treats All Day',
        subtitle: 'Buy 2 Get 1 Free',
        imageUrl:
          'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=800',
        actionType: 'category',
        actionValue: 'Dessert',
        backgroundColor: '#FF9800',
        textColor: '#FFFFFF',
        isActive: true,
        order: 3,
        createdAt: firestore.FieldValue.serverTimestamp(),
      },
    ];

    for (const banner of banners) {
      await firestore().collection('banners').doc(banner.id).set(banner);
      await new Promise(resolve => setTimeout(resolve as any, 300));
    }
    console.log('✅ Banners seeded');

    await new Promise(resolve => setTimeout(resolve as any, 1000));

    // Step 4: Seed Recommended
    console.log('📦 Seeding Recommended...');
    const recommended = [
      {
        id: 'rec_001',
        name: 'Chicken Burger',
        description: 'Grilled chicken with lettuce, tomato, and special sauce',
        price: 10.0,
        imageUrl:
          'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
        rating: 5.0,
        reviewCount: 342,
        category: 'Meal',
        isFavorite: false,
        preparationTime: '15-20 min',
        calories: 520,
        order: 1,
        createdAt: firestore.FieldValue.serverTimestamp(),
      },
      {
        id: 'rec_002',
        name: 'Fresh Spring Rolls',
        description: 'Vietnamese rice paper rolls with shrimp and vegetables',
        price: 25.0,
        imageUrl:
          'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400',
        rating: 5.0,
        reviewCount: 198,
        category: 'Meal',
        isFavorite: false,
        preparationTime: '10-15 min',
        calories: 180,
        order: 2,
        createdAt: firestore.FieldValue.serverTimestamp(),
      },
      {
        id: 'rec_003',
        name: 'Caesar Salad',
        description: 'Crispy romaine lettuce with parmesan and croutons',
        price: 15.0,
        imageUrl:
          'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400',
        rating: 4.8,
        reviewCount: 167,
        category: 'Vegan',
        isFavorite: false,
        preparationTime: '8-10 min',
        calories: 220,
        order: 3,
        createdAt: firestore.FieldValue.serverTimestamp(),
      },
      {
        id: 'rec_004',
        name: 'Iced Latte',
        description: 'Cold brew coffee with fresh milk',
        price: 8.5,
        imageUrl:
          'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400',
        rating: 4.9,
        reviewCount: 289,
        category: 'Drinks',
        isFavorite: false,
        preparationTime: '5 min',
        calories: 120,
        order: 4,
        createdAt: firestore.FieldValue.serverTimestamp(),
      },
    ];

    for (const item of recommended) {
      await firestore().collection('recommended').doc(item.id).set(item);
      await new Promise(resolve => setTimeout(resolve as any, 300));
    }
    console.log('✅ Recommended items seeded');

    console.log('🎉 All home data seeded successfully!');
    return { success: true };
  } catch (error: any) {
    console.error('❌ Error seeding home data:', error);
    console.error('Error details:', error.message);
    throw error;
  }
};
