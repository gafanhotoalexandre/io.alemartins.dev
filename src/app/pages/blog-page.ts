import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BLOG_DESCRIPTION, BLOG_TITLE, formatBlogDate, getBlogPosts } from '../data/blog';

@Component({
  imports: [RouterLink],
  template: `
    <section class="tab-content mt-4 md:mt-12">
      <div class="max-w-4xl">
        <div class="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p class="text-zinc-500 text-sm mb-4 font-medium tracking-wide uppercase">Blog</p>
            <h1 class="text-4xl md:text-5xl font-medium tracking-tight text-zinc-900 mb-3">{{ title }}</h1>
            <p class="text-zinc-500 font-light max-w-lg leading-relaxed text-sm md:text-base">
              {{ description }}
            </p>
          </div>

          <div class="relative w-full md:w-72 group">
            <label for="blog-search" class="sr-only">Buscar artigos</label>
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-zinc-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <input
              id="blog-search"
              type="search"
              placeholder="Buscar artigos..."
              [value]="searchTerm()"
              class="w-full bg-zinc-50 border border-zinc-200 text-sm rounded-md pl-10 pr-4 py-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 focus-visible:border-zinc-900 transition-all"
              (input)="updateSearchTerm($event)"
            />
          </div>
        </div>

        <div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p class="text-sm text-zinc-500 font-light leading-relaxed" aria-live="polite">{{ resultsSummary() }}</p>

          @if (hasActiveSearch()) {
            <button
              type="button"
              class="inline-flex w-fit items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-900 shadow-sm hover:border-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-4"
              (click)="clearSearch()"
            >
              Limpar busca
            </button>
          }
        </div>

        <div class="space-y-4">
          @for (post of filteredPosts(); track post.slug) {
            <article class="group border border-zinc-100 bg-white p-5 rounded-xl shadow-[0_12px_30px_-28px_rgba(24,24,27,0.7)] hover:border-zinc-300 hover:shadow-[0_18px_40px_-28px_rgba(24,24,27,0.45)] transition-all">
              <a [routerLink]="['/blog', post.slug]" class="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-4 rounded-lg">
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div class="flex flex-wrap items-center gap-3 text-xs font-medium text-zinc-500 mb-2">
                      @for (tag of post.tags; track tag) {
                        <span class="text-zinc-800 bg-zinc-100 px-2 py-0.5 rounded">{{ tag }}</span>
                      }
                      <span>•</span>
                      <time [attr.datetime]="post.publishedAt">{{ formatDate(post.publishedAt) }}</time>
                      <span>•</span>
                      <span>~{{ post.readingTime }} min</span>
                    </div>
                    <h2 class="text-xl font-medium text-zinc-900 group-hover:text-zinc-700 transition-colors">
                      {{ post.title }}
                    </h2>
                    <p class="text-zinc-500 font-light text-sm mt-2 line-clamp-2">{{ post.description }}</p>
                  </div>
                  <div class="hidden md:flex shrink-0 w-10 h-10 items-center justify-center rounded-full bg-zinc-50 group-hover:bg-zinc-100 transition-colors">
                    <svg class="w-5 h-5 text-zinc-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </div>
                </div>
              </a>
            </article>
          } @empty {
            <div class="border border-dashed border-zinc-300 bg-white rounded-2xl p-6 md:p-8 text-center">
              <p class="text-zinc-900 font-medium mb-2">Nenhum artigo encontrado</p>
              <p class="text-sm text-zinc-500 font-light leading-relaxed">
                Ajuste o termo de busca para procurar por outro tópico, stack ou palavra-chave.
              </p>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogPage {
  protected readonly title = BLOG_TITLE;
  protected readonly description = BLOG_DESCRIPTION;
  protected readonly filteredPosts = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();

    if (!term) {
      return this.posts;
    }

    return this.posts.filter((post) => {
      const haystack = [post.title, post.description, ...post.tags].join(' ').toLowerCase();
      return haystack.includes(term);
    });
  });
  protected readonly hasActiveSearch = computed(() => this.searchTerm().trim().length > 0);
  protected readonly resultsSummary = computed(() => {
    const total = this.filteredPosts().length;
    const totalLabel = total === 1 ? '1 artigo visível' : `${total} artigos visíveis`;
    const term = this.searchTerm().trim();

    return term ? `${totalLabel} para "${term}".` : `${totalLabel} no momento.`;
  });

  private readonly posts = getBlogPosts();
  protected readonly searchTerm = signal('');

  protected updateSearchTerm(event: Event): void {
    const element = event.target as HTMLInputElement | null;
    this.searchTerm.set(element?.value ?? '');
  }

  protected clearSearch(): void {
    this.searchTerm.set('');
  }

  protected formatDate(date: string): string {
    return formatBlogDate(date);
  }
}
