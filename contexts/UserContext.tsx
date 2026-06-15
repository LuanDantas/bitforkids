import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  email: string;
  name: string;
  role: 'user' | 'root';
  purchasedCourses: number[];
}

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  hasCourseAccess: (courseId: number) => boolean;
  purchaseCourse: (courseId: number) => void;
}

const STORAGE_KEY = '@bitforkids_user';
const PURCHASES_KEY = '@bitforkids_purchases';

// Mock users database
const MOCK_USERS: Record<string, { password: string; user: Omit<User, 'purchasedCourses'> }> = {
  'root@bitforkids.com': {
    password: 'root123',
    user: {
      email: 'root@bitforkids.com',
      name: 'Dani Spitaletti',
      role: 'root',
    },
  },
  'teste@bitforkids.com': {
    password: 'admin123',
    user: {
      email: 'teste@bitforkids.com',
      name: 'João Silva',
      role: 'user',
    },
  },
  'luandr92@gmail.com': {
    password: 'admin123',
    user: {
      email: 'luandr92@gmail.com',
      name: 'Luan Dantas',
      role: 'root',
    },
  },
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Restore session on boot
  useEffect(() => {
    (async () => {
      try {
        const [savedUser, savedPurchases] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEY),
          AsyncStorage.getItem(PURCHASES_KEY),
        ]);
        if (savedUser) {
          const parsed = JSON.parse(savedUser) as User;
          const purchases = savedPurchases ? JSON.parse(savedPurchases) : [];
          setUser({ ...parsed, purchasedCourses: parsed.role === 'root' ? [1, 2, 3] : purchases });
        }
      } catch {}
      setIsLoaded(true);
    })();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const normalizedEmail = email.toLowerCase().trim();
    const mockUser = MOCK_USERS[normalizedEmail];

    if (!mockUser || mockUser.password !== password) {
      return { success: false, error: 'invalid_credentials' };
    }

    // Load purchased courses for this user
    let purchases: number[] = [];
    try {
      const saved = await AsyncStorage.getItem(`${PURCHASES_KEY}_${normalizedEmail}`);
      if (saved) purchases = JSON.parse(saved);
    } catch {}

    const fullUser: User = {
      ...mockUser.user,
      purchasedCourses: mockUser.user.role === 'root' ? [1, 2, 3] : purchases,
    };

    setUser(fullUser);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(fullUser));
    return { success: true };
  }, []);

  const logout = useCallback(async () => {
    setUser(null);
    await AsyncStorage.removeItem(STORAGE_KEY);
  }, []);

  const hasCourseAccess = useCallback(
    (courseId: number): boolean => {
      if (!user) return false;
      if (user.role === 'root') return true;
      return user.purchasedCourses.includes(courseId);
    },
    [user]
  );

  const purchaseCourse = useCallback(
    async (courseId: number) => {
      if (!user) return;
      if (user.purchasedCourses.includes(courseId)) return;

      const updated: User = {
        ...user,
        purchasedCourses: [...user.purchasedCourses, courseId],
      };
      setUser(updated);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      await AsyncStorage.setItem(
        `${PURCHASES_KEY}_${user.email}`,
        JSON.stringify(updated.purchasedCourses)
      );
    },
    [user]
  );

  if (!isLoaded) return null;

  return (
    <UserContext.Provider
      value={{ user, isAuthenticated: !!user, login, logout, hasCourseAccess, purchaseCourse }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
