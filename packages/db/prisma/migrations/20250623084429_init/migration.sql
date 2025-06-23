-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "notificationToken" TEXT,
    "notificationEnabled" BOOLEAN NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
