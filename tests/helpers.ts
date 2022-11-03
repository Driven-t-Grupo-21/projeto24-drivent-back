import * as jwt from 'jsonwebtoken';
import { User } from '@prisma/client';

import { createUser } from './factories';
import { createSession } from './factories/sessions-factory';
import { prisma } from '@/config';

export async function cleanDb() {
  await prisma.$transaction([
    prisma.$executeRaw`TRUNCATE TABLE "Event" RESTART IDENTITY CASCADE`,
    prisma.$executeRaw`TRUNCATE TABLE "Ticket" RESTART IDENTITY CASCADE`,
    prisma.$executeRaw`TRUNCATE TABLE "Enrollment" RESTART IDENTITY CASCADE`,
    prisma.$executeRaw`TRUNCATE TABLE "Session" RESTART IDENTITY CASCADE`,
    prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`,
    prisma.$executeRaw`TRUNCATE TABLE "Address" RESTART IDENTITY CASCADE`,
  ]);

 console.log(await prisma.ticket.findFirst()) 
}

export async function generateValidToken(user?: User) {
  const incomingUser = user || (await createUser());
  const token = jwt.sign({ userId: incomingUser.id }, process.env.JWT_SECRET);

  await createSession(token);

  return token;
}
