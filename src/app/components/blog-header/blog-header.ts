import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PortfolioBrand } from '../../data/portfolio-data';

@Component({
	selector: 'app-blog-header',
	imports: [RouterLink, RouterLinkActive],
	template: `
		<header class="sticky top-0 z-40 border-b border-zinc-100 bg-white/85 backdrop-blur-md">
			<div class="w-full max-w-4xl mx-auto px-6 py-6 md:py-7 flex items-center justify-between gap-4">
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
		</header>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogHeaderComponent {
	readonly brand = input.required<PortfolioBrand>();
}
