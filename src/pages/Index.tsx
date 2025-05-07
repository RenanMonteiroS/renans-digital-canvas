
import React from 'react';
import { LanguageProvider } from '@/hooks/useTranslation';
import { useTranslation } from '@/hooks/useTranslation';
import LanguageToggle from '@/components/LanguageToggle';
import FeaturedProject from '@/components/FeaturedProject';
import ProjectCard from '@/components/ProjectCard';
import ContactForm from '@/components/ContactForm';
import { Separator } from '@/components/ui/separator';

// We'll wrap the internal component with the LanguageProvider
const IndexContent: React.FC = () => {
  const { t } = useTranslation();

  const projects = [
    {
      title: 'MaestroSQL',
      description: t('project1.description'),
      imageSrc: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      githubLink: 'https://github.com/RenanMonteiroS/MaestroSQL',
      viewMoreText: t('projects.viewMore'),
    },
    {
      title: 'Collector',
      description: t('project2.description'),
      imageSrc: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      githubLink: 'https://github.com/RenanMonteiroS/MaestroSQL',
      viewMoreText: t('projects.viewMore'),
    },
    {
      title: 'Atalaya',
      description: t('project3.description'),
      imageSrc: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      githubLink: 'https://github.com/RenanMonteiroS/MaestroSQL',
      viewMoreText: t('projects.viewMore'),
    },
    {
      title: 'Osi',
      description: t('project4.description'),
      imageSrc: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      githubLink: 'https://github.com/RenanMonteiroS/MaestroSQL',
      viewMoreText: t('projects.viewMore'),
    },
  ];

  // Convert newline characters to paragraph breaks
  const formatDescription = (text: string) => {
    return text.split('\n\n').map((paragraph, index) => (
      <p key={index} className="text-sm leading-relaxed text-gray-700 mb-4 last:mb-0">
        {paragraph}
      </p>
    ));
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="py-6 border-b border-gray-200">
        <div className="container flex flex-col items-center">
          <div className="self-end mb-4">
            <LanguageToggle />
          </div>
          <h1 className="font-serif text-3xl md:text-5xl font-medium mb-1">{t('portfolio.title')}</h1>
          <p className="text-xs uppercase tracking-widest text-gray-500">{t('portfolio.subtitle')}</p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="py-4 border-b border-gray-200">
        <div className="container">
          <ul className="flex justify-center space-x-6 md:space-x-10">
            <li>
              <a href="#" className="text-sm hover:text-purple">{t('nav.home')}</a>
            </li>
            <li>
              <a href="#projects" className="text-sm hover:text-purple">{t('nav.projects')}</a>
            </li>
            <li>
              <a href="#about" className="text-sm hover:text-purple">{t('nav.about')}</a>
            </li>
            <li>
              <a href="#contact" className="text-sm hover:text-purple">{t('nav.contact')}</a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Featured Project */}
        <section>
          <FeaturedProject />
        </section>

        <Separator className="my-0" />

        {/* Projects and About */}
        <section className="container py-16">
          <div className="flex flex-col md:flex-row gap-10">
            {/* Projects */}
            <div id="projects" className="md:w-3/5">
              <h2 className="section-title mb-10">{t('projects.title')}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-12">
                {projects.map((project, index) => (
                  <ProjectCard
                    key={index}
                    title={project.title}
                    description={project.description}
                    imageSrc={project.imageSrc}
                    githubLink={project.githubLink}
                    viewMoreText={project.viewMoreText}
                  />
                ))}
              </div>
            </div>

            {/* About */}
            <div id="about" className="md:w-2/5">
              <h2 className="section-title mb-10">{t('about.title')}</h2>
              <div className="mb-6">
                <img
                  src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Renan Monteiro"
                  className="w-full aspect-square object-cover"
                />
              </div>
              <div>
                {formatDescription(t('about.description'))}
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-0" />

        {/* Contact */}
        <section id="contact" className="py-16">
          <ContactForm />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white py-8 border-t border-gray-200">
        <div className="container">
          <p className="text-center text-sm text-gray-500">{t('footer.rights')}</p>
        </div>
      </footer>
    </div>
  );
};

// Wrap the content with the LanguageProvider
const Index: React.FC = () => {
  return (
    <LanguageProvider>
      <IndexContent />
    </LanguageProvider>
  );
};

export default Index;
