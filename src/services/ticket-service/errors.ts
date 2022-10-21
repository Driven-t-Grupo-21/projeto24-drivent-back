import { ApplicationError } from '@/protocols';

export function invalidSubscriptionError(): ApplicationError {
  return {
    name: 'InvalidSubscriptionError',
    message: 'User not subscribed in the event',
  };
}