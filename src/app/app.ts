import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRouteSnapshot, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { HeaderComponent } from './components/header/header';
import { BlogHeaderComponent } from './components/blog-header/blog-header';
import { MobileNavComponent } from './components/mobile-nav/mobile-nav';
import { PORTFOLIO_DATA, PortfolioTabId } from './data/portfolio-data';
import { ROUTE_SEO, SITE_ORIGIN, type RouteSeo } from './data/site-seo';
import { SeoService } from './services/seo';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, BlogHeaderComponent, MobileNavComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly data = PORTFOLIO_DATA;
  protected readonly currentTab = computed<PortfolioTabId | null>(() => {
    const currentUrl = this.currentUrl();

    if (currentUrl === '/' || currentUrl === '') {
      return this.data.site.defaultTab;
    }

    const currentRoute = this.data.tabs.find((tab) => tab.path === currentUrl);
    return currentRoute?.id ?? null;
  });
  protected readonly isBlogRoute = computed(() => this.currentUrl().startsWith('/blog'));

  private readonly router = inject(Router);
  private readonly seoService = inject(SeoService);
  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
      startWith(this.router.url),
    ),
    { initialValue: this.router.url },
  );
  private readonly routeSeo = computed<RouteSeo>(() => {
    this.currentUrl();

    const activeRoute = this.getLeafRoute(this.router.routerState.snapshot.root);
    return (activeRoute.data['seo'] as RouteSeo | undefined) ?? ROUTE_SEO.home;
  });

  constructor() {
    effect(() => {
      const currentUrl = this.currentUrl();
      const routeSeo = this.routeSeo();

      this.seoService.setPageSeo(routeSeo, this.toCanonicalUrl(currentUrl));
    });
  }

  private getLeafRoute(route: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
    let currentRoute = route;

    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
    }

    return currentRoute;
  }

  private toCanonicalUrl(path: string): string {
    const normalizedPath = path ? (path.startsWith('/') ? path : `/${path}`) : '/';
    return new URL(normalizedPath, SITE_ORIGIN).toString();
  }
}
