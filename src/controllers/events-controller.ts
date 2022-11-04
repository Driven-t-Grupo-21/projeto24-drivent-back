import eventsService from '@/services/events-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { createClient } from 'redis';

const redis = createClient();

redis.connect();

export async function getDefaultEvent(_req: Request, res: Response) {
  const cacheKey = 'events';
  const cacheExpiration = 10000;

  try {
    const cachedEvents = await redis.get(cacheKey);
    if (cachedEvents) {
      res.status(httpStatus.OK).send(JSON.parse(cachedEvents));
    } else {
      const event = await eventsService.getFirstEvent();

      redis.setEx(cacheKey, cacheExpiration, JSON.stringify(event));

      return res.status(httpStatus.OK).send(event);
    }
  } catch (error) {
    console.log(error);
  }
}

export default redis;