/* eslint-disable @typescript-eslint/no-unused-vars */
import { firestore } from '../../../config/firebase';

/**
 * This script seeds one example food brand dynamic tab to Firestore
 * Run once, then delete this file
 */

export const seedDynamicTab = async () => {
  try {
    console.log('🌱 Starting to seed dynamic tab data...');

    const tabId = 'tab_mcdonalds_001';

    // Step 1: Delete existing tab if it exists
    console.log('🗑️ Cleaning up existing data...');
    try {
      await firestore().collection('dynamicTabs').doc(tabId).delete();
      await firestore().collection('dynamicTabData').doc(tabId).delete();
      console.log('Cleanup done');
    } catch (e) {
      console.log('No existing data to clean up');
    }

    // Wait a bit
    await new Promise(resolve => setTimeout(resolve as any, 1000));

    // Step 2: Create dynamic tab
    console.log('📝 Creating dynamic tab...');
    await firestore().collection('dynamicTabs').doc(tabId).set({
      name: "McDonald's",
      icon: 'food',
      isActive: true,
      order: 3,
      createdAt: firestore.FieldValue.serverTimestamp(),
      updatedAt: firestore.FieldValue.serverTimestamp(),
    });

    console.log("✅ Dynamic tab created: McDonald's");

    // Wait before next write
    await new Promise(resolve => setTimeout(resolve as any, 1500));

    // Step 3: Create dynamic tab data - SIMPLE VERSION FIRST
    console.log('📦 Creating dynamic tab data (simple)...');

    await firestore().collection('dynamicTabData').doc(tabId).set({
      brandId: tabId,
      brandName: "McDonald's",
      description: "I'm Lovin' It",
      createdAt: firestore.FieldValue.serverTimestamp(),
    });

    console.log("✅ Basic dynamic tab data created for McDonald's");

    // Wait
    await new Promise(resolve => setTimeout(resolve as any, 1000));

    // Step 4: Update with metadata
    console.log('📦 Adding metadata...');
    await firestore()
      .collection('dynamicTabData')
      .doc(tabId)
      .update({
        metadata: {
          backgroundColor: '#FFC72C',
          textColor: '#DA291C',
          accentColor: '#DA291C',
        },
      });

    console.log('✅ Metadata added');

    // Wait
    await new Promise(resolve => setTimeout(resolve as any, 1000));

    // Step 5: Add banners
    console.log('📦 Adding banners...');
    await firestore()
      .collection('dynamicTabData')
      .doc(tabId)
      .update({
        banners: [
          {
            id: 'banner_001',
            imageUrl:
              'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800',
            title: 'New Big Mac Combo',
            subtitle: 'Starting at $7.99',
            order: 1,
            isActive: true,
          },
        ],
      });

    console.log('✅ Banners added');

    // Wait
    await new Promise(resolve => setTimeout(resolve as any, 1000));

    // Step 6: Add categories
    console.log('📦 Adding categories...');
    await firestore()
      .collection('dynamicTabData')
      .doc(tabId)
      .update({
        categories: [
          {
            id: 'cat_001',
            name: 'Burgers',
            imageUrl:
              'https://images.unsplash.com/photo-1550547660-d9450f859349?w=300',
            productCount: 12,
            order: 1,
          },
          {
            id: 'cat_002',
            name: 'Sides',
            imageUrl:
              'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=300',
            productCount: 15,
            order: 2,
          },
        ],
      });

    console.log('✅ Categories added');

    // Wait
    await new Promise(resolve => setTimeout(resolve as any, 1000));

    // Step 7: Add products
    console.log('📦 Adding products...');
    await firestore()
      .collection('dynamicTabData')
      .doc(tabId)
      .update({
        products: [
          {
            id: 'prod_001',
            name: 'Big Mac',
            description: 'Two all-beef patties',
            price: 5.99,
            originalPrice: 6.99,
            discount: 14,
            imageUrl:
              'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400',
            category: 'Burgers',
            inStock: true,
            stockCount: 100,
            rating: 4.5,
            reviewCount: 1234,
          },
          {
            id: 'prod_002',
            name: 'Medium Fries',
            description: 'World Famous Fries',
            price: 2.79,
            imageUrl:
              'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=400',
            category: 'Sides',
            inStock: true,
            stockCount: 200,
            rating: 4.8,
            reviewCount: 2345,
          },
        ],
      });

    console.log('✅ Products added');

    // Wait
    await new Promise(resolve => setTimeout(resolve as any, 1000));

    // Step 8: Add featured
    console.log('📦 Adding featured...');
    await firestore()
      .collection('dynamicTabData')
      .doc(tabId)
      .update({
        featured: {
          newArrivals: ['prod_001'],
          bestSellers: ['prod_001', 'prod_002'],
          deals: ['prod_001'],
        },
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });

    console.log('✅ Featured added');

    // Wait
    await new Promise(resolve => setTimeout(resolve as any, 1000));

    // Verify the data was written
    const verifyDoc = await firestore()
      .collection('dynamicTabData')
      .doc(tabId)
      .get();

    if (verifyDoc.exists()) {
      console.log('✅ VERIFIED: Document exists in dynamicTabData');
      const data = verifyDoc.data();
      console.log('Document has fields:', Object.keys(data || {}));
    } else {
      console.error('❌ ERROR: Document was not created!');
    }

    console.log('🎉 Seeding complete!');
    console.log(`✅ Created tab ID: ${tabId}`);

    return { success: true, tabId, verified: verifyDoc.exists };
  } catch (error: any) {
    console.error('❌ Error seeding dynamic tab:', error);
    console.error('Error details:', error.message);
    if (error.code) {
      console.error('Error code:', error.code);
    }
    throw error;
  }
};

// For testing purposes - you can call this directly
// seedDynamicTab();
