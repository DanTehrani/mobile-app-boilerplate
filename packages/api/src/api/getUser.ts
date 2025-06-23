import prisma from '../lib/prisma';

const getNotificationStatus = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      notificationEnabled: true,
      name: true,
    },
  });

  return user;
};

export default getNotificationStatus;
