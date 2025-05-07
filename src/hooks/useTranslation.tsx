
import React, { createContext, useContext, useState } from 'react';

// Define the shape of our translations
interface Translations {
  [key: string]: {
    en: string;
    pt: string;
  };
}

// All translations
const translations: Translations = {
  'portfolio.title': {
    en: 'Renan Monteiro',
    pt: 'Renan Monteiro',
  },
  'portfolio.subtitle': {
    en: 'Software Engineer',
    pt: 'Engenheiro de Software',
  },
  'nav.home': {
    en: 'Home',
    pt: 'Início',
  },
  'nav.projects': {
    en: 'Projects',
    pt: 'Projetos',
  },
  'nav.about': {
    en: 'About',
    pt: 'Sobre',
  },
  'nav.contact': {
    en: 'Contact',
    pt: 'Contato',
  },
  'featured.title': {
    en: 'FEATURED PROJECT',
    pt: 'PROJETO EM DESTAQUE',
  },
  'featured.description': {
    en: 'Ask about Renan Monteiro:',
    pt: 'Pergunte sobre Renan Monteiro:',
  },
  'featured.placeholder': {
    en: 'Type your message here',
    pt: 'Digite sua mensagem aqui',
  },
  'featured.send': {
    en: 'SEND',
    pt: 'ENVIAR',
  },
  'featured.response': {
    en: 'Response',
    pt: 'Resposta',
  },
  'projects.title': {
    en: 'Projects',
    pt: 'Projetos',
  },
  'projects.viewMore': {
    en: 'View More',
    pt: 'Ver Mais',
  },
  'project1.description': {
    en: 'MSSQL backups optimized with Go concurrency',
    pt: 'Backups MSSQL otimizados com concorrência em Go',
  },
  'project2.description': {
    en: 'Monitoring. Collecting. Everything.',
    pt: 'Monitoramento. Coletando. Tudo.',
  },
  'project3.description': {
    en: 'Observability anytime, anywhere',
    pt: 'Observabilidade a qualquer hora, em qualquer lugar',
  },
  'project4.description': {
    en: 'Authentication with JWT\'s flexibility',
    pt: 'Autenticação com a flexibilidade de JWT',
  },
  'about.title': {
    en: 'About Me',
    pt: 'Sobre Mim',
  },
  'about.description': {
    en: 'I am a DevOps and Infrastructure Analyst with strong experience in server administration (Linux and Windows), virtualization (Proxmox), and cloud platforms like Azure and Oracle Cloud. I specialize in automating infrastructure using tools like Ansible and Docker, and I develop infrastructure-as-code (IaC) solutions to streamline operations.\n\nIn programming, I work with Go—using frameworks like Gin for building high-performance APIs—and Python, using frameworks such as FastAPI and Flask for backend and automation projects. I also create intelligent automation workflows that integrate AI agents to enhance infrastructure management and operational efficiency.\n\nMy Data Science experience includes building data pipelines and storage solutions with MinIO, working with relational and NoSQL databases (MySQL, SQL Server, MongoDB), and developing AI-based systems for predictive analytics and intelligent decision-making. I regularly use monitoring and observability tools like Grafana and Zabbix to ensure system reliability and performance.',
    pt: 'Sou um Analista de DevOps e Infraestrutura com forte experiência em administração de servidores (Linux e Windows), virtualização (Proxmox) e plataformas de nuvem como Azure e Oracle Cloud. Sou especializado na automação de infraestrutura usando ferramentas como Ansible e Docker, e desenvolvo soluções de infraestrutura como código (IaC) para otimizar operações.\n\nEm programação, trabalho com Go — usando frameworks como Gin para construir APIs de alto desempenho — e Python, usando frameworks como FastAPI e Flask para projetos de backend e automação. Também crio fluxos de trabalho de automação inteligente que integram agentes de IA para aprimorar o gerenciamento de infraestrutura e a eficiência operacional.\n\nMinha experiência em Ciência de Dados inclui a construção de pipelines de dados e soluções de armazenamento com MinIO, trabalho com bancos de dados relacionais e NoSQL (MySQL, SQL Server, MongoDB) e desenvolvimento de sistemas baseados em IA para análises preditivas e tomada de decisões inteligentes. Regularmente uso ferramentas de monitoramento e observabilidade como Grafana e Zabbix para garantir a confiabilidade e o desempenho do sistema.',
  },
  'contact.title': {
    en: 'Contact',
    pt: 'Contato',
  },
  'contact.subtitle': {
    en: "Let's work together!",
    pt: 'Vamos trabalhar juntos!',
  },
  'contact.name': {
    en: 'Name',
    pt: 'Nome',
  },
  'contact.surname': {
    en: 'Surname',
    pt: 'Sobrenome',
  },
  'contact.email': {
    en: 'Email',
    pt: 'Email',
  },
  'contact.message': {
    en: 'Message',
    pt: 'Mensagem',
  },
  'contact.send': {
    en: 'Send Message',
    pt: 'Enviar Mensagem',
  },
  'footer.rights': {
    en: '© 2025 Renan Monteiro. All rights reserved.',
    pt: '© 2025 Renan Monteiro. Todos os direitos reservados.',
  },
  
  // Contact success and error messages
  'contact.success.title': {
    en: 'Message sent',
    pt: 'Mensagem enviada',
  },
  'contact.success.description': {
    en: 'Your message has been sent successfully.',
    pt: 'Sua mensagem foi enviada com sucesso.',
  },
  'contact.error.title': {
    en: 'Error',
    pt: 'Erro',
  },
  'contact.error.description': {
    en: 'Failed to send your message. Please try again later.',
    pt: 'Falha ao enviar sua mensagem. Por favor, tente novamente mais tarde.',
  },
};

// Create context for translations
interface TranslationContextType {
  language: 'en' | 'pt';
  setLanguage: (lang: 'en' | 'pt') => void;
  t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

// Provider component
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'pt'>('en');

  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translations[key][language] || key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

// Hook for consuming translations
export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
