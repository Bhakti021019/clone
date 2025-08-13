/*
  Warnings:

  - You are about to drop the `UdyamSubmission` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "UdyamSubmission";

-- CreateTable
CREATE TABLE "Registration" (
    "id" SERIAL NOT NULL,
    "aadhaar" TEXT NOT NULL,
    "pan" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,

    CONSTRAINT "Registration_pkey" PRIMARY KEY ("id")
);
