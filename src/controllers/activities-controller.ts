import activitiesService from '@/services/activities-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function getActivitiesDate(req: Request, res: Response) {
  const dates = await activitiesService.getActivitiesDates();

  res.status(httpStatus.OK).send(dates);
}

export async function getActivitiesByDate(req: Request, res: Response) {
  const { date } = req.params;
  const activities = await activitiesService.getAllActivitiesByDate(date);

  res.status(httpStatus.OK).send(activities);
}
