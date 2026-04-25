import { PORTFOLIO_DATA } from './portfolio-data';

export interface RouteSeo {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  type: 'website' | 'article';
  robots?: string;
  structuredData?: Record<string, unknown> | readonly Record<string, unknown>[];
}

export const SITE_ORIGIN = 'https://io.alemartins.dev.br';
export const SITE_NAME = PORTFOLIO_DATA.site.title;
export const SITE_OG_LOCALE = 'pt_BR';
export const SITE_SOCIAL_IMAGE = `${SITE_ORIGIN}/social-preview.svg`;
export const SITE_SOCIAL_IMAGE_ALT = `Prévia visual do portfólio de ${PORTFOLIO_DATA.brand.fullName}`;

const websiteId = `${SITE_ORIGIN}#website`;
const personId = `${SITE_ORIGIN}#person`;
const locationMethod = PORTFOLIO_DATA.contact.methods.find((method) => method.id === 'location');
const sameAs = PORTFOLIO_DATA.contact.methods
  .filter((method) => method.id === 'linkedin' || method.id === 'github')
  .flatMap((method) => (method.href ? [method.href] : []));

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': websiteId,
  url: SITE_ORIGIN,
  name: SITE_NAME,
  description: PORTFOLIO_DATA.site.description,
  inLanguage: PORTFOLIO_DATA.site.locale,
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': personId,
  name: PORTFOLIO_DATA.brand.fullName,
  url: SITE_ORIGIN,
  image: SITE_SOCIAL_IMAGE,
  jobTitle: PORTFOLIO_DATA.brand.role,
  sameAs,
  address: {
    '@type': 'PostalAddress',
    addressLocality: locationMethod?.value ?? 'Juazeiro do Norte',
    addressCountry: 'BR',
  },
};

const buildPageSchema = (path: string, name: string, description: string, pageType = 'WebPage') => ({
  '@context': 'https://schema.org',
  '@type': pageType,
  url: `${SITE_ORIGIN}${path}`,
  name,
  description,
  isPartOf: { '@id': websiteId },
  about: { '@id': personId },
  inLanguage: PORTFOLIO_DATA.site.locale,
});

export const ROUTE_SEO = {
  home: {
    title: SITE_NAME,
    description: PORTFOLIO_DATA.site.description,
    image: SITE_SOCIAL_IMAGE,
    imageAlt: SITE_SOCIAL_IMAGE_ALT,
    type: 'website',
    structuredData: [websiteSchema, personSchema, buildPageSchema('/', SITE_NAME, PORTFOLIO_DATA.site.description, 'ProfilePage')],
  },
  experience: {
    title: 'Experiência | Alexandre Martins',
    description:
      'Casos técnicos, entregas recentes e impacto em performance, segurança e arquitetura conduzidos por Alexandre Martins.',
    image: SITE_SOCIAL_IMAGE,
    imageAlt: SITE_SOCIAL_IMAGE_ALT,
    type: 'website',
    structuredData: [websiteSchema, personSchema, buildPageSchema('/experience', 'Experiência | Alexandre Martins', 'Casos técnicos, entregas recentes e impacto em performance, segurança e arquitetura conduzidos por Alexandre Martins.')],
  },
  stack: {
    title: 'Stack | Alexandre Martins',
    description:
      'Stack técnica de Alexandre Martins com .NET 10, Angular 21, React, Clean Architecture, DDD e Tailwind CSS.',
    image: SITE_SOCIAL_IMAGE,
    imageAlt: SITE_SOCIAL_IMAGE_ALT,
    type: 'website',
    structuredData: [websiteSchema, personSchema, buildPageSchema('/stack', 'Stack | Alexandre Martins', 'Stack técnica de Alexandre Martins com .NET 10, Angular 21, React, Clean Architecture, DDD e Tailwind CSS.')],
  },
  contact: {
    title: 'Contato | Alexandre Martins',
    description:
      'Formas de contato de Alexandre Martins para discutir arquitetura de software, débitos técnicos e evolução de produtos críticos.',
    image: SITE_SOCIAL_IMAGE,
    imageAlt: SITE_SOCIAL_IMAGE_ALT,
    type: 'website',
    structuredData: [websiteSchema, personSchema, buildPageSchema('/contact', 'Contato | Alexandre Martins', 'Formas de contato de Alexandre Martins para discutir arquitetura de software, débitos técnicos e evolução de produtos críticos.', 'ContactPage')],
  },
  blog: {
    title: 'Blog | Alexandre Martins',
    description:
      'Artigos técnicos sobre arquitetura, performance, segurança e o ecossistema .NET e Angular publicados por Alexandre Martins.',
    image: SITE_SOCIAL_IMAGE,
    imageAlt: SITE_SOCIAL_IMAGE_ALT,
    type: 'website',
    structuredData: [
      websiteSchema,
      personSchema,
      {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        url: `${SITE_ORIGIN}/blog`,
        name: 'Blog | Alexandre Martins',
        description:
          'Artigos técnicos sobre arquitetura, performance, segurança e o ecossistema .NET e Angular publicados por Alexandre Martins.',
        inLanguage: PORTFOLIO_DATA.site.locale,
        publisher: { '@id': personId },
      },
    ],
  },
  notFound: {
    title: '404 | Alexandre Martins',
    description: 'A rota solicitada não existe neste site.',
    image: SITE_SOCIAL_IMAGE,
    imageAlt: SITE_SOCIAL_IMAGE_ALT,
    type: 'website',
    robots: 'noindex, nofollow',
  },
} as const satisfies Record<string, RouteSeo>;
