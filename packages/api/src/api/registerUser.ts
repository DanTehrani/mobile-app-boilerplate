import { Prisma } from '@boilerplate/db';
import prisma from '../lib/prisma';
import { RegisterUserRequestBody } from '../rpcTypes';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../lib/envVars';

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

  // Sign JWT with userId
  const token = jwt.sign({ userId }, JWT_SECRET);

  return { token };
};

export default registerUser;
