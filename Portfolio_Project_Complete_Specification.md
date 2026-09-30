# Portfolio Project — Complete Implementation Specification

## 0. تعليمات مهمة للوكيل

هذا الملف هو المواصفات الكاملة لمشروع Portfolio شخصي احترافي.

**قبل البدء:**
- اقرأ هذا الملف كاملًا.
- لا تفترض وجود متطلبات غير مذكورة إذا كانت ستؤثر على بنية المشروع.
- المشروع يجب أن يُبنى ويُختبر **محليًا أولًا**.
- بعد اكتمال النسخة المحلية واختبارها، يتم تجهيز المشروع للإنتاج والاستضافة.
- لا تنتقل إلى الإنتاج قبل التأكد من نجاح الـ build، قاعدة البيانات، المصادقة، رفع الصور، لوحة الإدارة، المشاريع، التعليقات والتقييمات.
- يجب الحفاظ على بنية وتنظيم وجودة المشاريع السابقة للمطور، واستخدام نفس الـ stack والمبادئ التقنية المستخدمة في مشروع النظام الجامعي قدر الإمكان.

---

# المرحلة 1 — فهم المشروع

## الهدف

إنشاء Portfolio احترافي لمطور برمجيات، وليس مجرد صفحة ثابتة لعرض صور.

الهدف من الموقع:

1. تعريف الزائر بالمطور.
2. عرض الخدمات والمهارات.
3. عرض المشاريع السابقة.
4. فتح صفحة تفاصيل كاملة لكل مشروع.
5. السماح للزوار بترك تعليق وتقييم على المشاريع.
6. إعطاء Admin واحد فقط صلاحية إدارة الموقع بالكامل.
7. تمكين الـ Admin من إضافة وتعديل وحذف المشاريع والمحتوى.
8. تجهيز المشروع مستقبلًا للعمل على الاستضافة.

---

# المرحلة 2 — التقنيات المطلوبة

استخدم نفس فلسفة وتقنيات مشروع النظام الجامعي قدر الإمكان:

## Frontend

- Next.js
- React
- JavaScript أو TypeScript حسب بنية المشروع السابقة
- Vanilla CSS / CSS Modules أو نظام CSS المستخدم في المشروع الجامعي
- Responsive Design
- دعم RTL للعربية
- دعم LTR للإنجليزية إذا تمت إضافة اللغة الإنجليزية

**لا تستخدم Tailwind CSS إذا كان المشروع الجامعي يعتمد على Vanilla CSS.**

## Backend

- Node.js
- REST API
- Architecture منظمة وقابلة للتوسع
- Validation
- Authentication
- Authorization
- Error handling
- Logging عند الحاجة

## Database

- PostgreSQL
- ORM المستخدم في المشروع الجامعي، ويفضل Prisma إذا كان هو المستخدم هناك.

## Storage

الصور يجب ألا يتم حفظها بطريقة عشوائية داخل قاعدة البيانات.

يجب تصميم طبقة Storage تسمح باستخدام:
- Local Storage أثناء التطوير.
- Cloudflare R2 أو Storage مناسب في الإنتاج.

يجب أن يكون تغيير الـ storage بين Local وProduction عن طريق configuration/environment variables وليس تعديل الكود الأساسي.

---

# المرحلة 3 — هيكل النظام

المشروع يتكون منطقيًا من:

## Public Website

للزوار:

- Home
- About
- Services
- Skills
- Projects
- Project Details
- Experience / Achievements
- Testimonials / Reviews
- Contact

## Admin Dashboard

للـ Admin فقط:

- Dashboard
- Projects Management
- Categories Management
- Technologies Management
- Services Management
- Skills Management
- Experience Management
- Reviews / Comments Management
- Site Settings
- Media Management إذا لزم الأمر

---

# المرحلة 4 — Admin Authentication

يوجد **Admin واحد فقط** في النظام.

لا يوجد:
- Register
- إنشاء Admin من الموقع
- إنشاء مستخدمين إداريين آخرين
- نظام Roles معقد إذا لم تكن هناك حاجة له

يجب أن يكون حساب Admin محددًا مسبقًا في قاعدة البيانات أو Seeder آمن.

