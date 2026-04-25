import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import {
	buildBlogPostSeo,
	formatBlogDate,
	getBlogPostBySlug,
	getBlogPostUrl,
	type BlogContentBlock,
} from '../data/blog';
import { SITE_ORIGIN } from '../data/site-seo';
import { SeoService } from '../services/seo';

@Component({
	imports: [RouterLink],
	template: `
		<section class="tab-content mt-8 md:mt-12 pb-16 md:pb-0">
			<div class="max-w-4xl mx-auto">
				@if (currentPost(); as post) {
					<a
						routerLink="/blog"
						class="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-4 rounded-sm w-fit"
					>
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
						</svg>
						Voltar para os artigos
					</a>

					<div class="mt-8 mb-10 pb-8 border-b border-zinc-100 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
						<div class="max-w-2xl">
							<div class="flex flex-wrap items-center gap-3 text-xs font-medium text-zinc-500 mb-4">
								@for (tag of post.tags; track tag) {
									<span class="text-zinc-900 bg-zinc-100 border border-zinc-200 px-2 py-1 rounded">{{ tag }}</span>
								}
								<span>•</span>
								<time [attr.datetime]="post.publishedAt">{{ formattedDate() }}</time>
							</div>
							<h1 class="text-3xl md:text-5xl font-medium tracking-tight text-zinc-900 leading-[1.1] mb-4">
								{{ post.title }}
							</h1>
							<p class="text-lg text-zinc-500 font-light leading-relaxed">{{ post.description }}</p>
						</div>

						<div class="shrink-0 bg-zinc-50 border border-zinc-200 px-4 py-3 rounded-xl shadow-sm flex items-center gap-4 self-start md:self-auto">
							<div class="flex flex-col text-right">
								<span class="text-sm font-semibold tracking-tight text-zinc-900">Modo Objetivo</span>
								<span class="text-[10px] text-zinc-500 font-mono mt-0.5 uppercase tracking-wider">
									Leitura: ~{{ post.readingTime }} min
								</span>
							</div>
							<button
								type="button"
								role="switch"
								[attr.aria-checked]="objectiveMode()"
								(click)="toggleObjectiveMode()"
								class="relative inline-flex h-7 w-12 items-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-4 cursor-pointer"
								[class.bg-zinc-900]="objectiveMode()"
								[class.border-zinc-900]="objectiveMode()"
								[class.bg-zinc-300]="!objectiveMode()"
								[class.border-zinc-300]="!objectiveMode()"
							>
								<span
									class="inline-block h-5 w-5 transform rounded-full bg-white transition-transform"
									[class.translate-x-6]="objectiveMode()"
									[class.translate-x-1]="!objectiveMode()"
								></span>
							</button>
						</div>
					</div>

					<article class="blog-prose max-w-3xl" [class.blog-objective-mode]="objectiveMode()">
						@for (block of visibleBlocks(); track $index) {
							<section
								class="blog-article-block"
								[class.blog-core-block]="block.kind === 'core'"
								[class.blog-context-block]="block.kind === 'context'"
								[innerHTML]="block.html"
							></section>
						}
					</article>

					<section class="max-w-3xl mt-16 pt-10 border-t border-zinc-200">
						<h2 class="text-xl font-medium tracking-tight text-zinc-900 mb-3">Próxima etapa</h2>
						<p class="text-sm md:text-base text-zinc-500 font-light leading-relaxed">
							O espaço de comentários fica reservado para uma integração futura com Giscus, sem travar o V1 do blog.
						</p>
					</section>
				} @else {
					<div class="max-w-3xl">
						<p class="text-zinc-500 text-sm mb-4 font-medium tracking-wide uppercase">Artigo</p>
						<h1 class="text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] text-zinc-900 mb-6">
							Este artigo não foi encontrado.
						</h1>
						<p class="text-base md:text-lg text-zinc-600 font-light leading-relaxed max-w-2xl mb-10">
							O slug informado não existe na coleção atual do blog.
						</p>
						<a
							routerLink="/blog"
							class="inline-flex px-5 py-3 bg-zinc-900 text-white rounded hover:bg-zinc-800 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-4"
						>
							Voltar para os artigos
						</a>
					</div>
				}
			</div>
		</section>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogArticlePage {
	protected readonly objectiveMode = signal(false);
	protected readonly currentPost = computed(() => getBlogPostBySlug(this.slug()));
	protected readonly formattedDate = computed(() => {
		const post = this.currentPost();
		return post ? formatBlogDate(post.publishedAt) : '';
	});
	protected readonly visibleBlocks = computed<readonly BlogContentBlock[]>(() => {
		const post = this.currentPost();

		if (!post) {
			return [];
		}

		return this.objectiveMode() ? post.blocks.filter((block) => block.kind === 'core') : post.blocks;
	});

	private readonly route = inject(ActivatedRoute);
	private readonly seoService = inject(SeoService);
	private readonly slug = toSignal(this.route.paramMap.pipe(map((params) => params.get('slug') ?? '')), {
		initialValue: this.route.snapshot.paramMap.get('slug') ?? '',
	});

	constructor() {
		effect(() => {
			const post = this.currentPost();
			const slug = this.slug();

			if (post) {
				this.seoService.setPageSeo(buildBlogPostSeo(post), getBlogPostUrl(post.slug));
				return;
			}

			this.seoService.setPageSeo(
				{
					title: 'Artigo não encontrado | Alexandre Martins',
					description: 'O artigo solicitado não foi encontrado na coleção atual do blog.',
					image: `${SITE_ORIGIN}/social-preview.svg`,
					imageAlt: 'Prévia visual do blog de Alexandre Martins',
					type: 'website',
					robots: 'noindex, nofollow',
				},
				`${SITE_ORIGIN}/blog/${slug}`,
			);
		});
	}

	protected toggleObjectiveMode(): void {
		this.objectiveMode.update((currentValue) => !currentValue);
	}
}
