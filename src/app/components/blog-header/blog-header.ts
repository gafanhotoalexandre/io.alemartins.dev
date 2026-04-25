import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PortfolioBrand } from '../../data/portfolio-data';

@Component({
	selector: 'app-blog-header',
	imports: [RouterLink, RouterLinkActive],
	template: `
		<header class="sticky top-0 z-40 border-b border-zinc-100 bg-white/85 backdrop-blur-md">
			<div class="w-full max-w-4xl mx-auto px-6 py-6 md:py-7">
				<div class="flex items-center justify-between gap-4">
					<a
						routerLink="/blog"
						class="text-lg font-medium tracking-tight text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-4 flex items-center gap-2 group rounded-sm"
					>
						<div
							class="w-6 h-6 rounded-sm bg-zinc-900 text-white flex items-center justify-center text-[10px] font-bold transition-transform group-hover:scale-105"
						>
							{{ brand().initials }}
						</div>
						<span>
							{{ brand().displayName }} <span class="text-zinc-400 font-light">/ blog</span>
						</span>
					</a>

					<nav class="hidden md:flex gap-6 text-sm font-medium text-zinc-500" aria-label="Navegação do blog">
						<a
							routerLink="/"
							class="hover:text-zinc-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-4 rounded-sm"
						>
							Portfólio
						</a>
						<a
							routerLink="/blog"
							routerLinkActive="text-zinc-900"
							[routerLinkActiveOptions]="{ exact: false }"
							class="hover:text-zinc-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-4 rounded-sm"
						>
							Artigos
						</a>
						<a
							href="https://github.com/gafanhotoalexandre"
							target="_blank"
							rel="noreferrer"
							class="hover:text-zinc-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-4 rounded-sm"
						>
							GitHub
						</a>
					</nav>
				</div>

				<nav class="mt-4 flex md:hidden items-center gap-3 text-xs font-medium text-zinc-500" aria-label="Ações do blog no mobile">
					<a
						routerLink="/"
						class="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-zinc-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-4"
					>
						<svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
						</svg>
						Portfólio
					</a>
					<a
						href="https://github.com/gafanhotoalexandre"
						target="_blank"
						rel="noreferrer"
						class="inline-flex items-center gap-2 rounded-full px-3 py-1.5 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-4"
					>
						GitHub
					</a>
				</nav>
			</div>
		</header>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogHeaderComponent {
	readonly brand = input.required<PortfolioBrand>();
}
