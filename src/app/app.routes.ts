import { Routes } from '@angular/router';
import { ROUTE_SEO } from './data/site-seo';

export const routes: Routes = [
	{
		path: '',
		title: ROUTE_SEO.home.title,
		data: { seo: ROUTE_SEO.home },
		loadComponent: () => import('./pages/home-page').then((module) => module.HomePage),
	},
	{
		path: 'experience',
		title: ROUTE_SEO.experience.title,
		data: { seo: ROUTE_SEO.experience },
		loadComponent: () => import('./pages/experience-page').then((module) => module.ExperiencePage),
	},
	{
		path: 'stack',
		title: ROUTE_SEO.stack.title,
		data: { seo: ROUTE_SEO.stack },
		loadComponent: () => import('./pages/stack-page').then((module) => module.StackPage),
	},
	{
		path: 'contact',
		title: ROUTE_SEO.contact.title,
		data: { seo: ROUTE_SEO.contact },
		loadComponent: () => import('./pages/contact-page').then((module) => module.ContactPage),
	},
	{
		path: 'blog',
		title: ROUTE_SEO.blog.title,
		data: { seo: ROUTE_SEO.blog },
		loadComponent: () => import('./pages/blog-page').then((module) => module.BlogPage),
	},
	{
		path: 'blog/:slug',
		title: 'Artigo | Alexandre Martins',
		data: { seo: ROUTE_SEO.blog },
		loadComponent: () => import('./pages/blog-article-page').then((module) => module.BlogArticlePage),
	},
	{
		path: '**',
		title: ROUTE_SEO.notFound.title,
		data: { seo: ROUTE_SEO.notFound },
		loadComponent: () => import('./pages/not-found-page').then((module) => module.NotFoundPage),
	},
];