بيانات الحساب الأولية التي قدمها صاحب المشروع:

Username:
Ryan_osama

Password:
W_s87809*

**ملاحظة أمنية مهمة:**
- لا تضع كلمة المرور مباشرة داخل Source Code.
- لا تعرض كلمة المرور في الواجهة.
- يجب تخزينها كـ password hash باستخدام خوارزمية آمنة مثل Argon2 أو bcrypt حسب الـ stack.
- يفضل استخدام Environment Variable أثناء عملية إنشاء الحساب الأول.
- بعد إنشاء الحساب، لا يتم إظهار كلمة المرور مرة أخرى.
- لا يوجد Endpoint يسمح بإنشاء Admin جديد.

يفضل إضافة:
- Login rate limiting
- Session management
- Secure cookies
- CSRF protection حسب architecture
- Password hashing
- Validation
- Protection من brute-force
- Logout
- حماية جميع Admin API routes

---

# المرحلة 5 — قاعدة البيانات

يجب تصميم Database نظيفة وقابلة للتوسع.

الجداول المقترحة:

## admins

- id
- username
- password_hash
- created_at
- updated_at
- last_login_at

## projects

- id
- title
- slug
- short_description
- description
- category_id
- cover_image
- live_url
- github_url
- status
- is_featured
- sort_order
- created_at
- updated_at

## project_images

- id
- project_id
- image_url
- alt_text
- sort_order
- created_at

## categories

- id
- name
- slug
- description
- created_at
- updated_at

## technologies

- id
- name
- slug
- icon
- created_at
- updated_at

## project_technologies

- project_id
- technology_id

## project_features

- id
- project_id
- title
- description
- sort_order

## services

- id
- title
- description
- icon
- sort_order
- is_active
- created_at
- updated_at

## skills

- id
- name
- category
- icon
- level
- sort_order
- is_active

## experiences

- id
- title
- organization
- description
- start_date
- end_date
- is_current
- sort_order

## reviews

- id
- project_id
- name
- email (اختياري حسب قرار التصميم)
- rating
- comment
- status
- created_at
- updated_at

Review status:

- pending
- approved
- rejected

**التوصية:** التعليقات الجديدة لا تظهر للعامة مباشرة. تدخل Pending ثم يقوم Admin بمراجعتها والموافقة عليها.

## site_settings

لتخزين إعدادات الموقع العامة مثل:

- site_name
- owner_name
- headline
- bio
- profile_image
- email
- phone / WhatsApp
- GitHub
- LinkedIn
- location
- SEO title
- SEO description
- favicon
- وغيرها.

---

# المرحلة 6 — Projects Management

هذه أهم لوحة في النظام.

يجب أن يستطيع Admin:

### إضافة مشروع

الحقول:

- اسم المشروع
- Slug
- وصف مختصر
- وصف كامل
- التصنيف
- صورة رئيسية
- صور إضافية
- التقنيات المستخدمة
- مميزات المشروع
- رابط Live Demo
- رابط GitHub
- حالة المشروع
- Featured
- ترتيب المشروع

### تعديل مشروع

تعديل أي بيانات سابقة.

### حذف مشروع

مع Confirmation واضح.

ويجب الانتباه إلى العلاقات مع:
- الصور
- التقنيات
- المميزات
- التعليقات

### ترتيب المشاريع

إمكانية تحديد:
- Featured
- Sort Order

بحيث يمكن التحكم في ترتيب ظهور المشاريع.

---

# المرحلة 7 — صفحة تفاصيل المشروع

كل مشروع يجب أن يكون له URL مستقل مثل:

/projects/project-slug

الصفحة تعرض:

1. اسم المشروع
2. صورة Cover
3. معرض الصور
4. وصف مختصر
5. المشكلة التي يحلها المشروع
6. الحل
7. المميزات
8. التقنيات المستخدمة
9. رابط الموقع
10. رابط GitHub
11. معلومات إضافية
12. Reviews
13. نموذج إضافة Review

الفكرة:

المشروع لا يُعرض كصورة فقط.

يجب أن يفهم العميل:

