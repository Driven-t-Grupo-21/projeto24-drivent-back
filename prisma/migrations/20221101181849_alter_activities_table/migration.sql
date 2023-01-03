-- AddForeignKey
ALTER TABLE "Activities" ADD CONSTRAINT "Activities_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "ActivitiesList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
