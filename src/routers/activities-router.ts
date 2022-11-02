import { authenticateToken } from '@/middlewares';
import { Router } from 'express';

import * as activitiesController from '../controllers/activities-controller';

const activitiesRouter = Router();

activitiesRouter
  .all('/*', authenticateToken)
  .get('/', activitiesController.getActivitiesDate)
  .get('/date', activitiesController.getActivitiesByDate);

export { activitiesRouter };