Problem → Solution → Features → Technologies → Result

---

# المرحلة 8 — Comments & Ratings

أي زائر يستطيع إضافة:

- الاسم
- التقييم من 1 إلى 5
- التعليق

ويجب حماية النظام من:
- Spam
- Flooding
- XSS
- HTML/Script injection
- الطلبات الآلية قدر الإمكان

التقييم يجب أن يكون من:

1 / 5
2 / 5
3 / 5
4 / 5
5 / 5

## Moderation

أي Review جديد يكون:

pending

ولا يظهر للعامة إلا بعد موافقة Admin.

Admin يستطيع:

- مشاهدة التعليقات
- الموافقة
- الرفض
- الحذف
- فلترة التعليقات
- البحث
- مشاهدة المشروع المرتبط بالتعليق

إذا كان التعليق مسيئًا، يستطيع Admin حذفه نهائيًا.

يجب عدم إعطاء الزائر أي صلاحية إدارية.

---

# المرحلة 9 — Dashboard

Dashboard احترافي يعرض إحصائيات مثل:

- عدد المشاريع
- المشاريع المميزة
- عدد التعليقات
- التعليقات المعلقة
- متوسط التقييمات
- عدد التقنيات
- عدد الخدمات

مع Quick Actions:

- إضافة مشروع
- مراجعة التعليقات
- تعديل إعدادات الموقع

---

# المرحلة 10 — Public Homepage

## Hero

يعرض:

- الاسم
- الوظيفة / التخصص
- جملة تعريفية
- CTA لمشاهدة المشاريع
- CTA للتواصل

## About

نبذة احترافية.

## Services

الخدمات.

## Skills

التقنيات.

## Featured Projects

عرض المشاريع التي حددها Admin كـ Featured.

## Experience

الخبرات.

## Reviews

التعليقات المقبولة.

## Contact

طرق التواصل.

---

# المرحلة 11 — التصميم وتجربة المستخدم

التصميم يجب أن يكون:

- Modern
- Professional
- Clean
- Fast
- Responsive
- Mobile First
- مناسب لمطور برمجيات
- مناسب للعملاء والشركات

يجب الاهتمام بـ:

- Typography
- Spacing
- Cards
- Buttons
- Hover states
- Loading states
- Empty states
- Error states
- Skeleton loading إذا كان مناسبًا
- Toast notifications
- Confirmation dialogs

---

# المرحلة 12 — اللغة

الموقع يجب أن يكون جاهزًا لدعم:

- العربية
- الإنجليزية

العربية:
- RTL

الإنجليزية:
- LTR

يجب عدم خلط اتجاه الصفحة.

ويفضل أن تكون النصوص القابلة للترجمة منظمة وليس Hard-coded في كل مكان.

---

# المرحلة 13 — SEO

كل مشروع يجب أن يكون له:

- SEO title
- SEO description
- Open Graph image
- Canonical URL

الموقع بشكل عام يجب أن يحتوي على:

- Metadata
- Sitemap
- robots.txt
- Favicon
- Open Graph
- Twitter/X metadata إذا كان مناسبًا

يجب تحسين صفحات المشاريع لمحركات البحث.

---

# المرحلة 14 — Security

الأمان جزء أساسي من المشروع.

يجب تطبيق:

- Password hashing
- Secure authentication
- Rate limiting
- Input validation
- Output sanitization
- XSS protection
- SQL injection protection عبر ORM
- Secure HTTP headers
- CORS configuration
- Secure cookies
- Authorization checks
- Admin route protection
- File upload validation
- File size limits
- Allowed image MIME types
- Protection من رفع ملفات ضارة
- Logging للأحداث المهمة

لا تعتمد على إخفاء زر Admin كوسيلة حماية.

كل Admin API يجب أن يتحقق من Authentication وAuthorization من Backend.

---

# المرحلة 15 — Image Upload

رفع الصور يجب أن يدعم:

- JPG
- JPEG
- PNG
- WebP

مع:
- حجم أقصى للملف
- Validation
- إعادة تسمية آمنة للملف
- منع امتدادات خطيرة
- حذف الصورة القديمة عند استبدالها إذا كانت غير مستخدمة

