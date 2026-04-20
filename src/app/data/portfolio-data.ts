export type PortfolioTabId = 'home' | 'experience' | 'stack' | 'contact';

export type PortfolioActionKind = 'primary' | 'link';
export type PortfolioStackCategoryId = 'backend' | 'architecture' | 'frontend';
export type PortfolioContactMethodId = 'email' | 'linkedin' | 'github' | 'location';
export type PortfolioContactMethodKind = 'email' | 'link' | 'text';

export interface PortfolioSite {
  title: string;
  description: string;
  locale: string;
  defaultTab: PortfolioTabId;
}

export interface PortfolioBrand {
  fullName: string;
  displayName: string;
  initials: string;
  role: string;
  avatarUrl: string;
  avatarAlt: string;
}

export interface PortfolioTab {
  id: PortfolioTabId;
  label: string;
  mobileLabel: string;
  ariaLabel: string;
  sectionId: string;
}

export interface PortfolioAction {
  label: string;
  targetTab: PortfolioTabId;
  kind: PortfolioActionKind;
}

export interface PortfolioCurrentCompany {
  prefix: string;
  companyName: string;
  suffix: string;
}

export interface PortfolioAboutSection {
  eyebrow: string;
  headline: string;
  introParagraphs: readonly string[];
  currentCompany: PortfolioCurrentCompany;
  actions: readonly PortfolioAction[];
}

export interface PortfolioCaseStudyDetail {
  label: string;
  description: string;
}

export interface PortfolioCaseStudyMetric {
  label: string;
  description: string;
}

export interface PortfolioFeaturedCaseStudy {
  sectionTitle: string;
  title: string;
  stack: string;
  details: readonly PortfolioCaseStudyDetail[];
  metricsTitle: string;
  metrics: readonly PortfolioCaseStudyMetric[];
}

export interface PortfolioExperienceEntry {
  period: string;
  role: string;
  company: string;
  highlights: readonly string[];
  tags: readonly string[];
}

export interface PortfolioExperienceSection {
  featured: PortfolioFeaturedCaseStudy;
  historyTitle: string;
  entries: readonly PortfolioExperienceEntry[];
}

export interface PortfolioStackCategory {
  id: PortfolioStackCategoryId;
  title: string;
  items: readonly string[];
}

export interface PortfolioStackSection {
  heading: string;
  categories: readonly PortfolioStackCategory[];
}

export interface PortfolioContactMethod {
  id: PortfolioContactMethodId;
  label: string;
  value: string;
  kind: PortfolioContactMethodKind;
  href?: string;
  external?: boolean;
}

export interface PortfolioContactSection {
  heading: string;
  intro: string;
  methods: readonly PortfolioContactMethod[];
}

export interface PortfolioData {
  site: PortfolioSite;
  brand: PortfolioBrand;
  tabs: readonly PortfolioTab[];
  about: PortfolioAboutSection;
  experience: PortfolioExperienceSection;
  stack: PortfolioStackSection;
  contact: PortfolioContactSection;
}

