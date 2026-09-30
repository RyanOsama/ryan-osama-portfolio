// Helper for dynamic bilingual content translation (English <-> Arabic)
export interface TranslatedItem {
  [key: string]: any;
}

export const servicesTranslations: Record<string, { en: { title: string; desc: string }; ar: { title: string; desc: string } }> = {
  'full-stack': {
    en: {
      title: 'Full-Stack Web & Cloud Platforms',
      desc: 'Architecting robust, scalable web platforms from scratch with clean code, ultra-fast performance, and high enterprise scalability.',
    },
    ar: {
      title: 'تطوير المنصات والأنظمة السحابية (Full-Stack)',
      desc: 'بناء تطبيقات ويب متكاملة من الصفر بهندسة برمجية نظيفة، وأداء فائق، وقابلية توسع عالية للمشاريع الكبيرة.',
    },
  },
  'apis': {
    en: {
      title: 'RESTful API Engineering & Security',
      desc: 'Designing and building rock-solid, secure APIs supporting advanced JWT authentication, rate limiting, and seamless cross-platform integration.',
    },
    ar: {
      title: 'تطوير وتأمين الـ RESTful APIs',
      desc: 'تصميم وبناء واجهات برمجية آمنة وموثوقة تدعم المصادقة المتقدمة ومعدلات الطلب العالية والربط بين الأنظمة.',
    },
  },
  'database': {
    en: {
      title: 'Database Architecture & Query Optimization',
      desc: 'Advanced schema modeling, intelligent indexing, and complex query tuning on PostgreSQL for sub-millisecond query execution.',
    },
    ar: {
      title: 'هندسة قواعد البيانات وتحسين الأداء',
      desc: 'تصميم جداول متقدمة، وفهرسة ذكية، وتحسين الاستعلامات المعقدة في PostgreSQL لضمان سرعة فائقة في استرجاع البيانات.',
    },
  },
  'automation': {
    en: {
      title: 'AI Integration & Workflow Automation',
      desc: 'Developing intelligent bots, automated business pipelines, and integrating state-of-the-art AI models to accelerate operations.',
    },
    ar: {
      title: 'حلول الأتمتة والذكاء الاصطناعي',
      desc: 'تطوير بوتات ذكية، وأتمتة مسارات العمل، ودمج نماذج الذكاء الاصطناعي لرفع كفاءة الأعمال وسرعة الإنجاز.',
    },
  },
};

export const categoryTranslations: Record<string, { en: string; ar: string }> = {
  'web-platforms': {
    en: 'Integrated Web Platforms',
    ar: 'أنظمة الويب المتكاملة',
  },
  'mobile-ui': {
    en: 'Mobile Apps & UX',
    ar: 'تطبيقات الهاتف والواجهات',
  },
  'ai-automation': {
    en: 'AI & Automation Systems',
    ar: 'أنظمة الذكاء الاصطناعي والأتمتة',
  },
  'backend-apis': {
    en: 'Backend APIs & Cloud Services',
    ar: 'واجهات برمجية وخدمات خلفية',
  },
};

export const projectTranslations: Record<
  string,
  {
    en: {
      title: string;
      shortDescription: string;
      description: string;
      problem?: string;
      solution?: string;
      features?: { title: string; description?: string }[];
    };
    ar: {
      title: string;
      shortDescription: string;
      description: string;
      problem?: string;
      solution?: string;
      features?: { title: string; description?: string }[];
    };
  }
