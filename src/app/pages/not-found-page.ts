import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
	imports: [RouterLink],
	template: `
		<section class="tab-content mt-8 md:mt-16 max-w-3xl">
			<p class="text-zinc-500 text-sm mb-4 font-medium tracking-wide uppercase">404</p>
			<h1 class="text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] text-zinc-900 mb-6">
				Esta rota não existe.
			</h1>
			<p class="text-base md:text-lg text-zinc-600 font-light leading-relaxed max-w-2xl mb-10">
				O shell da aplicação já responde com rotas reais. Se você caiu aqui, o endereço não foi mapeado ainda.
			</p>
			<a
				routerLink="/"
				class="inline-flex px-5 py-3 bg-zinc-900 text-white rounded hover:bg-zinc-800 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-4"
			>
				Voltar para a home
			</a>
		</section>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPage {}
