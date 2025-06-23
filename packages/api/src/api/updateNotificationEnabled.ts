import prisma from '../lib/prisma';
import { UpdateNotificationEnabledRequestBody } from '../rpcTypes';

const updateNotificationEnabled = async (
  input: UpdateNotificationEnabledRequestBody
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
