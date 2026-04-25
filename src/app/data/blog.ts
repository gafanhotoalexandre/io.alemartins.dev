import { PORTFOLIO_DATA } from './portfolio-data';
import { ROUTE_SEO, SITE_ORIGIN, SITE_SOCIAL_IMAGE, SITE_SOCIAL_IMAGE_ALT, type RouteSeo } from './site-seo';
import { BLOG_POSTS } from './generated/blog-posts.generated';

export type BlogBlockKind = 'core' | 'context';

export interface BlogContentBlock {
	kind: BlogBlockKind;
	html: string;
}

export interface BlogPost {
	title: string;
	slug: string;
	description: string;
	publishedAt: string;
	readingTime: number;
	tags: readonly string[];
	blocks: readonly BlogContentBlock[];
}

export const BLOG_TITLE = 'Engenharia em texto';
export const BLOG_DESCRIPTION =
	'Notas sobre arquitetura, performance e o ecossistema .NET/Angular. Compilado estaticamente via Markdown.';

const MONTH_LABELS = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'] as const;

export function getBlogPosts(): readonly BlogPost[] {
	return BLOG_POSTS;
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
	return BLOG_POSTS.find((post) => post.slug === slug) ?? null;
}

export function getBlogPostUrl(slug: string): string {
	return `${SITE_ORIGIN}/blog/${slug}`;
}

export function formatBlogDate(value: string): string {
	const date = new Date(`${value}T00:00:00Z`);
	const day = String(date.getUTCDate()).padStart(2, '0');
	const month = MONTH_LABELS[date.getUTCMonth()] ?? MONTH_LABELS[0];
	const year = date.getUTCFullYear();

	return `${day} ${month} ${year}`;
}

export function buildBlogPostSeo(post: BlogPost): RouteSeo {
	return {
		title: `${post.title} | ${PORTFOLIO_DATA.brand.fullName}`,
		description: post.description,
		image: SITE_SOCIAL_IMAGE,
		imageAlt: SITE_SOCIAL_IMAGE_ALT,
		type: 'article',
		structuredData: [
			...((ROUTE_SEO.blog.structuredData as readonly Record<string, unknown>[]) ?? []),
			{
				'@context': 'https://schema.org',
				'@type': 'Article',
				headline: post.title,
				description: post.description,
				datePublished: post.publishedAt,
				dateModified: post.publishedAt,
				mainEntityOfPage: getBlogPostUrl(post.slug),
				image: [SITE_SOCIAL_IMAGE],
				author: {
					'@type': 'Person',
					name: PORTFOLIO_DATA.brand.fullName,
					url: SITE_ORIGIN,
				},
				publisher: {
					'@type': 'Person',
					name: PORTFOLIO_DATA.brand.fullName,
					url: SITE_ORIGIN,
				},
				keywords: post.tags.join(', '),
				inLanguage: PORTFOLIO_DATA.site.locale,
			},
		],
	};
}
