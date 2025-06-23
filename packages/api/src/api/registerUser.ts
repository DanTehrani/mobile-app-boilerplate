import { Prisma } from '@boilerplate/db';
import prisma from '../lib/prisma';
import { RegisterUserRequestBody } from '../rpcTypes';

const registerUser = async (req: RegisterUserRequestBody) => {
  const { userId } = req;

  const data: Prisma.UserCreateInput = {
    id: userId,
    notificationEnabled: false,
  };

  await prisma.user.upsert({
    where: {
      id: userId,
    },
    update: data,
    create: data,
  });
};

export default registerUser;
