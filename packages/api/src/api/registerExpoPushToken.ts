import prisma from '../lib/prisma';
import { RegisterExpoPushTokenRequestBody } from '../rpcTypes';
import { AuthedRequestBody } from '../types';

const registerExpoPushToken = async (
  input: AuthedRequestBody<RegisterExpoPushTokenRequestBody>
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
