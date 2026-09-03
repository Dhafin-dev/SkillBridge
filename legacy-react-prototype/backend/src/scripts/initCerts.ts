import prisma from '../utils/prisma';

async function main() {
  try {
    await prisma.$executeRawUnsafe(`ALTER TABLE StudentProfile ADD COLUMN certificates TEXT NULL;`);
    console.log('SUCCESS: certificates column added to StudentProfile');
  } catch (err: any) {
    if (err.message?.includes('Duplicate column')) {
      console.log('ALREADY_EXISTS: certificates column exists in StudentProfile');
    } else {
      console.log('NOTICE:', err.message);
    }
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
