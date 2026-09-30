import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // 1. Admin account
  const username = process.env.ADMIN_USERNAME || 'Ryan_osama';
  const rawPassword = process.env.ADMIN_INITIAL_PASSWORD || 'W_s87809*';
  const passwordHash = await bcrypt.hash(rawPassword, 12);

  const admin = await prisma.admin.upsert({
    where: { username },
    update: { passwordHash },
    create: {
      username,
      passwordHash,
    },
  });
  console.log(`✅ Admin account secured: ${admin.username}`);

  // 2. Categories
  const categoriesData = [
    { name: 'أنظمة الويب المتكاملة', slug: 'web-platforms', description: 'منصات وأنظمة سحابية متكاملة للشركات والمؤسسات', sortOrder: 1 },
    { name: 'تطبيقات الهاتف والواجهات', slug: 'mobile-ui', description: 'تطبيقات جوال وتجارب مستخدم عصرية وسلسة', sortOrder: 2 },
    { name: 'أنظمة الذكاء الاصطناعي والأتمتة', slug: 'ai-automation', description: 'حلول الذكاء الاصطناعي، بوتات، وأتمتة العمليات', sortOrder: 3 },
    { name: 'واجهات برمجية وخدمات خلفية', slug: 'backend-apis', description: 'أنظمة Backend عالية الأداء والأمان وقواعد بيانات متقدمة', sortOrder: 4 },
  ];

  const categories = await Promise.all(
    categoriesData.map((cat) =>
      prisma.category.upsert({
        where: { slug: cat.slug },
        update: cat,
        create: cat,
      })
    )
  );
  console.log(`✅ Created ${categories.length} categories`);

  // 3. Technologies
  const techData = [
    { name: 'Next.js', slug: 'nextjs', icon: 'nextjs', category: 'Frontend', sortOrder: 1 },
    { name: 'React', slug: 'react', icon: 'react', category: 'Frontend', sortOrder: 2 },
    { name: 'TypeScript', slug: 'typescript', icon: 'typescript', category: 'Language', sortOrder: 3 },
    { name: 'Node.js', slug: 'nodejs', icon: 'nodejs', category: 'Backend', sortOrder: 4 },
    { name: 'PostgreSQL', slug: 'postgresql', icon: 'postgresql', category: 'Database', sortOrder: 5 },
    { name: 'Prisma ORM', slug: 'prisma', icon: 'prisma', category: 'Database', sortOrder: 6 },
    { name: 'Python', slug: 'python', icon: 'python', category: 'Language', sortOrder: 7 },
    { name: 'Docker', slug: 'docker', icon: 'docker', category: 'DevOps', sortOrder: 8 },
    { name: 'REST APIs', slug: 'rest-api', icon: 'api', category: 'Backend', sortOrder: 9 },
    { name: 'Cloudflare R2', slug: 'cloudflare-r2', icon: 'cloud', category: 'Storage', sortOrder: 10 },
  ];

  const techs = await Promise.all(
    techData.map((tech) =>
      prisma.technology.upsert({
        where: { slug: tech.slug },
        update: tech,
        create: tech,
      })
    )
  );
  console.log(`✅ Created ${techs.length} technologies`);

  // 4. Services
  const servicesData = [
    {
      title: 'تطوير المنصات والأنظمة السحابية (Full-Stack)',
      description: 'بناء تطبيقات ويب متكاملة من الصفر بهندسة برمجية نظيفة، وأداء فائق، وقابلية توسع عالية للمشاريع الكبيرة.',
      icon: 'layers',
      sortOrder: 1,
      isActive: true,
    },
    {
      title: 'تطوير وتأمين الـ RESTful APIs',
      description: 'تصميم وبناء واجهات برمجية آمنة وموثوقة تدعم المصادقة المتقدمة ومعدلات الطلب العالية والربط بين الأنظمة.',
      icon: 'shield-check',
      sortOrder: 2,
      isActive: true,
    },
    {
      title: 'هندسة قواعد البيانات وتحسين الأداء',
      description: 'تصميم جداول متقدمة، وفهرسة ذكية، وتحسين الاستعلامات المعقدة في PostgreSQL لضمان سرعة فائقة في استرجاع البيانات.',
      icon: 'database',
      sortOrder: 3,
      isActive: true,
    },
    {
      title: 'حلول الأتمتة والذكاء الاصطناعي',
      description: 'تطوير بوتات ذكية، وأتمتة مسارات العمل، ودمج نماذج الذكاء الاصطناعي لرفع كفاءة الأعمال وسرعة الإنجاز.',
      icon: 'cpu',
      sortOrder: 4,
      isActive: true,
    },
  ];

  await prisma.service.deleteMany();
  await prisma.service.createMany({ data: servicesData });
  console.log(`✅ Created ${servicesData.length} services`);

  // 5. Skills
  const skillsData = [
    { name: 'Next.js / React', category: 'Frontend', level: 95, sortOrder: 1, isActive: true },
    { name: 'TypeScript / JavaScript', category: 'Frontend', level: 95, sortOrder: 2, isActive: true },
    { name: 'CSS3 / Modern UI / RTL', category: 'Frontend', level: 92, sortOrder: 3, isActive: true },
    { name: 'Node.js / Express', category: 'Backend', level: 90, sortOrder: 4, isActive: true },
    { name: 'PostgreSQL & SQL Design', category: 'Database', level: 92, sortOrder: 5, isActive: true },
    { name: 'Prisma ORM & Data Modeling', category: 'Database', level: 94, sortOrder: 6, isActive: true },
    { name: 'API Security & Auth (JWT/Bcrypt)', category: 'Security', level: 95, sortOrder: 7, isActive: true },
    { name: 'Docker & Git Workflows', category: 'DevOps', level: 85, sortOrder: 8, isActive: true },
  ];

  await prisma.skill.deleteMany();
  await prisma.skill.createMany({ data: skillsData });
  console.log(`✅ Created ${skillsData.length} skills`);

  // 6. Experience
  const experiencesData = [
    {
      title: 'مطور برمجيات وأنظمة ويب أول (Senior Full-Stack Developer)',
      organization: 'مشاريع وأنظمة مؤسسية خاصة',
      location: 'حضرموت / عن بُعد',
      description: 'قيادة وتطوير أنظمة جامعية ومنصات إدارة متكاملة تعتمد على بنية برمجية حديثة وآمنة مع إدارة قواعد البيانات وتحسين الأداء.',
      startDate: new Date('2023-01-01'),
      endDate: null,
      isCurrent: true,
      sortOrder: 1,
    },
    {
      title: 'مهندس حلول برمجية ومطور Backend',
      organization: 'أعمال وتطوير برمجيات حرة',
      location: 'عن بُعد',
      description: 'بناء واجهات برمجية API، لوحات تحكم متقدمة، وأتمتة العمليات للشركات وحلول التجارة الإلكترونية.',
      startDate: new Date('2021-06-01'),
      endDate: new Date('2022-12-31'),
      isCurrent: false,
      sortOrder: 2,
    },
  ];

  await prisma.experience.deleteMany();
  await prisma.experience.createMany({ data: experiencesData });
  console.log(`✅ Created ${experiencesData.length} experiences`);

  // 7. Site Settings
  const settingsData = [
    { key: 'site_name', value: 'ريان أسامة | مهندس برمجيات ومطور أنظمة', group: 'general' },
    { key: 'owner_name', value: 'ريان أسامة (Ryan Osama)', group: 'profile' },
    { key: 'headline', value: 'مهندس برمجيات ومطور Full-Stack متخصص في بناء الأنظمة السحابية والحلول الآمنة عالية الأداء', group: 'profile' },
    { key: 'bio', value: 'شغوف بهندسة البرمجيات النظيفة وبناء المنصات التي تحل مشاكل حقيقية. أمتلك خبرة عملية في تصميم وتطوير الأنظمة المتكاملة من واجهات المستخدم التفاعلية وحتى البنية التحتية الخلفية وقواعد البيانات مع التركيز التام على معايير الأمان وتجربة المستخدم السلسة.', group: 'profile' },
    { key: 'email', value: 'ryan.osama.dev@gmail.com', group: 'profile' },
    { key: 'phone', value: '+967770000000', group: 'profile' },
    { key: 'location', value: 'اليمن - حضرموت', group: 'profile' },
    { key: 'github_url', value: 'https://github.com/ryan-osama', group: 'social' },
    { key: 'linkedin_url', value: 'https://linkedin.com/in/ryan-osama', group: 'social' },
    { key: 'seo_title', value: 'ريان أسامة - معرض الأعمال والأنظمة البرمجية', group: 'seo' },
    { key: 'seo_description', value: 'الموقع الرسمي ومعرض الأعمال للمطور ريان أسامة - استعراض المشاريع، الأنظمة السحابية، والحلول البرمجية المتكاملة.', group: 'seo' },
  ];

  for (const s of settingsData) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: s,
      create: s,
    });
  }
  console.log(`✅ Seeded ${settingsData.length} site settings`);

  // 8. Showcase Projects
  const webCat = categories.find((c) => c.slug === 'web-platforms');
  const aiCat = categories.find((c) => c.slug === 'ai-automation');

  const project1 = await prisma.project.upsert({
    where: { slug: 'university-management-system' },
    update: {},
    create: {
      title: 'النظام الأكاديمي والجامعي المتكامل',
      slug: 'university-management-system',
      shortDescription: 'منصة سحابية شاملة لإدارة شؤون الطلاب، الدرجات، الجداول الأكاديمية، مع لوحات تحكم متقدمة.',
      description: 'نظام إداري وأكاديمي متكامل تم تصميمه لتنظيم العمليات الجامعية بمرونة وأمان عالي، مع دعم التسجيل الإلكتروني، متابعة الخطط الدراسية، وتقارير الحضور والنتائج.',
      problem: 'الحاجة إلى أتمتة العمليات الورقية المعقدة في المؤسسات التعليمية وتوفير وصول فوري وآمن للطلاب والمحاضرين مع إدارة صلاحيات دقيقة.',
      solution: 'بناء نظام موحد بواجهات سريعة وتفاعلية، وفصل الصلاحيات بدقة، وربطه بقاعدة بيانات PostgreSQL معتمدة على معايير الأمان والتشفير.',
      categoryId: webCat?.id,
      coverImage: '/images/project-university.webp',
      liveUrl: 'https://example.com/demo-university',
      githubUrl: 'https://github.com/ryan-osama/university-system',
      status: 'COMPLETED',
      isFeatured: true,
      sortOrder: 1,
      features: {
        create: [
          { title: 'إدارة الجداول والمقررات الأكاديمية', description: 'توزيع تلقائي للمحاضرات والقاعات والمدرسين مع تجنب التضارب', sortOrder: 1 },
          { title: 'بوابة الطالب التفاعلية', description: 'متابعة المعدل التراكمي، تحميل السجلات، والتواصل مع أعضاء الهيئة التدريسية', sortOrder: 2 },
          { title: 'نظام المصادقة والصلاحيات المتعددة', description: 'تحكم دقيق بمستويات الوصول (إدارة، شؤون طلاب، محاضر، طالب) مع تشفير كامل للجلسات', sortOrder: 3 },
          { title: 'تقارير وإحصائيات متقدمة', description: 'توليد كشوفات الدرجات والشهادات بتنسيقات متعددة وبسرعة فائقة', sortOrder: 4 },
        ],
      },
    },
  });

  const project2 = await prisma.project.upsert({
    where: { slug: 'smart-business-dashboard' },
    update: {},
    create: {
      title: 'لوحة القيادة الذكية وإدارة العمليات Masarati',
      slug: 'smart-business-dashboard',
      shortDescription: 'منصة تفاعلية لتحليل البيانات وإدارة العمليات التجارية الفورية ومراقبة مؤشرات الأداء.',
      description: 'لوحة قيادة مركزية تربط الفروع والمبيعات والمخزون في الوقت الفعلي مع رسوم بيانية تفاعلية وتنبيهات ذكية.',
      problem: 'تشتت البيانات بين الأنظمة وعدم وجود رؤية مركزية لاتخاذ القرارات السريعة وتتبع المبيعات والمهام.',
      solution: 'تطوير Dashboard حديث يعتمد على تدفق البيانات اللحظي، وتجميع الإحصائيات مع تجربة مستخدم فائقة السلاسة ودعم كامل للغة العربية.',
      categoryId: webCat?.id,
      coverImage: '/images/project-masarati.webp',
      liveUrl: 'https://example.com/demo-masarati',
      githubUrl: 'https://github.com/ryan-osama/dashboard-masarati',
      status: 'COMPLETED',
      isFeatured: true,
      sortOrder: 2,
      features: {
        create: [
          { title: 'مؤشرات الأداء اللحظية (Real-time Analytics)', description: 'متابعة الإيرادات وحركة المبيعات ثانية بثانية', sortOrder: 1 },
          { title: 'إدارة المنتجات والمخزون', description: 'تنبيهات انخفاض الكميات وتتبع حركة البضائع', sortOrder: 2 },
          { title: 'أمان وتشفير الجلسات', description: 'نظام حماية من الاختراق ومحاولات التخمين مع سجل نشاط مفصل', sortOrder: 3 },
        ],
      },
    },
  });

  // Link technologies to projects
  const nextTech = techs.find((t) => t.slug === 'nextjs');
  const pgTech = techs.find((t) => t.slug === 'postgresql');
  const nodeTech = techs.find((t) => t.slug === 'nodejs');
  const tsTech = techs.find((t) => t.slug === 'typescript');

  const selectedTechs = [nextTech, pgTech, nodeTech, tsTech].filter(Boolean) as typeof techs;

  for (const proj of [project1, project2]) {
    for (const tech of selectedTechs) {
      await prisma.projectTechnology.upsert({
        where: {
          projectId_technologyId: {
            projectId: proj.id,
            technologyId: tech.id,
          },
        },
        update: {},
        create: {
          projectId: proj.id,
          technologyId: tech.id,
        },
      });
    }
  }

  // Seed sample approved review
  await prisma.review.create({
    data: {
      projectId: project1.id,
      name: 'د. أحمد السالم',
      email: 'ahmed.salem@example.com',
      rating: 5,
      comment: 'عمل متميز واحترافي جداً! النظام سلس وسهل الاستخدام والأمان فيه على أعلى مستوى.',
      status: 'approved',
    },
  });

  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
