import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import {
  dynamicTabService,
  DynamicTab,
} from '../features/dynamicTab/services/dynamicTabService';

interface DynamicTabContextType {
  dynamicTab: DynamicTab | null;
  loading: boolean;
  refreshDynamicTab: () => Promise<void>;
}

const DynamicTabContext = createContext<DynamicTabContextType | undefined>(
  undefined,
);

interface DynamicTabProviderProps {
  children: ReactNode;
}

export const DynamicTabProvider: React.FC<DynamicTabProviderProps> = ({
  children,
}) => {
  const [dynamicTab, setDynamicTab] = useState<DynamicTab | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDynamicTab = async () => {
    try {
      setLoading(true);
      const tab = await dynamicTabService.getActiveDynamicTab();
      setDynamicTab(tab);
    } catch (error) {
      console.error('Error fetching dynamic tab:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDynamicTab();
  }, []);

  const refreshDynamicTab = async () => {
    await fetchDynamicTab();
  };

  return (
    <DynamicTabContext.Provider
      value={{ dynamicTab, loading, refreshDynamicTab }}
    >
      {children}
    </DynamicTabContext.Provider>
  );
};

export const useDynamicTab = (): DynamicTabContextType => {
  const context = useContext(DynamicTabContext);
  if (!context) {
    throw new Error('useDynamicTab must be used within a DynamicTabProvider');
  }
  return context;
};
