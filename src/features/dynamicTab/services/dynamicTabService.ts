import { firestore } from '../../../config/firebase';

export interface DynamicTab {
  id: string;
  name: string;
  icon: string;
  isActive: boolean;
  order: number;
}

export interface DynamicTabData {
  brandId: string;
  brandName: string;
  description?: string;
  metadata?: {
    backgroundColor?: string;
    textColor?: string;
    accentColor?: string;
  };
  banners?: Array<{
    id: string;
    imageUrl: string;
    title: string;
    subtitle: string;
    order: number;
    isActive: boolean;
  }>;
  categories?: Array<{
    id: string;
    name: string;
    imageUrl: string;
    productCount: number;
    order: number;
  }>;
  products?: Array<{
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    imageUrl: string;
    category: string;
    inStock: boolean;
    stockCount?: number;
    rating?: number;
    reviewCount?: number;
  }>;
  featured?: {
    newArrivals?: string[];
    bestSellers?: string[];
    deals?: string[];
  };
}

export const dynamicTabService = {
  // Fetch active dynamic tab
  getActiveDynamicTab: async (): Promise<DynamicTab | null> => {
    try {
      const snapshot = await firestore()
        .collection('dynamicTabs')
        .where('isActive', '==', true)
        .limit(1)
        .get();

      if (snapshot.empty) {
        return null;
      }

      const doc = snapshot.docs[0];
      return {
        id: doc.id,
        ...doc.data(),
      } as DynamicTab;
    } catch (error) {
      console.error('Error fetching dynamic tab:', error);
      return null;
    }
  },

  // Fetch dynamic tab data by ID
  getDynamicTabData: async (tabId: string): Promise<DynamicTabData | null> => {
    try {
      const doc = await firestore()
        .collection('dynamicTabData')
        .doc(tabId)
        .get();

      if (!doc.exists) {
        console.log('Document does not exist:', tabId);
        return null;
      }

      const data = doc.data() as DynamicTabData;
      console.log('Fetched data:', data);
      return data;
    } catch (error) {
      console.error('Error fetching dynamic tab data:', error);
      return null;
    }
  },
};
