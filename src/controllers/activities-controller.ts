import activitiesService from '@/services/activities-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function getActivities(req: Request, res: Response) {
  const activities = await activitiesService.getAllActivities();

  res.status(httpStatus.OK).send(activities);
}
