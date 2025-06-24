require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const path = require('path');
const fs = require('fs');

const { router: authRouter, authenticateAdmin } = require('./auth');

const app = express();
const prisma = new PrismaClient();

// Middlewares
app.use(cors({ origin: 'https://chelen7028.github.io' }));
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(authRouter); // Mount login route

// File Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, 'uploads')),
  filename: (req, file, cb) => cb(null, Date.now() + '_' + file.originalname)
});
const upload = multer({ storage }).fields([
  { name: 'transcriptFileName', maxCount: 1 },
  { name: 'idFileName', maxCount: 1 },
  { name: 'testResultFileName', maxCount: 1 }
]);

// Routes
app.post('/apply', upload, async (req, res) => {
  try {
    const { body, files } = req;
    const newApp = await prisma.application.create({
      data: {
        program: 'Global Academy',
        givenName: body.givenName,
        familyName: body.familyName,
        nationality: body.nationality,
        gender: body.gender,
        dob: new Date(body.dob),
        phone: body.phone,
        streetAddress: body.streetAddress,
        country: body.country,
        stateProvince: body.stateProvince,
        city: body.city,
        postalCode: body.postalCode || null,
        academicTerm: body.academicTerm,
        academicYear: parseFloat(body.academicYear),
        englishTest: body.englishTest,
        other: body.other || null,
        testScore: parseFloat(body.testScore),
        gpa: parseFloat(body.gpa),
        signed: body.signed,
        transcriptFileName: files.transcriptFileName?.[0]?.filename || null,
        idFileName: files.idFileName?.[0]?.filename || null,
        testResultFileName: files.testResultFileName?.[0]?.filename || null,
      }
    });
    res.json(newApp);
  } catch (err) {
    console.error("❌ Failed to save application:", err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/applications', authenticateAdmin, async (req, res) => {
  const { status } = req.query;
  const apps = await prisma.application.findMany({
    where: status ? { status } : {},
    orderBy: { submittedAt: 'desc' }
  });
  res.json(apps);
});

app.patch('/applications/:id', authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updated = await prisma.application.update({
      where: { id: parseInt(id) },
      data: { status },
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Could not update application' });
  }
});

app.delete('/applications/:id', authenticateAdmin, async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const app = await prisma.application.findUnique({ where: { id } });
    if (!app) return res.status(404).json({ error: 'Not found' });

    ['idFileName', 'transcriptFileName', 'testResultFileName'].forEach(field => {
      if (app[field]) {
        const filePath = path.join(__dirname, 'uploads', app[field]);
        fs.unlink(filePath, () => {});
      }
    });

    await prisma.application.delete({ where: { id } });
    res.json({ message: 'Deleted' });
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(4000, () => console.log('Server running on http://localhost:4000'));
