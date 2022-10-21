import ticketRepository from '@/repositories/ticket-repository';
import { notFoundError } from '@/errors';
import { Ticket } from '@prisma/client';

import enrollmentsService from '../enrollments-service';
import { invalidSubscriptionError } from './errors';

interface Props {
  id: number;
  userId: number;
}

export async function findByEventId(props: Props): Promise<Ticket[]> {
  if (isNaN(props.id)) {
    throw notFoundError();
  }

  await findUserEnrollment(props.userId)

  return ticketRepository.findByEventId(props.id);
}

async function findUserEnrollment(userId: number) {
  try {
    await enrollmentsService.getOneWithAddressByUserId(userId);
    return;
  } catch {
    throw invalidSubscriptionError();
  }
}
