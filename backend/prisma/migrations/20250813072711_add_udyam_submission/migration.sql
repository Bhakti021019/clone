/*
  Warnings:

  - You are about to drop the `Registration` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Registration";

-- CreateTable
CREATE TABLE "udyamSubmission" (
    "id" SERIAL NOT NULL,
    "aadhaar" TEXT NOT NULL,
    "pan" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "udyamSubmission_pkey" PRIMARY KEY ("id")
);
