import { ApplicationError } from '@/protocols';

export function notFoundHotelError(message: string): ApplicationError {
  return {
    name: 'NotFoundError',
    message,
  };
}
