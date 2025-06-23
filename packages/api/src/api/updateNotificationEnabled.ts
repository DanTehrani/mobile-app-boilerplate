import prisma from '../lib/prisma';
import { UpdateNotificationEnabledRequestBody } from '../rpcTypes';
import { AuthedRequestBody } from '../types';

const updateNotificationEnabled = async (
  input: AuthedRequestBody<UpdateNotificationEnabledRequestBody>
) => {
  await prisma.user.update({
    where: {
      id: input.userId,
    },
    data: {
      notificationEnabled: input.enabled,
    },
  });
};

export default updateNotificationEnabled;
