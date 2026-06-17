import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { Platform } from 'react-native';
import { authApi } from '@/services/api/auth';
import { coursesApi } from '@/services/api/courses';
import { paymentsApi } from '@/services/api/payments';
import { tokenStore } from '@/services/api/tokenStore';
import { onSessionExpired, ApiError } from '@/services/api/client';
import type { ApiUser } from '@/services/api/types';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'root';
  purchasedCourses: number[];
}

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  register: (
    email: string,
    password: string,
    name: string,
    phone?: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  hasCourseAccess: (courseId: number) => boolean;
  purchaseCourse: (courseId: number) => Promise<void>;
  refreshAccess: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Modo-prévia (admin /pages): apenas no web e somente na rota /preview. Injeta
// uma sessão fictícia com acesso total para que telas atrás de login/paywall
// (study, courseDetail, etc.) renderizem. Sem qualquer efeito no app nativo.
function isPreviewMode(): boolean {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return false;
  return /\/preview(\/|$)/.test(window.location.pathname);
}

const PREVIEW_USER: User = {
  id: 'preview',
  email: 'preview@bitforkids.com',
  name: 'Prévia',
  role: 'root',
  purchasedCourses: [1, 2, 3],
};

/** Mapeia o usuário da API para o formato consumido pelas telas. */
function mapRole(role: ApiUser['role']): 'user' | 'root' {
  return role === 'ROOT' || role === 'ADMIN' ? 'root' : 'user';
}

async function loadPurchasedCourses(role: 'user' | 'root'): Promise<number[]> {
  // Root/admin têm acesso total — não precisa listar matrículas.
  if (role === 'root') return [1, 2, 3];
  try {
    const enrollments = await coursesApi.myEnrollments();
    return enrollments
      .filter((e) => e.status === 'ACTIVE')
      .map((e) => e.course?.legacyId)
      .filter((id): id is number => typeof id === 'number');
  } catch {
    return [];
  }
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(
    isPreviewMode() ? PREVIEW_USER : null
  );
  const [isLoaded, setIsLoaded] = useState(false);

  const buildUser = useCallback(async (apiUser: ApiUser): Promise<User> => {
    const role = mapRole(apiUser.role);
    const purchasedCourses = await loadPurchasedCourses(role);
    return {
      id: apiUser.id,
      email: apiUser.email,
      name: apiUser.name,
      role,
      purchasedCourses,
    };
  }, []);

  // Restaura sessão a partir do token salvo.
  useEffect(() => {
    if (isPreviewMode()) {
      setIsLoaded(true);
      return;
    }
    (async () => {
      try {
        const tokens = await tokenStore.load();
        if (tokens) {
          const apiUser = await authApi.me();
          setUser(await buildUser(apiUser));
        }
      } catch {
        await tokenStore.clear();
      }
      setIsLoaded(true);
    })();
  }, [buildUser]);

  // Encerra a sessão localmente se o refresh falhar no servidor.
  useEffect(() => {
    return onSessionExpired(() => setUser(null));
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const res = await authApi.login(email.trim(), password);
        setUser(await buildUser(res.user));
        return { success: true };
      } catch (err) {
        const status = err instanceof ApiError ? err.status : 0;
        return {
          success: false,
          error: status === 401 ? 'invalid_credentials' : 'network_error',
        };
      }
    },
    [buildUser]
  );

  const register = useCallback(
    async (email: string, password: string, name: string, phone?: string) => {
      try {
        const res = await authApi.register(email.trim(), password, name, phone);
        setUser(await buildUser(res.user));
        return { success: true };
      } catch (err) {
        const message = err instanceof ApiError ? err.message : 'network_error';
        return { success: false, error: message };
      }
    },
    [buildUser]
  );

  const logout = useCallback(async () => {
    await authApi.logout();
    setUser(null);
  }, []);

  const refreshAccess = useCallback(async () => {
    if (!user) return;
    const purchasedCourses = await loadPurchasedCourses(user.role);
    setUser((prev) => (prev ? { ...prev, purchasedCourses } : prev));
  }, [user]);

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
      const uuid = await coursesApi.resolveId(courseId);
      if (!uuid) return;
      // Checkout real: cria Transaction + Enrollment + Cashback (gateway stub).
      await paymentsApi.checkout(uuid);
      setUser((prev) =>
        prev
          ? {
              ...prev,
              purchasedCourses: [...prev.purchasedCourses, courseId],
            }
          : prev
      );
    },
    [user]
  );

  if (!isLoaded) return null;

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        hasCourseAccess,
        purchaseCourse,
        refreshAccess,
      }}
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