في Local:
- يمكن استخدام local storage.

في Production:
- جهز architecture متوافقة مع Cloudflare R2.

---

# المرحلة 16 — API

صمم API منظمة.

أمثلة:

GET /api/projects

GET /api/projects/:slug

GET /api/categories

GET /api/technologies

GET /api/services

GET /api/skills

GET /api/experiences

GET /api/reviews/project/:projectId

POST /api/reviews

Admin:

POST /api/admin/login

POST /api/admin/logout

GET /api/admin/dashboard

POST /api/admin/projects

PUT /api/admin/projects/:id

DELETE /api/admin/projects/:id

POST /api/admin/projects/:id/images

DELETE /api/admin/projects/:id/images/:imageId

GET /api/admin/reviews

PATCH /api/admin/reviews/:id/approve

PATCH /api/admin/reviews/:id/reject

DELETE /api/admin/reviews/:id

يجب تعديل المسارات إذا كان Architecture المشروع يحتاج ذلك، لكن يجب الحفاظ على الفصل بين Public وAdmin APIs.

---

# المرحلة 17 — Validation & Error Handling

كل API يجب أن يكون لديه:

- Input validation
- Consistent response structure
- HTTP status codes صحيحة
- Error messages واضحة
- عدم تسريب تفاصيل حساسة في Production

مثال منطقي للاستجابة:

{
  "success": true,
  "data": {}
}

وعند الخطأ:

{
  "success": false,
  "message": "Something went wrong"
}

مع عدم إظهار stack traces للمستخدم في Production.

---

# المرحلة 18 — Admin UX

لوحة الإدارة يجب أن تكون عملية وليست مجرد CRUD بسيط.

مثال:

Projects
├── All Projects
├── Add Project
├── Featured
└── Categories

Reviews
├── Pending
├── Approved
└── Rejected

Settings
├── Profile
├── Social Links
├── SEO
└── Site Information

---

# المرحلة 19 — Local Development

ابدأ بالمشروع محليًا.

المطلوب:

1. إنشاء المشروع.
2. إعداد PostgreSQL.
3. إعداد Environment Variables.
4. إنشاء migrations.
5. إنشاء seed.
6. إنشاء Admin.
7. تشغيل Backend.
8. تشغيل Frontend.
9. اختبار API.
10. اختبار Dashboard.
11. اختبار رفع الصور.
12. اختبار المشاريع.
13. اختبار Reviews.
14. اختبار Login.
15. اختبار Mobile Responsive.

---

# المرحلة 20 — Environment Variables

استخدم `.env` ولا تضع الأسرار داخل Git.

أمثلة:

DATABASE_URL=

JWT_SECRET= أو SESSION_SECRET=

NEXT_PUBLIC_API_URL=

STORAGE_DRIVER=local

R2_ACCOUNT_ID=

R2_ACCESS_KEY_ID=

R2_SECRET_ACCESS_KEY=

R2_BUCKET=

R2_PUBLIC_URL=

ADMIN_USERNAME=

ADMIN_INITIAL_PASSWORD=

يجب إضافة `.env.example` بدون أسرار حقيقية.

---

# المرحلة 21 — Git

يجب إعداد:

.gitignore

ويجب ألا يتم رفع:

- .env
- كلمات المرور
- API keys
- Secrets
- ملفات Storage الخاصة
- node_modules

يجب إنشاء commits منطقية أثناء التطوير.

---

# المرحلة 22 — Testing

اختبر على الأقل:

## Authentication

- Login صحيح
- Login خاطئ
- Rate limiting
- Logout
- الوصول إلى Dashboard بدون Login
- محاولة الوصول إلى Admin API بدون Authentication

## Projects

- إنشاء
- تعديل
- حذف
- رفع صور
- حذف صور
- Featured
- Slug

## Reviews

- إنشاء Review
- Rating validation
- Pending
- Approve
- Reject
- Delete
- منع XSS

## Public Website

- Home
- Projects
- Project Details
- Reviews
- Contact
- Mobile

---

# المرحلة 23 — Production Preparation

