import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { vi } from 'vitest';
import { App } from './app';
import { routes } from './app.routes';
import { PORTFOLIO_DATA } from './data/portfolio-data';
import { ROUTE_SEO, SITE_ORIGIN } from './data/site-seo';

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();

    router = TestBed.inject(Router);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const createApp = async (url: string): Promise<HTMLElement> => {
    fixture = TestBed.createComponent(App);
    await router.navigateByUrl(url);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  };

  it('should create the app', () => {
    const app = TestBed.createComponent(App).componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the home route by default', async () => {
    const compiled = await createApp('/');
    const homePanel = compiled.querySelector(`#${PORTFOLIO_DATA.tabs[0].sectionId}`) as HTMLElement;

    expect(compiled.querySelector('#desktop-tab-home')?.textContent).toContain(PORTFOLIO_DATA.tabs[0].label);
    expect(compiled.querySelector('h1')?.textContent).toContain(PORTFOLIO_DATA.about.headline);
    expect(router.url).toBe('/');
    expect(homePanel).toBeTruthy();
    expect(document.title).toBe(ROUTE_SEO.home.title);
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(`${SITE_ORIGIN}/`);
  });

  it('should navigate to the contact route when a header link is clicked', async () => {
    const compiled = await createApp('/');
    const contactTab = compiled.querySelector('#desktop-tab-contact') as HTMLAnchorElement;

    contactTab.click();
    await fixture.whenStable();
    fixture.detectChanges();

    const contactPanel = compiled.querySelector(`#${PORTFOLIO_DATA.tabs[3].sectionId}`) as HTMLElement;
    expect(router.url).toBe('/contact');
    expect(contactPanel).toBeTruthy();
    expect(compiled.querySelector(`#${PORTFOLIO_DATA.tabs[3].sectionId} h2`)?.textContent).toContain(
      PORTFOLIO_DATA.contact.heading,
    );
    expect(document.title).toBe(ROUTE_SEO.contact.title);
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(ROUTE_SEO.contact.description);
    expect(document.querySelector('meta[property="og:url"]')?.getAttribute('content')).toBe(`${SITE_ORIGIN}/contact`);
  });

  it('should restore the active section from the current route after the first render', async () => {
    const compiled = await createApp('/stack');
    const stackPanel = compiled.querySelector(`#${PORTFOLIO_DATA.tabs[2].sectionId}`) as HTMLElement;

    expect(compiled.querySelector('#desktop-tab-stack')?.getAttribute('aria-current')).toBe('page');
    expect(stackPanel).toBeTruthy();
    expect(compiled.querySelector(`#${PORTFOLIO_DATA.tabs[2].sectionId} h2`)?.textContent).toContain(
      PORTFOLIO_DATA.stack.heading,
    );
  });

  it('should expose the blog route from the header', async () => {
    const compiled = await createApp('/');
    const blogLink = compiled.querySelector('a[href="/blog"]') as HTMLAnchorElement;

    blogLink.click();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(router.url).toBe('/blog');
    expect(compiled.querySelector('h1')?.textContent).toContain('Engenharia em texto');
  });
});
