const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function createAdmin() {
  const email = 'admin@example.com';
  const password = 'supersecurepassword';
  const hashed = await bcrypt.hash(password, 10);

  await prisma.adminUser.create({
    data: { email, password: hashed }
  });

  console.log('✅ Admin user created');
  process.exit();
}

createAdmin().catch(console.error);
