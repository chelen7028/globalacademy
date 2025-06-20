const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(cors({
  origin: 'https://chelen7028.github.io'
})); // Allow frontend requests from Vite
app.use(express.json()); // Support JSON bodies
app.use('/uploads', express.static('uploads'));

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

const upload = multer({ storage });

app.post('/apply', upload.single('idFile'), async (req, res) => {
  const { name, email, gpa } = req.body;
  const idFile = req.file;

  console.log('Body:', req.body);
  console.log('File:', req.file);

  try {
    const newApp = await prisma.application.create({
      data: {
        name,
        email,
        gpa: parseFloat(gpa),
        idFileName: idFile?.filename || null,
      },
    });
    res.json(newApp);
  } catch (error) {
    console.error('❌ Failed to save application:', error);
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

