import sendNotifications from './notification';

const worker = async () => {
  await sendNotifications();
};

worker();
