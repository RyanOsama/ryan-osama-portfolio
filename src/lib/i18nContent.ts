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
  'munasabat-qr': {
    en: {
      title: 'Munasabat – Cloud-Powered Event Invitation & QR Check-In System',
      shortDescription: 'A cloud-connected event management platform that generates encrypted QR invitations, supports batch A4 PDF printing, and enables real-time check-in verification via Supabase to prevent duplicate entries.',
      description: 'Munasabat is an end-to-end event and guest management system built with Electron, React, TypeScript, and Supabase. It allows event organizers and enterprises to create events, manage guest allocations, and generate encrypted QR invitations ready for batch A4 printing with precise crop marks. Equipped with an ultra-fast camera scanner and a companion mobile app, the system validates guest tickets in milliseconds against a central cloud database, strictly eliminating ticket reuse and providing live attendance metrics.',
      problem: 'Entry Bottlenecks & Fake Passes: Slow manual ticket checks at event gates cause long queues and risk unauthorized access.\nDuplicate Ticket Reuse: Guests sharing or screenshotting invitation passes to allow multiple unauthorized entries.\nMulti-Gate Desynchronization: Difficulty synchronizing guest entry logs across multiple check-in gates and devices in real time.',
      solution: 'Real-Time Cloud Validation: Integrated with Supabase (PostgreSQL) for instant, synchronized verification across all scanning devices with zero race conditions.\nAnti-Duplicate Security: Cryptographically unique invitation tokens that automatically invalidate immediately upon first successful check-in.\nAutomated PDF Layout Engine: Dynamic generation of print-ready 12-card A4 sheets with alignment and cutting guides (crop marks).\nInstant Scanner Feedback: Camera-based QR scanner providing millisecond visual and audio indicators (Success / Already Used / Invalid).\nMulti-Tenant & Analytics: Multi-company support, subscription controls, live attendance charts, and CSV report exports.',
      features: [
        { title: 'Real-Time Cloud Validation', description: 'Instant, synchronized check-in verification powered by Supabase with zero race conditions.' },
        { title: 'Anti-Duplicate Security', description: 'Cryptographically unique QR tokens that invalidate immediately on first scan.' },
        { title: 'Automated PDF Layout Engine', description: 'Batch 12-card A4 printable sheets with precise cutting guides and crop marks.' },
        { title: 'Instant Scanner Feedback', description: 'Camera-based QR scanner with millisecond audio and visual validation.' },
      ],
    },
    ar: {
      title: 'منصة مناسبات – نظام الدعوات الذكية وإدارة الحضور برمز QR السحابي',
      shortDescription: 'منصة سحابية متكاملة لإدارة الفعاليات والمناسبات، توليد بطاقات الدعوة المشفرة برمز QR، الطباعة الجماعية لصفحات A4، والتحقق اللحظي لمنع تكرار الدخول.',
      description: 'نظام متكامل وشامل لإدارة الضيوف والفعاليات مبني بتقنيات Electron و React و TypeScript و Supabase. يتيح للمنظمين والشركات إنشاء الفعاليات وإصدار بطاقات الدعوة المشفرة جاهزة للطباعة مع علامات القص الدقيقة، ومزود بماسح ضوئي فائق السرعة عبر الكاميرا وتطبيق جوال لمطابقة التذاكر في أجزاء من الثانية ومنع التكرار تماماً مع إحصائيات حضور حية ومزامنة بين جميع البوابات.',
      problem: 'بطء تدقيق التذاكر الورقية واليدوية عند بوابات الدخول، مشاركة الضيوف لصور الدعوات لتمرير أشخاص غير مصرح لهم، وصعوبة مزامنة سجلات الدخول بين أكثر من بوابة في نفس اللحظة.',
      solution: 'التحقق السحابي الفوري عبر Supabase بدون أي تعارض، تشفير بطاقات الدعوة وإلغاؤها آلياً فور أول مسح ناجح، محرك طباعة يولد 12 بطاقة منظمة في ورقة A4، واستجابة صوتية ومرئية فورية للماسح الضوئي.',
      features: [
        { title: 'تحقق سحابي فوري (Real-Time)', description: 'مزامنة لحظية عبر Supabase بين جميع أجهزة المسح والبوابات دون أي تأخير.' },
        { title: 'حماية متقدمة ضد تكرار التذاكر', description: 'تشفير فريد لكل رمز QR يتم إبطاله تلقائياً فور أول تسجيل دخول ناجح.' },
        { title: 'محرك طباعة A4 مؤتمت', description: 'توليد قوالب طباعة جماعية لـ 12 بطاقة في الصفحة مع علامات قص دقيقة.' },
        { title: 'ماسح ضوئي فائق السرعة', description: 'مسح فوري عبر الكاميرا مع تنبيهات صوتية ومرئية ملونة لحالة التذكرة.' },
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