بعد نجاح النسخة المحلية:

1. Build Frontend.
2. Build Backend.
3. تشغيل Production mode محليًا.
4. اختبار Production build.
5. إعداد PostgreSQL Production.
6. إعداد Environment Variables.
7. إعداد Storage.
8. إعداد Domain.
9. إعداد HTTPS.
10. إعداد Reverse Proxy إذا كان مطلوبًا.
11. إعداد Process Manager إذا كان مطلوبًا.
12. إعداد CORS.
13. إعداد Security Headers.
14. تشغيل migrations.
15. إنشاء Admin بطريقة آمنة.
16. اختبار الموقع بعد النشر.

---

# المرحلة 24 — لا تنفذ الاستضافة الآن

المرحلة الأولى المطلوبة هي:

**LOCAL DEVELOPMENT ONLY**

لا تقم برفع المشروع إلى Server حتى يتم الانتهاء من:

- Database
- Backend
- Frontend
- Authentication
- Admin Dashboard
- Projects
- Reviews
- Uploads
- SEO
- Security
- Responsive Design
- Testing

وبعد نجاح كل شيء محليًا يتم الانتقال إلى Production Deployment كمرحلة منفصلة.

---

# المرحلة 25 — Definition of Done

لا يعتبر المشروع مكتملًا إلا إذا:

- يستطيع الزائر تصفح الموقع.
- يستطيع مشاهدة المشاريع.
- يستطيع فتح تفاصيل كل مشروع.
- يستطيع إضافة تقييم وتعليق.
- التعليق لا يظهر مباشرة قبل المراجعة.
- يستطيع Admin مراجعة التعليقات.
- يستطيع Admin حذف التعليقات المسيئة.
- يستطيع Admin إضافة مشاريع كاملة.
- يستطيع Admin تعديل المشاريع.
- يستطيع Admin حذف المشاريع.
- يستطيع Admin إدارة الصور.
- يستطيع Admin إدارة التقنيات.
- يستطيع Admin إدارة الخدمات.
- يستطيع Admin إدارة معلومات الموقع.
- Admin واحد فقط يستطيع الدخول.
- لا يوجد Register للأدمن.
- كلمات المرور والأسرار غير موجودة في Git.
- الموقع Responsive.
- الموقع يدعم RTL.
- API محمية.
- Uploads محمية.
- Build يعمل بدون أخطاء.
- Production build يعمل محليًا.
- المشروع جاهز للانتقال إلى الاستضافة.

---

# ترتيب التنفيذ المطلوب

نفذ المشروع بالترتيب التالي:

### Phase 1
تحليل المشروع وتحديد Architecture.

### Phase 2
تهيئة المشروع وGit والـ Environment.

### Phase 3
Database + Prisma/ORM + migrations.

### Phase 4
Authentication + Admin.

### Phase 5
Backend APIs.

### Phase 6
Admin Dashboard.

### Phase 7
Project Management.

### Phase 8
Public Portfolio.

### Phase 9
Project Details.

### Phase 10
Reviews & Ratings.

### Phase 11
Services / Skills / Experience / Settings.

### Phase 12
Image Storage.

### Phase 13
SEO + Performance.

### Phase 14
Security Hardening.

### Phase 15
Testing.

### Phase 16
Production build محليًا.

### Phase 17
Production Deployment لاحقًا.

---

# قاعدة مهمة للوكيل

لا تبدأ بكتابة كل المشروع دفعة واحدة.

اعمل Phase by Phase.

بعد الانتهاء من كل Phase:
- شغّل المشروع.
- اختبر الوظائف.
- أصلح الأخطاء.
- تأكد من عدم كسر الوظائف السابقة.
- ثم انتقل للمرحلة التالية.

إذا وجدت اختلافًا بين هذه المواصفات وبين بنية مشروع النظام الجامعي، فحافظ على المبادئ والتقنيات المشتركة، لكن اختر architecture أنظف وأكثر مناسبة للـ Portfolio.

الهدف النهائي هو Portfolio احترافي حقيقي قابل للاستخدام في تقديم الخدمات والعملاء، وليس Demo أو Template فقط.
