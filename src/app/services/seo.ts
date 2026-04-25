import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { PORTFOLIO_DATA } from '../data/portfolio-data';
import { SITE_NAME, SITE_OG_LOCALE, type RouteSeo } from '../data/site-seo';

@Injectable({ providedIn: 'root' })
export class SeoService {
	private readonly document = inject(DOCUMENT);
	private readonly meta = inject(Meta);
	private readonly title = inject(Title);

	setPageSeo(config: RouteSeo, canonicalUrl: string): void {
		this.title.setTitle(config.title);

		this.updateNameTag('description', config.description);
		this.updateNameTag('robots', config.robots ?? 'index, follow, max-image-preview:large');
		this.updateNameTag('author', PORTFOLIO_DATA.brand.fullName);
		this.updateNameTag('twitter:card', 'summary_large_image');
		this.updateNameTag('twitter:title', config.title);
		this.updateNameTag('twitter:description', config.description);
		this.updateNameTag('twitter:image', config.image);
		this.updateNameTag('twitter:image:alt', config.imageAlt);
		this.updateNameTag('theme-color', '#ffffff');

		this.updatePropertyTag('og:site_name', SITE_NAME);
		this.updatePropertyTag('og:locale', SITE_OG_LOCALE);
		this.updatePropertyTag('og:type', config.type);
		this.updatePropertyTag('og:title', config.title);
		this.updatePropertyTag('og:description', config.description);
		this.updatePropertyTag('og:url', canonicalUrl);
		this.updatePropertyTag('og:image', config.image);
		this.updatePropertyTag('og:image:alt', config.imageAlt);
		this.updatePropertyTag('og:image:width', '1200');
		this.updatePropertyTag('og:image:height', '630');

		this.updateCanonicalLink(canonicalUrl);
		this.updateStructuredData(config.structuredData);
	}

	private updateNameTag(name: string, content: string): void {
		this.meta.updateTag({ name, content }, `name="${name}"`);
	}

	private updatePropertyTag(property: string, content: string): void {
		this.meta.updateTag({ property, content }, `property="${property}"`);
	}

	private updateCanonicalLink(canonicalUrl: string): void {
		let canonicalLink = this.document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;

		if (!canonicalLink) {
			canonicalLink = this.document.createElement('link');
			canonicalLink.rel = 'canonical';
			this.document.head.appendChild(canonicalLink);
		}

		canonicalLink.href = canonicalUrl;
	}

	private updateStructuredData(structuredData?: Record<string, unknown> | readonly Record<string, unknown>[]): void {
		const selector = 'script[data-app-seo="structured-data"]';
		const existingScript = this.document.head.querySelector(selector) as HTMLScriptElement | null;

		if (!structuredData) {
			existingScript?.remove();
			return;
		}

		const script = existingScript ?? (this.document.createElement('script') as HTMLScriptElement);
		script.type = 'application/ld+json';
		script.setAttribute('data-app-seo', 'structured-data');
		script.textContent = JSON.stringify(structuredData);

		if (!existingScript) {
			this.document.head.appendChild(script);
		}
	}
}
