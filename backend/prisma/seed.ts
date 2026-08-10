import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding SkillBridge database...');

  // Wipe existing data in safe order
  await prisma.auditLog.deleteMany();
  await prisma.review.deleteMany();
  await prisma.message.deleteMany();
  await prisma.projectTask.deleteMany();
  await prisma.workspace.deleteMany();
  await prisma.projectApplication.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.project.deleteMany();
  await prisma.category.deleteMany();
  await prisma.studentProfile.deleteMany();
  await prisma.umkmProfile.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash('password123', 10);

  // ─── 1. ADMIN ──────────────────────────────────────────────
  const admin = await prisma.user.create({
    data: {
      email: 'admin@skillbridge.edu',
      name: 'Platform Administrator',
      passwordHash,
      role: 'ADMIN',
      isVerified: true,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      bio: 'Platform administrator for SkillBridge.',
    },
  });

  // ─── 2. STUDENTS ───────────────────────────────────────────
  const student1 = await prisma.user.create({
    data: {
      email: 'alex.rivers@university.edu',
      name: 'Alex Rivers',
      passwordHash,
      role: 'STUDENT',
      isVerified: true,
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
      bio: 'Computer Science senior passionate about accessible web apps and UI design.',
      studentProfile: {
        create: {
          institution: 'Universitas Indonesia',
          portfolioScore: 94,
          completedProjectsCount: 12,
          skills: JSON.stringify(['React', 'TypeScript', 'UI/UX Design', 'Figma', 'Firebase']),
        },
      },
    },
  });

  const student2 = await prisma.user.create({
    data: {
      email: 'budi.santoso@university.edu',
      name: 'Budi Santoso',
      passwordHash,
      role: 'STUDENT',
      isVerified: true,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      bio: 'Digital marketing strategist and data analyst.',
      studentProfile: {
        create: {
          institution: 'Institut Teknologi Bandung',
          portfolioScore: 88,
          completedProjectsCount: 8,
          skills: JSON.stringify(['SEO', 'Content Strategy', 'Google Analytics', 'Meta Ads']),
        },
      },
    },
  });

  const student3 = await prisma.user.create({
    data: {
      email: 'sari.dewi@university.edu',
      name: 'Sari Dewi',
      passwordHash,
      role: 'STUDENT',
      isVerified: false,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c44c?w=150&auto=format&fit=crop&q=80',
      bio: 'Graphic designer and brand strategist.',
      studentProfile: {
        create: {
          institution: 'Universitas Gadjah Mada',
          portfolioScore: 91,
          completedProjectsCount: 6,
          skills: JSON.stringify(['Figma', 'Adobe Illustrator', 'Brand Identity', 'Motion Graphics']),
        },
      },
    },
  });

  const student4 = await prisma.user.create({
    data: {
      email: 'reza.putra@university.edu',
      name: 'Reza Putra',
      passwordHash,
      role: 'STUDENT',
      isVerified: false,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      bio: 'Backend developer specializing in Node.js and cloud infrastructure.',
      studentProfile: {
        create: {
          institution: 'Universitas Brawijaya',
          portfolioScore: 85,
          completedProjectsCount: 5,
          skills: JSON.stringify(['Node.js', 'PostgreSQL', 'Docker', 'AWS']),
        },
      },
    },
  });

  const student5 = await prisma.user.create({
    data: {
      email: 'maya.lestari@university.edu',
      name: 'Maya Lestari',
      passwordHash,
      role: 'STUDENT',
      isVerified: true,
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      bio: 'Mobile developer with expertise in Flutter and React Native.',
      studentProfile: {
        create: {
          institution: 'Universitas Diponegoro',
          portfolioScore: 79,
          completedProjectsCount: 4,
          skills: JSON.stringify(['Flutter', 'React Native', 'Firebase', 'UI Design']),
        },
      },
    },
  });

  // ─── 3. UMKM PARTNERS ──────────────────────────────────────
  const umkm1 = await prisma.user.create({
    data: {
      email: 'hello@luminabeans.com',
      name: 'Lumina Beans Roastery',
      passwordHash,
      role: 'UMKM',
      isVerified: true,
      avatar: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=150&auto=format&fit=crop&q=80',
      bio: 'Female-founded specialty coffee roastery based in Jakarta.',
      umkmProfile: {
        create: {
          companyName: 'Lumina Beans Roastery',
          companyLogo: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=150&auto=format&fit=crop&q=80',
          industry: 'Food & Beverage',
        },
      },
    },
  });

  const umkm2 = await prisma.user.create({
    data: {
      email: 'partner@batikwastra.id',
      name: 'Batik Wastra Nusantara',
      passwordHash,
      role: 'UMKM',
      isVerified: true,
      avatar: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=150&auto=format&fit=crop&q=80',
      bio: 'Traditional Indonesian batik workshop bringing heritage crafts to the digital age.',
      umkmProfile: {
        create: {
          companyName: 'Batik Wastra Nusantara',
          companyLogo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=150&auto=format&fit=crop&q=80',
          industry: 'Fashion & Crafts',
        },
      },
    },
  });

  const umkm3 = await prisma.user.create({
    data: {
      email: 'info@greentechid.com',
      name: 'GreenTech Solutions ID',
      passwordHash,
      role: 'UMKM',
      isVerified: false,
      avatar: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=150&auto=format&fit=crop&q=80',
      bio: 'Renewable energy startup focusing on solar solutions for rural communities.',
      umkmProfile: {
        create: {
          companyName: 'GreenTech Solutions ID',
          companyLogo: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=150&auto=format&fit=crop&q=80',
          industry: 'Clean Energy',
        },
      },
    },
  });

  // ─── 4. CATEGORIES ─────────────────────────────────────────
  const catWebDev = await prisma.category.create({
    data: { name: 'Web Development', description: 'Full-stack and frontend web development projects' },
  });
  const catDesign = await prisma.category.create({
    data: { name: 'UI/UX Design', description: 'User interface and experience design projects' },
  });
  const catMarketing = await prisma.category.create({
    data: { name: 'Digital Marketing', description: 'Social media, SEO, and digital campaign projects' },
  });
  const catMobile = await prisma.category.create({
    data: { name: 'Mobile Development', description: 'iOS, Android, and cross-platform mobile projects' },
  });
  const catDataScience = await prisma.category.create({
    data: { name: 'Data & Analytics', description: 'Data science, analytics, and business intelligence' },
  });

  // ─── 5. PROJECTS ───────────────────────────────────────────
  const project1 = await prisma.project.create({
    data: {
      title: 'E-Commerce Platform Revamp',
      categoryId: catWebDev.id,
      level: 'Intermediate',
      duration: '2 Months',
      stipend: 'Rp 1.500.000',
      description: 'Complete overhaul of our online coffee shop including subscription recurring orders, modern mobile checkout, and loyalty rewards integration.',
      overview: 'Lumina Beans is scaling its direct-to-consumer coffee bean delivery service and needs a modern, performant web application.',
      objectives: JSON.stringify([
        'Build a seamless subscription ordering flow with recurring payment integration.',
        'Optimize page load performance to under 2 seconds.',
        'Implement a loyalty rewards dashboard for returning customers.',
      ]),
      deliverables: JSON.stringify([
        'Production-ready Next.js Web Application',
        'Complete UI Design System in Figma',
        'Payment Gateway Integration Documentation',
        'Performance Audit Report',
      ]),
      tags: JSON.stringify(['React', 'Next.js', 'Node.js', 'Tailwind CSS']),
      status: 'ACTIVE',
      deadline: new Date('2025-09-15T00:00:00Z'),
      teamSize: '2 Students',
      matchScore: 98,
      ownerId: umkm1.id,
    },
  });

  const project2 = await prisma.project.create({
    data: {
      title: 'Brand Identity & Digital Strategy',
      categoryId: catDesign.id,
      level: 'Beginner',
      duration: '6 Weeks',
      stipend: 'Rp 750.000',
      description: 'Overhaul our brand identity from a local wholesale roaster to a direct-to-consumer lifestyle brand with cohesive digital presence.',
      overview: 'Lumina Beans is transitioning its brand positioning and needs a complete visual identity refresh.',
      objectives: JSON.stringify([
        'Develop a cohesive, modern visual identity that reflects our values.',
        'Create a brand voice guide for all digital channels.',
        'Design social media templates for Instagram and TikTok.',
      ]),
      deliverables: JSON.stringify([
        'Vector Logo Files (AI, SVG, PNG)',
        'Brand Guideline PDF (50+ pages)',
        'Social Media Template Pack (20 templates)',
      ]),
      tags: JSON.stringify(['Figma', 'Adobe Illustrator', 'Brand Strategy']),
      status: 'PUBLISHED',
      deadline: new Date('2025-08-24T00:00:00Z'),
      teamSize: '2–3 Students',
      matchScore: 92,
      ownerId: umkm1.id,
    },
  });

  const project3 = await prisma.project.create({
    data: {
      title: 'Batik E-Catalogue & Ordering System',
      categoryId: catWebDev.id,
      level: 'Intermediate',
      duration: '3 Months',
      stipend: 'Rp 2.000.000',
      description: 'Build an interactive online catalogue with ordering system that showcases our batik collections with rich photography and story-telling.',
      overview: 'Batik Wastra Nusantara wants to bring its heritage craft collections online with a world-class digital storefront.',
      objectives: JSON.stringify([
        'Design and develop a product catalogue with search and filter.',
        'Implement a custom order workflow for bespoke batik.',
        'Integrate with WhatsApp Business API for order confirmations.',
      ]),
      deliverables: JSON.stringify([
        'Fully functional Next.js e-catalogue',
        'Admin CMS for product management',
        'WhatsApp integration module',
      ]),
      tags: JSON.stringify(['Next.js', 'TypeScript', 'Prisma', 'WhatsApp API']),
      status: 'PUBLISHED',
      deadline: new Date('2025-10-01T00:00:00Z'),
      teamSize: '2 Students',
      matchScore: 88,
      ownerId: umkm2.id,
    },
  });

  const project4 = await prisma.project.create({
    data: {
      title: 'Instagram Growth & Content Strategy',
      categoryId: catMarketing.id,
      level: 'Beginner',
      duration: '1 Month',
      stipend: 'Rp 500.000',
      description: 'Develop a data-driven Instagram content calendar, grow our following by 30%, and run targeted ad campaigns for our batik collections.',
      overview: 'Batik Wastra Nusantara needs help establishing a stronger social media presence to reach a younger demographic.',
      objectives: JSON.stringify([
        'Audit current Instagram performance and benchmark.',
        'Create a 60-day content calendar with 90 post concepts.',
        'Run 3 paid ad campaigns with A/B testing.',
      ]),
      deliverables: JSON.stringify([
        '60-Day Content Calendar (Notion)',
        'Campaign Performance Report',
        'Monthly Analytics Dashboard',
      ]),
      tags: JSON.stringify(['Social Media', 'Instagram Ads', 'Content Strategy', 'Canva']),
      status: 'PUBLISHED',
      deadline: new Date('2025-08-31T00:00:00Z'),
      teamSize: '1 Student',
      matchScore: 85,
      ownerId: umkm2.id,
    },
  });

  const project5 = await prisma.project.create({
    data: {
      title: 'Solar ROI Calculator Mobile App',
      categoryId: catMobile.id,
      level: 'Advanced',
      duration: '2.5 Months',
      stipend: 'Rp 2.500.000',
      description: 'Build a mobile app that helps rural households calculate ROI on solar panel investment, compare financing options, and connect with local installers.',
      overview: 'GreenTech Solutions ID is democratizing solar access and needs a compelling consumer app to drive adoption.',
      objectives: JSON.stringify([
        'Build a cross-platform mobile app with Flutter.',
        'Implement a financial model for ROI calculation.',
        'Integrate maps to show nearest certified installers.',
      ]),
      deliverables: JSON.stringify([
        'Flutter Mobile App (Android & iOS)',
        'Backend API for installer directory',
        'Financial model documentation',
      ]),
      tags: JSON.stringify(['Flutter', 'Firebase', 'Google Maps API', 'Financial Modeling']),
      status: 'DRAFT',
      deadline: new Date('2025-11-01T00:00:00Z'),
      teamSize: '2 Students',
      matchScore: 76,
      ownerId: umkm3.id,
    },
  });

  const project6 = await prisma.project.create({
    data: {
      title: 'Customer Segmentation & Sales Analytics',
      categoryId: catDataScience.id,
      level: 'Advanced',
      duration: '6 Weeks',
      stipend: 'Rp 1.800.000',
      description: 'Analyze our transaction data to identify key customer segments, predict churn, and build an interactive sales dashboard.',
      overview: 'Lumina Beans has 2 years of transaction data and wants actionable insights to drive growth strategy.',
      objectives: JSON.stringify([
        'Perform RFM analysis to segment the customer base.',
        'Build a churn prediction model with >80% accuracy.',
        'Create an interactive Tableau/Power BI dashboard.',
      ]),
      deliverables: JSON.stringify([
        'Python Analysis Notebooks',
        'Interactive Sales Dashboard',
        'Strategic Recommendations Report',
      ]),
      tags: JSON.stringify(['Python', 'Pandas', 'Machine Learning', 'Tableau']),
      status: 'PUBLISHED',
      deadline: new Date('2025-09-30T00:00:00Z'),
      teamSize: '1–2 Students',
      matchScore: 90,
      ownerId: umkm1.id,
    },
  });

  // ─── 6. APPLICATIONS ───────────────────────────────────────
  const app1 = await prisma.projectApplication.create({
    data: { projectId: project1.id, studentId: student1.id, status: 'ACCEPTED' },
  });
  await prisma.projectApplication.create({
    data: { projectId: project2.id, studentId: student3.id, status: 'PENDING' },
  });
  await prisma.projectApplication.create({
    data: { projectId: project3.id, studentId: student1.id, status: 'PENDING' },
  });
  await prisma.projectApplication.create({
    data: { projectId: project4.id, studentId: student2.id, status: 'ACCEPTED' },
  });
  await prisma.projectApplication.create({
    data: { projectId: project6.id, studentId: student2.id, status: 'PENDING' },
  });

  // ─── 7. WORKSPACES ─────────────────────────────────────────
  const workspace1 = await prisma.workspace.create({
    data: {
      projectId: project1.id,
      studentId: student1.id,
      umkmId: umkm1.id,
      status: 'ACTIVE',
      progressPercent: 65,
      tasks: {
        create: [
          { title: 'Design Wireframes (Desktop + Mobile)', completed: true, dueDate: new Date('2025-08-10T00:00:00Z'), assignedTo: student1.id },
          { title: 'Implement Checkout Flow', completed: false, dueDate: new Date('2025-08-20T00:00:00Z'), assignedTo: student1.id },
          { title: 'Subscription Integration (Midtrans)', completed: false, dueDate: new Date('2025-08-28T00:00:00Z'), assignedTo: student1.id },
          { title: 'Performance Audit & Optimization', completed: false, dueDate: new Date('2025-09-10T00:00:00Z'), assignedTo: student1.id },
        ],
      },
      messages: {
        create: [
          { text: 'Hi Alex! Loved the initial wireframe layout — the checkout flow looks very clean.', senderId: umkm1.id, receiverId: student1.id },
          { text: 'Thank you! I am currently working on Phase 2 — the subscription flow. Will share an update by Friday.', senderId: student1.id, receiverId: umkm1.id },
          { text: 'Great, looking forward to it. Also, could you prioritize mobile responsiveness for the cart page?', senderId: umkm1.id, receiverId: student1.id },
          { text: 'Absolutely, mobile-first approach — I will start with that today.', senderId: student1.id, receiverId: umkm1.id },
        ],
      },
    },
  });

  const workspace2 = await prisma.workspace.create({
    data: {
      projectId: project4.id,
      studentId: student2.id,
      umkmId: umkm2.id,
      status: 'ACTIVE',
      progressPercent: 40,
      tasks: {
        create: [
          { title: 'Instagram Audit & Competitor Analysis', completed: true, dueDate: new Date('2025-08-05T00:00:00Z'), assignedTo: student2.id },
          { title: 'Draft 60-Day Content Calendar', completed: true, dueDate: new Date('2025-08-12T00:00:00Z'), assignedTo: student2.id },
          { title: 'Create Ad Creatives for Campaign #1', completed: false, dueDate: new Date('2025-08-18T00:00:00Z'), assignedTo: student2.id },
          { title: 'Launch & Monitor Campaign #1', completed: false, dueDate: new Date('2025-08-25T00:00:00Z'), assignedTo: student2.id },
        ],
      },
      messages: {
        create: [
          { text: 'Budi, the content calendar looks great! I especially love the story series concept.', senderId: umkm2.id, receiverId: student2.id },
          { text: 'Thank you! The engagement strategy focuses on our artisans — I think authenticity will resonate well.', senderId: student2.id, receiverId: umkm2.id },
        ],
      },
    },
  });

  // ─── 8. NOTIFICATIONS ──────────────────────────────────────
  await prisma.notification.createMany({
    data: [
      {
        userId: student1.id,
        type: 'PROJECT',
        title: 'Application Accepted',
        message: 'Your application for "E-Commerce Platform Revamp" has been accepted by Lumina Beans Roastery.',
        isRead: false,
        actionRoute: 'my-projects',
        relatedEntityId: project1.id,
        relatedEntityType: 'Project',
      },
      {
        userId: student1.id,
        type: 'MESSAGE',
        title: 'New Message from Lumina Beans',
        message: 'Lumina Beans Roastery sent you a message in your active project workspace.',
        isRead: false,
        actionRoute: 'messages',
        relatedEntityId: workspace1.id,
        relatedEntityType: 'Workspace',
      },
      {
        userId: student2.id,
        type: 'PROJECT',
        title: 'Application Accepted',
        message: 'Your application for "Instagram Growth & Content Strategy" has been accepted.',
        isRead: false,
        actionRoute: 'my-projects',
        relatedEntityId: project4.id,
        relatedEntityType: 'Project',
      },
      {
        userId: umkm1.id,
        type: 'PROJECT',
        title: 'New Application Received',
        message: 'Alex Rivers applied to your "E-Commerce Platform Revamp" project.',
        isRead: true,
        actionRoute: 'my-requests',
        relatedEntityId: project1.id,
        relatedEntityType: 'Project',
      },
      {
        userId: umkm1.id,
        type: 'PROJECT',
        title: 'New Application Received',
        message: 'Alex Rivers also applied to your "Customer Segmentation & Sales Analytics" project.',
        isRead: false,
        actionRoute: 'my-requests',
        relatedEntityId: project6.id,
        relatedEntityType: 'Project',
      },
    ],
  });

  // ─── 9. REVIEWS ────────────────────────────────────────────
  await prisma.review.createMany({
    data: [
      {
        projectId: project1.id,
        authorId: umkm1.id,
        targetId: student1.id,
        rating: 5,
        comment: 'Alex is an exceptional developer. Delivered beyond expectations, very communicative, and handled feedback with professionalism.',
      },
      {
        projectId: project4.id,
        authorId: umkm2.id,
        targetId: student2.id,
        rating: 4,
        comment: 'Budi brought a lot of creative energy to the campaign. Strong analytical skills and very organized with the content calendar.',
      },
    ],
  });

  // ─── 10. AUDIT LOGS ────────────────────────────────────────
  await prisma.auditLog.createMany({
    data: [
      {
        adminId: admin.id,
        action: 'USER_VERIFIED',
        entityType: 'User',
        entityId: student1.id,
        details: 'Manually verified student profile for Alex Rivers',
      },
      {
        adminId: admin.id,
        action: 'PROJECT_APPROVED',
        entityType: 'Project',
        entityId: project1.id,
        details: 'Approved and published project for UMKM Lumina Beans',
      },
    ],
  });

  console.log('✅ Seeding complete!');
  console.log('');
  console.log('📧 Test Accounts (all passwords: password123)');
  console.log('   Admin:   admin@skillbridge.edu');
  console.log('   Student: alex.rivers@university.edu');
  console.log('   Student: budi.santoso@university.edu');
  console.log('   UMKM:    hello@luminabeans.com');
  console.log('   UMKM:    partner@batikwastra.id');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
