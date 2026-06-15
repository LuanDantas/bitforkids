import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '@/contexts/UserContext';
import { studyData } from '@/data/studyModules';
import { progressApi } from '@/services/api/progress';

const STORAGE_KEY = '@bitforkids_study_progress';

interface CourseProgress {
  completedLessons: string[]; // "moduleId-lessonId"
  lastModule: string;
  lastLesson: string;
}

interface StudyContextType {
  getProgress: (courseId: number) => CourseProgress;
  markLessonComplete: (courseId: number, moduleId: string, lessonId: string) => void;
  getModuleProgress: (courseId: number, moduleId: string) => { completed: number; total: number };
  getCourseProgress: (courseId: number) => number; // 0-100 percentage
  isModuleUnlocked: (courseId: number, moduleId: string) => boolean;
  isLessonComplete: (courseId: number, moduleId: string, lessonId: string) => boolean;
  /** Sincroniza o progresso do curso com o servidor (mescla as conclusões). */
  syncCourse: (courseId: number) => Promise<void>;
}

type AllProgress = Record<string, Record<number, CourseProgress>>;

const defaultCourseProgress: CourseProgress = {
  completedLessons: [],
  lastModule: '',
  lastLesson: '',
};

const StudyContext = createContext<StudyContextType | undefined>(undefined);

export function StudyProvider({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated } = useUser();
  const [allProgress, setAllProgress] = useState<AllProgress>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const allProgressRef = useRef(allProgress);
  allProgressRef.current = allProgress;

  const userKey = user?.email ?? '';

  // Load progress from AsyncStorage on mount / user change
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          setAllProgress(JSON.parse(raw));
        }
      } catch {
        // ignore read errors
      }
      setIsLoaded(true);
    })();
  }, []);

  // Persist whenever allProgress changes (after initial load)
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!isLoaded) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress)).catch(() => {});
  }, [allProgress, isLoaded]);

  // ── helpers ───────────────────────────────────

  const getProgress = useCallback(
    (courseId: number): CourseProgress => {
      return allProgress[userKey]?.[courseId] ?? defaultCourseProgress;
    },
    [allProgress, userKey],
  );

  const markLessonComplete = useCallback(
    (courseId: number, moduleId: string, lessonId: string) => {
      // Persiste no servidor (best-effort; ignora erros/offline/sem matrícula).
      if (isAuthenticated) {
        progressApi.completeLesson(courseId, lessonId).catch(() => {});
      }
      setAllProgress((prev) => {
        const userProgress = prev[userKey] ?? {};
        const course = userProgress[courseId] ?? { ...defaultCourseProgress, completedLessons: [] };
        const key = `${moduleId}-${lessonId}`;

        if (course.completedLessons.includes(key)) {
          // already marked – just update position
          return {
            ...prev,
            [userKey]: {
              ...userProgress,
              [courseId]: {
                ...course,
                lastModule: moduleId,
                lastLesson: lessonId,
              },
            },
          };
        }

        return {
          ...prev,
          [userKey]: {
            ...userProgress,
            [courseId]: {
              completedLessons: [...course.completedLessons, key],
              lastModule: moduleId,
              lastLesson: lessonId,
            },
          },
        };
      });
    },
    [userKey, isAuthenticated],
  );

  // Mescla o progresso do servidor no estado local (sem sobrescrever conclusões locais).
  const syncCourse = useCallback(
    async (courseId: number) => {
      if (!isAuthenticated) return;
      const serverKeys = await progressApi.fetchCompletedKeys(courseId);
      if (serverKeys.length === 0) return;
      setAllProgress((prev) => {
        const userProgress = prev[userKey] ?? {};
        const course =
          userProgress[courseId] ?? { ...defaultCourseProgress, completedLessons: [] };
        const merged = Array.from(
          new Set([...course.completedLessons, ...serverKeys]),
        );
        if (merged.length === course.completedLessons.length) return prev;
        return {
          ...prev,
          [userKey]: {
            ...userProgress,
            [courseId]: { ...course, completedLessons: merged },
          },
        };
      });
    },
    [userKey, isAuthenticated],
  );

  const getModuleProgress = useCallback(
    (courseId: number, moduleId: string): { completed: number; total: number } => {
      const courseData = studyData.find((c) => c.courseId === courseId);
      const moduleData = courseData?.modules.find((m) => m.id === moduleId);
      if (!moduleData) return { completed: 0, total: 0 };

      const progress = allProgress[userKey]?.[courseId] ?? defaultCourseProgress;
      const total = moduleData.lessons.length;
      const completed = moduleData.lessons.filter((l) =>
        progress.completedLessons.includes(`${moduleId}-${l.id}`),
      ).length;

      return { completed, total };
    },
    [allProgress, userKey],
  );

  const getCourseProgress = useCallback(
    (courseId: number): number => {
      const courseData = studyData.find((c) => c.courseId === courseId);
      if (!courseData) return 0;

      const progress = allProgress[userKey]?.[courseId] ?? defaultCourseProgress;
      const totalLessons = courseData.modules.reduce((sum, m) => sum + m.lessons.length, 0);
      if (totalLessons === 0) return 0;

      const completedCount = progress.completedLessons.length;
      return Math.round((completedCount / totalLessons) * 100);
    },
    [allProgress, userKey],
  );

  const isModuleUnlocked = useCallback(
    (courseId: number, moduleId: string): boolean => {
      const courseData = studyData.find((c) => c.courseId === courseId);
      if (!courseData) return false;

      const moduleIndex = courseData.modules.findIndex((m) => m.id === moduleId);
      // First module is always unlocked
      if (moduleIndex <= 0) return true;

      // Check if ALL lessons of the previous module are complete
      const prevModule = courseData.modules[moduleIndex - 1];
      const progress = allProgress[userKey]?.[courseId] ?? defaultCourseProgress;

      return prevModule.lessons.every((l) =>
        progress.completedLessons.includes(`${prevModule.id}-${l.id}`),
      );
    },
    [allProgress, userKey],
  );

  const isLessonComplete = useCallback(
    (courseId: number, moduleId: string, lessonId: string): boolean => {
      const progress = allProgress[userKey]?.[courseId] ?? defaultCourseProgress;
      return progress.completedLessons.includes(`${moduleId}-${lessonId}`);
    },
    [allProgress, userKey],
  );

  if (!isLoaded) return null;

  return (
    <StudyContext.Provider
      value={{
        getProgress,
        markLessonComplete,
        getModuleProgress,
        getCourseProgress,
        isModuleUnlocked,
        isLessonComplete,
        syncCourse,
      }}
    >
      {children}
    </StudyContext.Provider>
  );
}

export function useStudy() {
  const context = useContext(StudyContext);
  if (!context) {
    throw new Error('useStudy must be used within a StudyProvider');
  }
  return context;
}
