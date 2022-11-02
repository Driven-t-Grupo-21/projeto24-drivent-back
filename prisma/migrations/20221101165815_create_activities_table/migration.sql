-- CreateTable
CREATE TABLE "Activities" (
    "id" SERIAL NOT NULL,
    "activityDate" TIMESTAMP(3) NOT NULL,
    "activityId" INTEGER NOT NULL,

    CONSTRAINT "Activities_pkey" PRIMARY KEY ("id")
);
