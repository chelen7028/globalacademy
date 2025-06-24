/*
  Warnings:

  - Added the required column `program` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Application" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "program" TEXT NOT NULL,
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
INSERT INTO "new_Application" ("academicTerm", "academicYear", "city", "country", "dob", "englishTest", "familyName", "gender", "givenName", "gpa", "id", "idFileName", "nationality", "other", "phone", "postalCode", "signed", "stateProvince", "status", "streetAddress", "submittedAt", "testResultFileName", "testScore", "transcriptFileName") SELECT "academicTerm", "academicYear", "city", "country", "dob", "englishTest", "familyName", "gender", "givenName", "gpa", "id", "idFileName", "nationality", "other", "phone", "postalCode", "signed", "stateProvince", "status", "streetAddress", "submittedAt", "testResultFileName", "testScore", "transcriptFileName" FROM "Application";
DROP TABLE "Application";
ALTER TABLE "new_Application" RENAME TO "Application";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
