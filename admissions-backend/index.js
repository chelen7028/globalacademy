const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');

// const router = express.Router();
// const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

// // Admin login
// router.post('/admin/login', async (req, res) => {
//   const { email, password } = req.body;
//   const admin = await prisma.adminUser.findUnique({ where: { email } });
//   if (!admin) return res.status(401).json({ error: 'Invalid credentials' });

//   const isMatch = await bcrypt.compare(password, admin.password);
//   if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

//   const token = jwt.sign({ adminId: admin.id }, JWT_SECRET, { expiresIn: '1h' });
//   res.json({ token });
// });

// // Middleware to protect admin routes
// function authenticateAdmin(req, res, next) {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) return res.status(401).json({ error: 'Missing token' });

//   const token = authHeader.split(' ')[1];
//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.adminId = decoded.adminId;
//     next();
//   } catch (err) {
//     return res.status(403).json({ error: 'Invalid token' });
//   }
// }

// module.exports = { router, authenticateAdmin, router};

app.use(cors({
  origin: 'https://chelen7028.github.io'
})); // Allow frontend requests from Vite
app.use(express.json()); // Support JSON bodies
app.use('/uploads', express.static('uploads'));
// app.use('/applications', authenticateAdmin, router);

const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: function (req, file, cb) {
    // For example, save with original name or with a prefix like timestamp
    cb(null, Date.now() + '_' + file.originalname);
  }
});

const upload = multer({ storage }).fields([
  { name: 'transcriptFileName', maxCount: 1 },
  { name: 'idFileName', maxCount: 1 },
  { name: 'testResultFileName', maxCount: 1 }
]);

// Form submission endpoint
app.post('/apply', upload, async (req, res) => {
  const body = req.body;
  const files = req.files;

  const applicationData = {
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
    postalCode: parseFloat(body.postalCode) || null,
    academicTerm: body.academicTerm,
    academicYear: parseFloat(body.academicYear),
    englishTest: body.englishTest,
    other: body.other || null,
    testScore: parseFloat(body.testScore),
    gpa: parseFloat(body.gpa),
    transcriptFileName: files.transcriptFileName?.[0]?.filename || null,
    idFileName: files.idFileName?.[0]?.filename || null,
    testResultFileName: files.testResultFileName?.[0]?.filename || null,
    signed: body.signed,
  };

  try {
    const newApp = await prisma.application.create({ data: applicationData});
    res.json(newApp);
  } catch (err) {
    console.error("❌ Failed to save application:", err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(4000, () => {
  console.log('Backend running on http://localhost:4000');
});

// GET /applications?status=approved
app.get('/applications', async (req, res) => {
  const { status } = req.query;
  const where = status ? { status } : {};

  const apps = await prisma.application.findMany({
    where,
    orderBy: { submittedAt: 'desc' }
  });

  res.json(apps);
});

// PATCH /applications/:id
app.patch('/applications/:id', async (req, res) => {
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

const fs = require('fs');

// Delete application by ID
app.delete('/applications/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    // Find the application to get the filename
    const application = await prisma.application.findUnique({ where: { id } });
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    // Delete file from uploads folder if exists
    if (application.idFileName) {
      const filePath = path.join(__dirname, 'uploads', application.idFileName);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Failed to delete file:', err);
        }
      });
    }

    // Delete the database record
    await prisma.application.delete({ where: { id } });

    res.json({ message: 'Application deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