export const PORTFOLIO_DATA = {
  site: {
    title: 'Alexandre Martins | Software Engineer',
    description:
      'Portfólio de Alexandre Martins, engenheiro de software com foco em performance, segurança e escala.',
    locale: 'pt-BR',
    defaultTab: 'home',
  },
  brand: {
    fullName: 'Alexandre Martins',
    displayName: 'Alexandre Martins',
    initials: 'AM',
    role: 'Software Engineer',
    avatarUrl: 'https://github.com/gafanhotoalexandre.png',
    avatarAlt: 'Alexandre Martins',
  },
  tabs: [
    {
      id: 'home',
      label: 'Sobre',
      mobileLabel: 'Sobre',
      ariaLabel: 'Ir para a seção Sobre',
      sectionId: 'portfolio-home-panel',
    },
    {
      id: 'experience',
      label: 'Experiência',
      mobileLabel: 'Experiência',
      ariaLabel: 'Ir para a seção Experiência',
      sectionId: 'portfolio-experience-panel',
    },
    {
      id: 'stack',
      label: 'Stack',
      mobileLabel: 'Stack',
      ariaLabel: 'Ir para a seção Stack',
      sectionId: 'portfolio-stack-panel',
    },
    {
      id: 'contact',
      label: 'Contato',
      mobileLabel: 'Contato',
      ariaLabel: 'Ir para a seção Contato',
      sectionId: 'portfolio-contact-panel',
    },
  ],
  about: {
    eyebrow: 'Software Engineer',
    headline: 'Engenharia de software com foco em performance, segurança e escala.',
    introParagraphs: [
      'Atuo na arquitetura e evolução de produtos complexos, priorizando a conformidade regulatória e a mitigação de débitos técnicos estruturais. Construo sistemas onde a estabilidade é o requisito número um.',
    ],
    currentCompany: {
      prefix: 'Atualmente na ',
      companyName: 'LegalPlus',
      suffix:
        ', desenvolvo soluções orientadas a domínio utilizando .NET 10, C# e interfaces modernas com Angular 21 e React.',
    },
    actions: [
      {
        label: 'Entrar em contato',
        targetTab: 'contact',
        kind: 'primary',
      },
      {
        label: 'Ver casos técnicos',
        targetTab: 'experience',
        kind: 'link',
      },
    ],
  },
  experience: {
    featured: {
      sectionTitle: 'Estudo de Caso Principal',
      title: 'LegalPlus: Otimização de Performance e Prevenção de Abuso',
      stack: '.NET 10 / EF Core / Clean Architecture',
      details: [
        {
          label: 'Contexto',
          description:
            'A infraestrutura do sistema jurídico enfrentava gargalos em fluxos de leitura frequente e potenciais vulnerabilidades em rotas públicas de autenticação.',
        },
        {
          label: 'Solução',
          description:
            'Conduzi a refatoração das queries críticas utilizando Entity Framework Core para eliminar o antipadrão N+1. Paralelamente, implementei uma rotina de bloqueio progressivo por IP no nível da API.',
        },
      ],
      metricsTitle: 'Impacto e Métricas',
      metrics: [
        {
          label: 'Performance',
          description:
            'Redução estimada de 15% no tempo médio de resposta nas consultas otimizadas após a remoção de carregamentos desnecessários (N+1).',
        },
        {
          label: 'Segurança',
          description:
            'Mitigação significativa das tentativas automatizadas de brute force através da nova política de rate limiting por IP.',
        },
        {
          label: 'Integração',
          description:
            'Aceleração do tempo de onboarding de novos clientes devido à padronização estruturada da documentação via OpenAPI/Swagger.',
        },
      ],
    },
    historyTitle: 'Histórico Profissional',
    entries: [
      {
        period: 'Out 2025 — Presente',
        role: 'Desenvolvedor de Software (PJ)',
        company: 'LegalPlus',
        highlights: [
          'Desacoplamento de serviços sobrecarregados aplicando injeção de dependência e princípios SOLID.',
          'Implementação de rotinas de exclusão lógica de usuários para reforçar a conformidade regulatória (LGPD).',
          'Correção de inconsistências de layout e elevação de usabilidade/acessibilidade no frontend com Angular.',
          'Revisão de código e mentoria técnica para o time de juniores e estagiários.',
        ],
        tags: ['.NET Core', 'Angular', 'Clean Architecture'],
      },
      {
        period: 'Fev 2025 — Mar 2025',
        role: 'Desenvolvedor Frontend Freelancer',
        company: 'Projeto Desculpai',
        highlights: [
          'Construção de interface responsiva integrada a APIs de IA generativa para produção de conteúdo dinâmico.',
          'Componentização estrita utilizando React e TypeScript, garantindo type safety.',
        ],
        tags: ['React', 'TypeScript', 'IA'],
      },
    ],
  },
  stack: {
    heading: 'Stack Técnica',
    categories: [
      {
        id: 'backend',
        title: 'Backend',
        items: ['C# / .NET 10', 'ASP.NET Core', 'Entity Framework Core', 'SQL Server / PostgreSQL'],
      },
      {
        id: 'architecture',
        title: 'Arquitetura',
        items: ['Clean Architecture', 'DDD Tático', 'Princípios SOLID', 'OpenAPI / Swagger'],
      },
      {
        id: 'frontend',
        title: 'Frontend',
        items: ['Angular 21', 'React', 'TypeScript', 'Tailwind CSS'],
      },
    ],
  },
  contact: {
    heading: 'Vamos Conversar',
    intro:
      'Disponível para discutir arquitetura de software, resolução de débitos técnicos ou evolução de produtos críticos. Priorizo a comunicação direta por e-mail.',
    methods: [
      {
        id: 'email',
        label: 'Email',
        value: 'alexandrevmartinsdelima@gmail.com',
        kind: 'email',
        href: 'mailto:alexandrevmartinsdelima@gmail.com',
      },
      {
        id: 'linkedin',
        label: 'LinkedIn',
        value: 'in/alemartins-lima',
        kind: 'link',
        href: 'https://linkedin.com/in/alemartins-lima',
        external: true,
      },
      {
        id: 'github',
        label: 'GitHub',
        value: 'github.com/gafanhotoalexandre',
        kind: 'link',
        href: 'https://github.com/gafanhotoalexandre',
        external: true,
      },
      {
        id: 'location',
        label: 'Local',
        value: 'Juazeiro do Norte - CE, Brasil',
        kind: 'text',
      },
    ],
  },
} as const satisfies PortfolioData;
