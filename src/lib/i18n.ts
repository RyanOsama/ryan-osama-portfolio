export type Language = 'en' | 'ar';

export interface TranslationDictionary {
  nav: {
    home: string;
    about: string;
    services: string;
    skills: string;
    projects: string;
    experience: string;
    reviews: string;
    contact: string;
    requestProject: string;
    adminPortal: string;
    language: string;
  };
  hero: {
    availabilityBadge: string;
    headline: string;
    headlineHighlight: string;
    subheadline: string;
    exploreProjects: string;
    contactMe: string;
    statYears: string;
    statYearsLabel: string;
    statProjects: string;
    statProjectsLabel: string;
    statQuality: string;
    statQualityLabel: string;
    statSupport: string;
    statSupportLabel: string;
  };
  about: {
    badge: string;
    title: string;
    subtitle: string;
    securityTitle: string;
    securityDesc: string;
    archTitle: string;
    archDesc: string;
    dbTitle: string;
    dbDesc: string;
    performanceTitle: string;
    performanceDesc: string;
  };
  services: {
    badge: string;
    title: string;
    subtitle: string;
    requestService: string;
  };
  skills: {
    badge: string;
    title: string;
    subtitle: string;
    all: string;
  };
  projects: {
    badge: string;
    title: string;
    subtitle: string;
    allProjects: string;
    featured: string;
    completed: string;
    viewDetails: string;
    addReview: string;
    liveDemo: string;
    githubRepo: string;
    reviewsCount: string;
  };
  projectDetails: {
    backToProjects: string;
    problemTitle: string;
    solutionTitle: string;
    featuresTitle: string;
    techStackTitle: string;
    detailedOverview: string;
    reviewsTitle: string;
    averageRating: string;
    outOf5: string;
    approvedReviews: string;
    writeReview: string;
    noReviews: string;
  };
  experience: {
    badge: string;
    title: string;
    subtitle: string;
    present: string;
  };
  reviews: {
    badge: string;
    title: string;
    subtitle: string;
    addReviewBtn: string;
    verifiedReview: string;
    firstToReview: string;
    beTheFirst: string;
    projectLabel: string;
  };
  reviewModal: {
    badge: string;
    modalTitle: string;
    modalTitleWithProject: string;
    modalSubtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    commentLabel: string;
    commentPlaceholder: string;
    submitBtn: string;
    submitting: string;
    successMessage: string;
  };
  contact: {
    badge: string;
    title: string;
    subtitle: string;
    whatsappTitle: string;
    whatsappDesc: string;
    whatsappAction: string;
    emailTitle: string;
    emailAction: string;
    locationTitle: string;
  };
  footer: {
    title: string;
    role: string;
    bio: string;
    rights: string;
    securedSystem: string;
    adminLink: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      skills: 'Skills',
      projects: 'Projects',
      experience: 'Experience',
      reviews: 'Reviews',
      contact: 'Contact',
      requestProject: 'Get in Touch',
      adminPortal: 'Admin Portal',
      language: 'العربية',
    },
    hero: {
      availabilityBadge: 'Available for enterprise systems & consulting',
      headline: 'Architecting Scalable Cloud Systems &',
      headlineHighlight: 'High-Performance Web Solutions',
      subheadline:
        "I'm Ryan Osama, a Senior Full-Stack Software Engineer specializing in robust cloud applications, optimized PostgreSQL database architectures, and secure RESTful APIs with elegant user experiences.",
      exploreProjects: 'Explore Projects',
      contactMe: 'Contact Me',
      statYears: '5+',
      statYearsLabel: 'Years of Experience',
      statProjects: '20+',
      statProjectsLabel: 'Enterprise Systems Delivered',
      statQuality: '100%',
      statQualityLabel: 'Security & Reliability',
      statSupport: '24/7',
      statSupportLabel: 'Support & Maintenance',
    },
    about: {
      badge: 'Engineering Excellence',
      title: 'Technical Highlights & Principles',
      subtitle:
        'Delivering real-world software solutions that combine high performance, security-first mindset, and refined user experience.',
      securityTitle: 'Security-First Mindset',
      securityDesc: 'Strict protection against injection vulnerabilities (SQLi, XSS, CSRF), session encryption, and secure authentication.',
      archTitle: 'Clean & Scalable Architecture',
      archDesc: 'Maintainable, testable, and modular codebase built according to modern industry standards.',
      dbTitle: 'Optimized Databases',
      dbDesc: 'Smart indexing, robust data integrity, and sub-millisecond query performance on PostgreSQL.',
      performanceTitle: 'Lightning Fast Interfaces',
      performanceDesc: 'Responsive and pixel-perfect interfaces designed for mobile, tablet, and desktop devices.',
    },
    services: {
      badge: 'Professional Services',
      title: 'How Can I Help Your Business?',
      subtitle: 'End-to-end software development services from conceptualization and design to deployment and security.',
      requestService: 'Request Service',
    },
    skills: {
      badge: 'Technical Capabilities',
      title: 'Technologies & Skills Matrix',
      subtitle: 'A versatile toolkit of modern languages, frameworks, databases, and development tools.',
      all: 'All Skills',
    },
    projects: {
      badge: 'Showcase Portfolio',
      title: 'Featured Projects & Systems',
      subtitle: 'Real-world enterprise systems, cloud platforms, and modern web applications I built.',
      allProjects: 'All Projects',
      featured: 'Featured',
      completed: 'Completed',
      viewDetails: 'View Details',
      addReview: 'Rate Project',
      liveDemo: 'Live Demo',
      githubRepo: 'GitHub Repo',
      reviewsCount: 'reviews',
    },
    projectDetails: {
      backToProjects: 'Back to all projects',
      problemTitle: 'The Challenge & Problem',
      solutionTitle: 'The Engineering Solution',
      featuresTitle: 'Key System Features',
      techStackTitle: 'Technologies Used',
      detailedOverview: 'Detailed Overview',
      reviewsTitle: 'Client & Peer Reviews on this Project',
      averageRating: 'Rating',
      outOf5: 'out of 5',
      approvedReviews: 'verified reviews',
      writeReview: 'Write a Review',
      noReviews: 'No reviews published yet for this project. Be the first to review!',
    },
    experience: {
      badge: 'Career Journey',
      title: 'Work Experience & Milestones',
      subtitle: 'A proven track record of engineering scalable platforms and leading successful technical implementations.',
      present: 'Present',
    },
    reviews: {
      badge: 'Testimonials',
      title: 'Verified Client Reviews',
      subtitle: 'Feedback from clients and partners who experienced the quality and reliability of my work.',
      addReviewBtn: 'Add Your Review',
      verifiedReview: 'Verified Review',
      firstToReview: 'Be the first to share your feedback about our work!',
      beTheFirst: 'Write First Review',
      projectLabel: 'Project',
    },
    reviewModal: {
      badge: 'Client Review',
      modalTitle: 'Share Your Experience',
      modalTitleWithProject: 'Review Project:',
      modalSubtitle: 'Your feedback will be published immediately to help others learn about our collaboration.',
      nameLabel: 'Full Name *',
      namePlaceholder: 'e.g. Dr. Ahmed Al-Salem',
      emailLabel: 'Email Address (Optional)',
      emailPlaceholder: 'email@example.com',
      commentLabel: 'Your Review & Comments *',
      commentPlaceholder: 'Share your feedback about work quality, communication, and results...',
      submitBtn: 'Submit Review',
      submitting: 'Submitting...',
      successMessage: 'Thank you! Your review has been submitted and published successfully.',
    },
    contact: {
      badge: 'Start Collaboration',
      title: "Let's Build Something Great Together",
      subtitle: 'Have a project in mind or need enterprise software consulting? Reach out directly.',
      whatsappTitle: 'WhatsApp Direct',
      whatsappDesc: 'Fast direct chat for technical inquiries and project scopes',
      whatsappAction: 'Chat on WhatsApp',
      emailTitle: 'Email Address',
      emailAction: 'Send an Email',
      locationTitle: 'Location & Availability',
    },
    footer: {
      title: 'Ryan Osama',
      role: 'Full-Stack Software Engineer',
      bio: 'Specialized in architecting secure cloud platforms, database optimization, and modern web solutions.',
      rights: 'All Rights Reserved ©',
      securedSystem: 'Secured & Hardened System',
      adminLink: 'Admin Portal',
    },
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      about: 'نبذة عني',
      services: 'الخدمات',
      skills: 'المهارات',
      projects: 'المشاريع',
      experience: 'الخبرات',
      reviews: 'آراء العملاء',
      contact: 'تواصل معي',
      requestProject: 'طلب مشروع',
      adminPortal: 'بوابة الإدارة',
      language: 'English',
    },
    hero: {
      availabilityBadge: 'متاح لاستقبال مشاريع الأنظمة والاستشارات البرمجية',
      headline: 'بناء الأنظمة السحابية والحلول الرقمية',
      headlineHighlight: 'بأعلى معايير الأمان والأداء',
      subheadline:
        'أنا ريان أسامة، مهندس برمجيات متخصص في تطوير المنصات المؤسسية المتكاملة، وتصميم قواعد البيانات المتقدمة، وبناء الواجهات البرمجية الآمنة مع تجربة مستخدم سلسة وعصرية.',
      exploreProjects: 'استكشف سابقة الأعمال',
      contactMe: 'تواصل لمناقشة مشروعك',
      statYears: '5+',
      statYearsLabel: 'سنوات من الخبرة العملية',
      statProjects: '20+',
      statProjectsLabel: 'أنظمة ومنصات منجزة',
      statQuality: '100%',
      statQualityLabel: 'أمان وموثوقية عالية',
      statSupport: '24/7',
      statSupportLabel: 'دعم وتطوير مستمر',
    },
    about: {
      badge: 'منهجية العمل الهندسية',
      title: 'نبذة عن خبراتي ومبادئ التطوير',
      subtitle: 'أركز على بناء حلول برمجية واقعية تجمع بين الأداء الخارق وتجربة المستخدم الأنيقة والأمان المشدد.',
      securityTitle: 'أمان البيانات أولاً',
      securityDesc: 'حماية كاملة من ثغرات الحقن (SQLi/XSS/CSRF) مع تشفير الجلسات والمصادقة المتقدمة.',
      archTitle: 'بنية برمجية نظيفة (Clean Architecture)',
      archDesc: 'كود منظم وقابل للتوسع والصيانة بسهولة تامة مع الالتزام بأفضل الممارسات العالمية.',
      dbTitle: 'قواعد بيانات محسنة وسريعة',
      dbDesc: 'تصميم فهارس ذكية وعلاقات متينة مع استعلامات فورية في أجزاء من الثانية على PostgreSQL.',
      performanceTitle: 'واجهات فائقة السرعة والتفاعل',
      performanceDesc: 'تجربة مستخدم حديثة وتوافق تام مع كافة أحجام الشاشات والهواتف الذكية.',
    },
    services: {
      badge: 'الخدمات الاحترافية',
      title: 'ما الذي يمكنني تقديمه لمشروعك؟',
      subtitle: 'خدمات متكاملة تغطي كافة مراحل تطوير البرمجيات من الفكرة والتصميم وحتى النشر والحماية.',
      requestService: 'طلب هذه الخدمة',
    },
    skills: {
      badge: 'الكفاءات التقنية',
      title: 'المهارات والتقنيات البرمجية',
      subtitle: 'مجموعة متكاملة من التقنيات والأطر البرمجية التي أعتمد عليها في بناء الأنظمة المتطورة.',
      all: 'جميع المهارات',
    },
    projects: {
      badge: 'معرض الأعمال الحية',
      title: 'المشاريع والأنظمة المنجزة',
      subtitle: 'استعراض نماذج واقعية من الأنظمة المؤسسية وتطبيقات الويب التي قمت بتطويرها.',
      allProjects: 'جميع المشاريع',
      featured: 'مميز',
      completed: 'مكتمل',
      viewDetails: 'تفاصيل المشروع',
      addReview: 'تقييم المشروع',
      liveDemo: 'معاينة حية',
      githubRepo: 'المستودع',
      reviewsCount: 'تقييم',
    },
    projectDetails: {
      backToProjects: 'العودة إلى كافة المشاريع',
      problemTitle: 'التحدي والمشكلة (The Problem)',
      solutionTitle: 'الحل الهندسي (The Solution)',
      featuresTitle: 'أبرز مزايا ووظائف النظام',
      techStackTitle: 'التقنيات والأدوات المستخدمة',
      detailedOverview: 'الوصف التفصيلي',
      reviewsTitle: 'تقييمات وآراء المستخدمين حول هذا المشروع',
      averageRating: 'التقييم',
      outOf5: 'من 5',
      approvedReviews: 'تقييم معتمد',
      writeReview: 'كتابة تقييم',
      noReviews: 'لا توجد تقييمات منشورة لهذا المشروع بعد. كن أول من يضيف انطباعه!',
    },
    experience: {
      badge: 'المسيرة المهنية',
      title: 'الخبرات والمحطات العملية',
      subtitle: 'سجل حافل في قيادة وتنفيذ المشاريع البرمجية الحساسة وإدارة فرق التطوير.',
      present: 'حتى الآن',
    },
    reviews: {
      badge: 'آراء العملاء والشركاء',
      title: 'تقييمات وتجارب حقيقية',
      subtitle: 'انطباعات العملاء والمؤسسات التي تشرفت بالعمل معهم على بناء أنظمتهم البرمجية.',
      addReviewBtn: 'أضف تقييمك وانطباعك',
      verifiedReview: 'تقييم معتمد',
      firstToReview: 'كن أول من يشاركنا رأيه في جودة الأعمال والخدمات المقدمة!',
      beTheFirst: 'كتابة أول تقييم',
      projectLabel: 'مشروع',
    },
    reviewModal: {
      badge: 'تقييم تجربة العميل',
      modalTitle: 'شاركنا رأيك وتجربتك',
      modalTitleWithProject: 'إضافة رأي حول:',
      modalSubtitle: 'رأيك يهمنا ويتم نشره مباشرة لمشاركة تجربتك وانطباعك.',
      nameLabel: 'الاسم الكامل *',
      namePlaceholder: 'مثال: المهندس أحمد السالم',
      emailLabel: 'البريد الإلكتروني (اختياري)',
      emailPlaceholder: 'email@example.com',
      commentLabel: 'رأيك أو ملاحظتك حول العمل *',
      commentPlaceholder: 'اكتب انطباعك، جودة العمل، والتعامل...',
      submitBtn: 'إرسال التقييم',
      submitting: 'جاري الإرسال...',
      successMessage: 'شكراً لك! تم إرسال تقييمك ونشره بنجاح.',
    },
    contact: {
      badge: 'بدء التعاون البرمجي',
      title: 'دعنا نحول فكرتك إلى نظام واقعي',
      subtitle: 'هل لديك فكرة مشروع جديد، أو تحتاج إلى تطوير منصة سحابية آمنة؟ تواصل معي مباشرة عبر القنوات التالية.',
      whatsappTitle: 'واتساب (WhatsApp)',
      whatsappDesc: 'محادثة مباشرة وسريعة لمناقشة المتطلبات الفنية',
      whatsappAction: 'محادثة فورية على واتساب',
      emailTitle: 'البريد الإلكتروني',
      emailAction: 'إرسال بريد إلكتروني',
      locationTitle: 'الموقع والعمل',
    },
    footer: {
      title: 'ريان أسامة',
      role: 'Full-Stack Software Engineer',
      bio: 'مهندس برمجيات متخصص في بناء وتطوير الأنظمة السحابية المتقدمة وحلول الويب عالية الأمان والكفاءة.',
      rights: 'جميع الحقوق محفوظة ©',
      securedSystem: 'نظام مؤمن ومحمي بالكامل',
      adminLink: 'بوابة الإدارة',
    },
  },
};
