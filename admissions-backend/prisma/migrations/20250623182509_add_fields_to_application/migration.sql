/*
  Warnings:

  - You are about to drop the column `email` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Application` table. All the data in the column will be lost.
  - Added the required column `academicTerm` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `academicYear` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dob` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `englishTest` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `familyName` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `givenName` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nationality` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `signed` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stateProvince` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `streetAddress` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `testScore` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Application" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "givenName" TEXT NOT NULL,
    "familyName" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "dob" DATETIME NOT NULL,
    "phone" TEXT NOT NULL,
    "streetAddress" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "stateProvince" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postalCode" TEXT,
    "academicTerm" TEXT NOT NULL,
    "academicYear" INTEGER NOT NULL,
    "englishTest" TEXT NOT NULL,
    "other" TEXT,
    "testScore" INTEGER NOT NULL,
    "gpa" REAL NOT NULL,
    "transcriptFileName" TEXT,
    "idFileName" TEXT,
    "testResultFileName" TEXT,
    "signed" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "submittedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Application" ("gpa", "id", "idFileName", "status", "submittedAt") SELECT "gpa", "id", "idFileName", "status", "submittedAt" FROM "Application";
DROP TABLE "Application";
ALTER TABLE "new_Application" RENAME TO "Application";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
