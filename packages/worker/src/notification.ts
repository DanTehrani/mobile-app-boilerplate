import prisma from './prisma';
import { Expo, ExpoPushMessage } from 'expo-server-sdk';
import { EXPO_ACCESS_TOKEN } from './envVars';

const expo = new Expo({
  accessToken: EXPO_ACCESS_TOKEN,
});

const sendNotifications = async () => {
  const users = await prisma.user.findMany({
    where: {
      notificationToken: {
        not: null,
      },
    },
    select: {
      notificationToken: true,
    },
  });

  const messages = users.map(user => ({
    to: user.notificationToken,
    title: 'Hey',
    body: "Don't forget this app exists",
  })) as ExpoPushMessage[];

  const chunks = expo.chunkPushNotifications(messages);

  for (const chunk of chunks) {
    await expo.sendPushNotificationsAsync(chunk);
  }
};

export default sendNotifications;
