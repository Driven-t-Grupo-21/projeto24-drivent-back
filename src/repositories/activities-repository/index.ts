import { prisma } from '@/config';

async function findActivitiesDate() {
  return prisma.activities.groupBy({
    by: ['activityDate'],
  });
}

async function getAllLocals() {
  return await prisma.locations.findMany();
}

async function findActivitiesByDate(date: any, localId: any) {
  return await prisma.activities.findMany({
    where: {
      activityDate: date,
      localId,
    },
    orderBy: {
      startsAt: 'asc',
    },
    select: {
      id: true,
      description: true,
      startsAt: true,
      endsAt: true,
      vacancies: true,
      ActivitiesOrder: true
    },
  });
}

async function findActivitiesByUserId(userId: number) {
  return await prisma.activitiesOrder.findMany({
    where: {
      userId
    },
    select: {
      id: true,
      userId: true,
      activityInfosId: true,
      activityInfo: true
     }
  })
}

async function findActivitiesById(id: number) {
  return await prisma.activities.findUnique({
    where: {
      id
    },
    select: {
      id: true,
      localId: true,
      activityDate: true,
      description: true,
      startsAt: true,
      endsAt: true,
      vacancies: true,
      ActivitiesOrder: true
    }
  })
}

async function createActivityOrder(userId: number, activityId: number) {
  return await prisma.activitiesOrder.create({
    data: {
      userId,
      activityInfosId: activityId
    }
  })
}

async function updateActivityVacancy(activityId: number) {
  const activity = await prisma.activities.findUnique({
    where: {
      id: activityId
    },
    select: {
      vacancies: true,
      ActivitiesOrder: true
    }
  })

  return await prisma.activities.update({
    where: {
      id: activityId
    }, 
    data: {
      vacancies:  activity.vacancies - activity.ActivitiesOrder.length
    }
  })
}

const activitiesRepository = {
  findActivitiesDate,
  getAllLocals,
  findActivitiesByDate,
  findActivitiesByUserId,
  findActivitiesById,
  createActivityOrder,
  updateActivityVacancy
};

export default activitiesRepository;
