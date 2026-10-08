import { prisma } from '@/lib/prisma';
import { ToastProvider } from '@/components/Toast';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { ServicesSection } from '@/components/ServicesSection';
import { SkillsSection } from '@/components/SkillsSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { ReviewsSection } from '@/components/ReviewsSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';

export const revalidate = 60; // ISR revalidate every minute

async function getPortfolioData() {
  const [categories, technologies, services, skills, experiences, projects, reviews, settings] =
    await Promise.all([
      prisma.category.findMany({ orderBy: { sortOrder: 'asc' } }),
      prisma.technology.findMany({ orderBy: { sortOrder: 'asc' } }),
      prisma.service.findMany({ where: { isActive: true }, orderBy: { sortOrder: 'asc' } }),
      prisma.skill.findMany({ where: { isActive: true }, orderBy: [{ sortOrder: 'asc' }, { level: 'desc' }] }),
      prisma.experience.findMany({ orderBy: [{ sortOrder: 'asc' }, { startDate: 'desc' }] }),
      prisma.project.findMany({
        orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
        include: {
          category: true,
          technologies: { include: { technology: true } },
          _count: { select: { reviews: { where: { status: 'approved' } } } },
        },
      }),
      prisma.review.findMany({
        where: { status: 'approved' },
        orderBy: { createdAt: 'desc' },
        include: { project: { select: { id: true, title: true, slug: true } } },
      }),
      prisma.siteSetting.findMany(),
    ]);

  const settingsMap: Record<string, string> = {};
  settings.forEach((s) => {
    settingsMap[s.key] = s.value;
  });

  const formattedProjects = projects.map((p) => ({
    ...p,
    technologies: p.technologies.map((t) => t.technology),
    approvedReviewsCount: p._count.reviews,
  }));

  return {
    categories,
    technologies,
    services,
    skills,
    experiences,
    projects: formattedProjects,
    reviews,
    settings: settingsMap,
  };
}

export default async function HomePage() {
  const data = await getPortfolioData();

  return (
    <ToastProvider>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection services={data.services} />
        <SkillsSection skills={data.skills} />
        <ProjectsSection projects={data.projects} categories={data.categories} />
        <ExperienceSection experiences={data.experiences} />
        <ReviewsSection reviews={data.reviews} />
        <ContactSection settings={data.settings} />
      </main>
      <Footer settings={data.settings} />
    </ToastProvider>
  );
}
