import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface VSLContextType {
  shouldShowVSL: boolean;
  showVSLModal: () => void;
  hideVSLModal: () => void;
  dismissVSLForDays: (days: number) => Promise<void>;
  trackVideoProgress: (progress: number) => void;
  trackVSLConversion: (action: 'view' | 'register' | 'purchase') => void;
  isVSLModalVisible: boolean;
  resetSessionFlag: () => Promise<void>; // New function to reset session flag
}

const VSLContext = createContext<VSLContextType | undefined>(undefined);

interface VSLProviderProps {
  children: ReactNode;
}

const VSL_STORAGE_KEYS = {
  LAST_VSL_VIEW: 'last_vsl_view',
  SESSION_COUNT: 'session_count',
  VSL_DISMISSED_UNTIL: 'vsl_dismissed_until',
  USER_SUBSCRIPTION_STATUS: 'user_subscription_status',
  VSL_VIDEO_PROGRESS: 'vsl_video_progress',
  VSL_CONVERSIONS: 'vsl_conversions',
  VSL_SHOWN_THIS_SESSION: 'vsl_shown_this_session', // New key to track if shown in current session
};

const VSL_CONFIG = {
  SESSIONS_BETWEEN_SHOWS: 5,
  DAYS_BETWEEN_SHOWS: 7,
  DISMISS_DAYS: 30,
  SHOW_ONCE_PER_SESSION: true, // New config to show only once per session
};

export function VSLProvider({ children }: VSLProviderProps) {
  const [shouldShowVSL, setShouldShowVSL] = useState(false);
  const [isVSLModalVisible, setIsVSLModalVisible] = useState(false);

  useEffect(() => {
    checkVSLDisplayConditions();
  }, []);

  const checkVSLDisplayConditions = async () => {
    try {
      const [
        lastView,
        sessionCount,
        dismissedUntil,
        subscriptionStatus,
        shownThisSession,
      ] = await Promise.all([
        AsyncStorage.getItem(VSL_STORAGE_KEYS.LAST_VSL_VIEW),
        AsyncStorage.getItem(VSL_STORAGE_KEYS.SESSION_COUNT),
        AsyncStorage.getItem(VSL_STORAGE_KEYS.VSL_DISMISSED_UNTIL),
        AsyncStorage.getItem(VSL_STORAGE_KEYS.USER_SUBSCRIPTION_STATUS),
        AsyncStorage.getItem(VSL_STORAGE_KEYS.VSL_SHOWN_THIS_SESSION),
      ]);

      // Don't show VSL for premium subscribers
      if (subscriptionStatus === 'premium') {
        setShouldShowVSL(false);
        return;
      }

      // Don't show VSL if already shown this session
      if (VSL_CONFIG.SHOW_ONCE_PER_SESSION && shownThisSession === 'true') {
        setShouldShowVSL(false);
        return;
      }

      // Check if VSL is dismissed
      if (dismissedUntil) {
        const dismissDate = new Date(dismissedUntil);
        if (new Date() < dismissDate) {
          setShouldShowVSL(false);
          return;
        }
      }

      const currentDate = new Date();
      const lastViewDate = lastView ? new Date(lastView) : null;
      const currentSessionCount = sessionCount ? parseInt(sessionCount) : 0;

      // Check if enough sessions have passed
      const sessionsPassed =
        currentSessionCount >= VSL_CONFIG.SESSIONS_BETWEEN_SHOWS;

      // Check if enough days have passed
      const daysPassed = lastViewDate
        ? (currentDate.getTime() - lastViewDate.getTime()) /
            (1000 * 60 * 60 * 24) >=
          VSL_CONFIG.DAYS_BETWEEN_SHOWS
        : true;

      if (sessionsPassed || daysPassed) {
        setShouldShowVSL(true);
        // Mark as shown this session
        await AsyncStorage.setItem(
          VSL_STORAGE_KEYS.VSL_SHOWN_THIS_SESSION,
          'true'
        );
        // Increment session count
        await AsyncStorage.setItem(VSL_STORAGE_KEYS.SESSION_COUNT, '0');
      } else {
        setShouldShowVSL(false);
        // Increment session count for next check
        await AsyncStorage.setItem(
          VSL_STORAGE_KEYS.SESSION_COUNT,
          (currentSessionCount + 1).toString()
        );
      }
    } catch (error) {
      console.error('Error checking VSL display conditions:', error);
    }
  };

  const showVSLModal = () => {
    setIsVSLModalVisible(true);
    trackVSLConversion('view');
  };

  const hideVSLModal = () => {
    setIsVSLModalVisible(false);
  };

  const dismissVSLForDays = async (days: number = VSL_CONFIG.DISMISS_DAYS) => {
    try {
      const dismissUntil = new Date();
      dismissUntil.setDate(dismissUntil.getDate() + days);

      await AsyncStorage.setItem(
        VSL_STORAGE_KEYS.VSL_DISMISSED_UNTIL,
        dismissUntil.toISOString()
      );
      setShouldShowVSL(false);
      setIsVSLModalVisible(false);
    } catch (error) {
      console.error('Error dismissing VSL:', error);
    }
  };

  const trackVideoProgress = async (progress: number) => {
    try {
      await AsyncStorage.setItem(
        VSL_STORAGE_KEYS.VSL_VIDEO_PROGRESS,
        progress.toString()
      );
    } catch (error) {
      console.error('Error tracking video progress:', error);
    }
  };

  const trackVSLConversion = async (
    action: 'view' | 'register' | 'purchase'
  ) => {
    try {
      const conversions = await AsyncStorage.getItem(
        VSL_STORAGE_KEYS.VSL_CONVERSIONS
      );
      const conversionData = conversions ? JSON.parse(conversions) : {};

      conversionData[action] = (conversionData[action] || 0) + 1;
      conversionData.lastAction = action;
      conversionData.lastActionDate = new Date().toISOString();

      await AsyncStorage.setItem(
        VSL_STORAGE_KEYS.VSL_CONVERSIONS,
        JSON.stringify(conversionData)
      );

      // Update last view date
      await AsyncStorage.setItem(
        VSL_STORAGE_KEYS.LAST_VSL_VIEW,
        new Date().toISOString()
      );
    } catch (error) {
      console.error('Error tracking VSL conversion:', error);
    }
  };

  const resetSessionFlag = async () => {
    try {
      await AsyncStorage.removeItem(VSL_STORAGE_KEYS.VSL_SHOWN_THIS_SESSION);
    } catch (error) {
      console.error('Error resetting session flag:', error);
    }
  };

  const value: VSLContextType = {
    shouldShowVSL,
    showVSLModal,
    hideVSLModal,
    dismissVSLForDays,
    trackVideoProgress,
    trackVSLConversion,
    isVSLModalVisible,
    resetSessionFlag,
  };

  return <VSLContext.Provider value={value}>{children}</VSLContext.Provider>;
}

export function useVSL() {
  const context = useContext(VSLContext);
  if (context === undefined) {
    throw new Error('useVSL must be used within a VSLProvider');
  }
  return context;
}
