import activitiesService from '@/services/activities-service';
import { Request, Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import httpStatus from 'http-status';

export async function getActivitiesDate(req: AuthenticatedRequest, res: Response) {
  const { userId } = req
  const dates = await activitiesService.getActivitiesDates(userId);

  res.status(httpStatus.OK).send(dates);
}

export async function getActivitiesByDate(req: AuthenticatedRequest, res: Response) {
  const { date } = req.params;
  const { userId } = req

  const activities = await activitiesService.getAllActivitiesByDate(date, userId);

  res.status(httpStatus.OK).send(activities);
}

export async function postActivityBook(req: AuthenticatedRequest, res: Response) {
  const { activityId } = req.params;
  const { userId } = req

  await activitiesService.postActivityBook(+userId, +activityId)

  res.sendStatus(200)

}

