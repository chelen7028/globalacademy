// createAdmin.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
module.exports = prisma;

const bcrypt = require('bcrypt');

async function createAdmin() {
  const hashedPassword = await bcrypt.hash('yourPasswordHere', 10);
  await prisma.adminUser.create({
    data: {
      email: 'admin@example.com',
      password: hashedPassword
    }
  });
  console.log('Admin created');
}
createAdmin();
