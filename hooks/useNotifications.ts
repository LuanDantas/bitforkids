import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export interface NotificationData {
  id: string;
  title: string;
  body: string;
  data?: any;
  scheduledTime?: Date;
}

export const useNotifications = () => {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [notification, setNotification] =
    useState<Notifications.Notification | null>(null);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      if (token) {
        setExpoPushToken(token);
      }
    });

    // Listen for notifications
    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log('Notification response:', response);
      });

    return () => {
      // Cleanup is handled automatically by Expo
    };
  }, []);

  const scheduleBitcoinPriceNotification = async (
    price: number,
    variation: number
  ) => {
    const title = 'Bitcoin Price Alert';
    const body =
      variation > 0
        ? `📈 Bitcoin subiu ${variation.toFixed(
            2
          )}% - Agora R$ ${price.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
          })}`
        : `📉 Bitcoin caiu ${Math.abs(variation).toFixed(
            2
          )}% - Agora R$ ${price.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
          })}`;

    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data: { price, variation, type: 'bitcoin_price' },
      },
      trigger: null, // Send immediately
    });
  };

  const scheduleDailyBitcoinPrice = async (
    price: number,
    isMorning: boolean = true
  ) => {
    const title = isMorning
      ? '🌅 Preço do Bitcoin - Manhã'
      : '🌙 Preço do Bitcoin - Noite';
    const body = `Bitcoin está cotado a R$ ${price.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
    })}`;

    // Schedule for next day at 8 AM or 8 PM
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(isMorning ? 8 : 20, 0, 0, 0);

    const secondsFromNow = Math.floor((tomorrow.getTime() - Date.now()) / 1000);

    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data: {
          price,
          type: 'daily_bitcoin_price',
          time: isMorning ? 'morning' : 'evening',
        },
      },
      trigger: null, // Send immediately for testing
    });
  };

  const scheduleBitcoinMotivation = async () => {
    const motivations = [
      '💡 Bitcoin é liberdade financeira! Invista no seu futuro hoje.',
      '🚀 Não espere o momento perfeito. O momento é agora!',
      '💰 Cada satoshi conta. Comece sua jornada Bitcoin hoje.',
      '🔒 Bitcoin é a reserva de valor do futuro. Seja parte dele.',
      '⚡ Liberte-se do sistema bancário tradicional com Bitcoin.',
      '🎯 Diversifique seu portfólio com Bitcoin e proteja seu patrimônio.',
      '🌟 Bitcoin não é apenas uma moeda, é uma revolução.',
      '💎 HODL com sabedoria. Bitcoin é para o longo prazo.',
      '🌍 Bitcoin conecta o mundo sem fronteiras bancárias.',
      '🔥 Cada dia sem Bitcoin é um dia perdido na revolução financeira.',
    ];

    const randomMotivation =
      motivations[Math.floor(Math.random() * motivations.length)];

    // Schedule for tomorrow at 9 AM
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(9, 0, 0, 0);

    const secondsFromNow = Math.floor((tomorrow.getTime() - Date.now()) / 1000);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Motivação Bitcoin',
        body: randomMotivation,
        data: { type: 'bitcoin_motivation' },
      },
      trigger: null, // Send immediately for testing
    });
  };

  const scheduleCourseReminder = async (
    courseTitle: string,
    daysFromNow: number = 1
  ) => {
    const reminderDate = new Date();
    reminderDate.setDate(reminderDate.getDate() + daysFromNow);
    reminderDate.setHours(19, 0, 0, 0); // 7 PM

    const secondsFromNow = Math.floor(
      (reminderDate.getTime() - Date.now()) / 1000
    );

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Lembrete de Curso',
        body: `Não esqueça de continuar assistindo: ${courseTitle}`,
        data: { courseTitle, type: 'course_reminder' },
      },
      trigger: null, // Send immediately for testing
    });
  };

  const cancelAllNotifications = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
  };

  const getScheduledNotifications = async () => {
    return await Notifications.getAllScheduledNotificationsAsync();
  };

  return {
    expoPushToken,
    notification,
    scheduleBitcoinPriceNotification,
    scheduleDailyBitcoinPrice,
    scheduleBitcoinMotivation,
    scheduleCourseReminder,
    cancelAllNotifications,
    getScheduledNotifications,
  };
};

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}