> = {
  'university-management-system': {
    en: {
      title: 'Integrated Academic & University Management System',
      shortDescription: 'A comprehensive cloud platform for student affairs, grade management, academic schedules, and advanced admin portals.',
      description: 'An enterprise-grade university management system built to streamline multi-department operations. Features student admissions, faculty portals, course registration, automated transcript generation, and role-based access control with bank-grade security.',
      problem: 'Educational institutions struggled with fragmented paperwork, slow manual grading, and lack of real-time multi-role access for faculty and students.',
      solution: 'Architected a unified, fast web platform with secure role-based authorization, automated grade calculations, and optimized PostgreSQL database queries.',
      features: [
        { title: 'Multi-Role Portals', description: 'Dedicated dashboards for Admins, Deans, Professors, and Students.' },
        { title: 'Automated GPA & Grade System', description: 'Instant calculation and audit logging of grades and transcripts.' },
        { title: 'Interactive Academic Scheduling', description: 'Conflict-free lecture and exam schedule generator.' },
        { title: 'Bank-Grade Security', description: 'Encrypted sessions, CSRF/XSS sanitization, and brute-force protection.' },
      ],
    },
    ar: {
      title: 'النظام الأكاديمي والجامعي المتكامل',
      shortDescription: 'منصة سحابية شاملة لإدارة شؤون الطلاب، الدرجات، الجداول الأكاديمية، مع لوحات تحكم متقدمة.',
      description: 'منظومة إدارية وأكاديمية متكاملة مصممة لإدارة الجامعات والكليات باحترافية، تغطي شؤون الطلاب، تسجيل المقررات، إدارة الدرجات والمعدلات التراكمية، مع لوحات تحكم مستقلة ومؤمنة.',
      problem: 'الحاجة إلى أتمتة العمليات الورقية المعقدة في المؤسسات التعليمية وتوفير وصول فوري وآمن للطلاب والمحاضرين مع إدارة صلاحيات دقيقة.',
      solution: 'بناء نظام موحد بواجهات سريعة وتفاعلية، وفصل الصلاحيات بدقة، وربطه بقاعدة بيانات PostgreSQL معتمدة على معايير الأمان والتشفير.',
      features: [
        { title: 'بوابات مستخدمين متعددة المستويات', description: 'لوحات تحكم منفصلة للمشرفين، رؤساء الأقسام، المدرسين، والطلاب.' },
        { title: 'حساب المعدلات والنتائج آلياً', description: 'معالجة فورية وتوثيق رقمي للدرجات وسجلات الدرجات الأكاديمية.' },
        { title: 'جداول دراسية وامتحانات ذكية', description: 'تنظيم القاعات والمحاضرات بدون تعارضات زمنية.' },
        { title: 'أمان وتشفير متكامل', description: 'جلسات مشفرة وحماية كاملة ضد الاختراق وتسريب البيانات.' },
      ],
    },
  },
  'smart-business-dashboard': {
    en: {
      title: 'Masarati Intelligent Business & Operations Dashboard',
      shortDescription: 'Real-time business analytics platform with revenue forecasting, performance KPIs, and multi-tenant management.',
      description: 'A cutting-edge operational dashboard designed for enterprise decision-makers. Provides real-time event streaming, transactional logs, interactive charts, and team productivity tracking with lightning fast queries.',
      problem: 'Scattered business metrics caused delayed decision-making, missing anomalies, and lack of unified operational visibility.',
      solution: 'Engineered a centralized real-time dashboard with cached PostgreSQL queries and instant data visualizers.',
      features: [
        { title: 'Live Performance Metrics', description: 'Real-time revenue, conversion rates, and server health tracking.' },
        { title: 'Automated Financial Reports', description: 'Exportable multi-currency financial balance sheets and summaries.' },
        { title: 'Multi-Tenant Isolation', description: 'Strict data partitioning ensuring total privacy for each company workspace.' },
      ],
    },
    ar: {
      title: 'لوحة القيادة الذكية وإدارة العمليات Masarati',
      shortDescription: 'منصة تفاعلية لتحليل البيانات وإدارة العمليات التجارية الفورية ومراقبة مؤشرات الأداء.',
      description: 'لوحة قيادة تفاعلية مخصصة للشركات والمنشآت تتيح متابعة الإيرادات، وإدارة الفرق، وتحليل البيانات الفورية وتصدير التقارير الذكية مع حماية متقدمة.',
      problem: 'تشتت البيانات وصعوبة متابعة المؤشرات التشغيلية والمالية بدقة وسرعة في مكان واحد.',
      solution: 'تصميم لوحة مركزية فورية تستعلم من قاعدة بيانات محسنة لعرض مؤشرات الأداء والرسوم البيانية بسرعة فائقة.',
      features: [
        { title: 'مؤشرات أداء مباشرة', description: 'متابعة حية للمبيعات والمستخدمين والعمليات التشغيلية.' },
        { title: 'تقارير مالية ذكية', description: 'تصدير دوري للتقارير والبيانات الإحصائية بدقة عالية.' },
        { title: 'عزل تام لبيانات الشركات', description: 'أمان متقدم يضمن خصوصية وحماية معلومات كل منشأة.' },
      ],
    },
  },
};

export const experienceTranslations: Record<
  string,
  {
    en: { title: string; organization: string; location?: string; description: string };
    ar: { title: string; organization: string; location?: string; description: string };
  }
> = {
  'exp-1': {
    en: {
      title: 'Senior Full-Stack Software Engineer',
      organization: 'Tech Enterprise Solutions',
      location: 'Hadramout, Yemen (Remote)',
      description: 'Leading the architecture and implementation of enterprise academic systems, web applications, and database optimizations with a strict security-first standard.',
    },
    ar: {
      title: 'مطور برمجيات وأنظمة ويب أول (Senior Full-Stack Developer)',
      organization: 'Tech Enterprise Solutions',
      location: 'حضرموت، اليمن (عن بعد)',
      description: 'قيادة وتطوير أنظمة جامعية ومنصات إدارة متكاملة تعتمد على بنية برمجية حديثة وآمنة مع إدارة قواعد البيانات وتحسين الأداء.',
    },
  },
  'exp-2': {
    en: {
      title: 'Backend Solutions & Cloud API Engineer',
      organization: 'Digital Systems & Cloud Corp',
      location: 'Remote',
      description: 'Engineered RESTful APIs, high-throughput microservices, robust JWT authentication pipelines, and workflow automation for corporate clients.',
    },
    ar: {
      title: 'مهندس حلول برمجية ومطور Backend',
      organization: 'Digital Systems & Cloud Corp',
      location: 'عن بعد',
      description: 'بناء واجهات برمجية API، لوحات تحكم متقدمة، وأتمتة العمليات للشركات وحلول التجارة الإلكترونية.',
    },
  },
};
