# Ryan Osama - Personal Portfolio & CMS

A modern, high-performance personal portfolio and dynamic content management system built with **Next.js**, **TypeScript**, and **Prisma ORM**.

## ✨ Features

- 🌐 **Bilingual Support**: Fully localized in Arabic and English with seamless language switching.
- 🎨 **Modern Minimalist UI**: Tailored aesthetic with dark slate styling and fluid responsive layout.
- 🛠️ **Full-Stack CMS / Admin Dashboard**:
  - Secure authentication with JWT (`jose`) and hashed passwords (`bcryptjs`).
  - Manage projects, technologies, categories, services, skills, and client reviews.
- ⚡ **Next.js App Router**: Optimized server and client components for speed and SEO.
- 🗄️ **Prisma ORM**: Type-safe database queries and migrations.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/RyanOsama/ryan-osama-portfolio.git
   cd ryan-osama-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup environment variables:
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="your-secure-jwt-secret"
   ```

4. Run database migrations / seed:
   ```bash
   npm run prisma:push
   npm run prisma:seed
   ```

5. Run development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📄 License

This project is licensed under the ISC License.
