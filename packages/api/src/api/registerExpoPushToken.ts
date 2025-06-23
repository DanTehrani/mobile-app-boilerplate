import prisma from '../lib/prisma';
import { RegisterExpoPushTokenRequestBody } from '../rpcTypes';

const registerExpoPushToken = async (
  input: RegisterExpoPushTokenRequestBody & { userId: string }
) => {
  await prisma.user.update({
    where: {
      id: input.userId,
    },
    data: {
      notificationToken: input.token,
    },
  });
};

export default registerExpoPushToken;
