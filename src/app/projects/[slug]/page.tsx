import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ToastProvider } from '@/components/Toast';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProjectDetailsClient } from './ProjectDetailsClient';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await prisma.project.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!project) {
    return {
      title: 'المشروع غير موجود | ريان أسامة',
    };
  }

  return {
    title: `${project.title} | ريان أسامة`,
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} | معرض أعمال ريان أسامة`,
      description: project.shortDescription,
      type: 'article',
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = await prisma.project.findUnique({
    where: { slug },
    include: {
      category: true,
      images: { orderBy: { sortOrder: 'asc' } },
      features: { orderBy: { sortOrder: 'asc' } },
      technologies: {
        include: { technology: true },
        orderBy: { technology: { sortOrder: 'asc' } },
      },
      reviews: {
        where: { status: 'approved' },
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!project) {
    notFound();
  }

  const formattedProject = {
    ...project,
    technologies: project.technologies.map((t) => t.technology),
  };

  return (
    <ToastProvider>
      <Navbar />
      <main style={{ paddingTop: '100px', minHeight: '80vh' }}>
        <ProjectDetailsClient project={formattedProject} />
      </main>
      <Footer />
    </ToastProvider>
  );
}
