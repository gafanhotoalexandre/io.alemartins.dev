import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { App } from './app';
import { PORTFOLIO_DATA } from './data/portfolio-data';

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let originalHash: string;

  beforeEach(async () => {
    originalHash = window.location.hash;
    vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined);

    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  afterEach(() => {
    window.location.hash = originalHash;
    vi.restoreAllMocks();
  });

  const createApp = async (): Promise<HTMLElement> => {
    fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  };

  it('should create the app', () => {
    const app = TestBed.createComponent(App).componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the home tab by default', async () => {
    window.location.hash = '';

    const compiled = await createApp();
    const homePanel = compiled.querySelector(`#${PORTFOLIO_DATA.tabs[0].sectionId}`) as HTMLElement;
    const experiencePanel = compiled.querySelector(`#${PORTFOLIO_DATA.tabs[1].sectionId}`) as HTMLElement;

    expect(compiled.querySelector('#desktop-tab-home')?.textContent).toContain(PORTFOLIO_DATA.tabs[0].label);
    expect(compiled.querySelector('h1')?.textContent).toContain(PORTFOLIO_DATA.about.headline);
    expect(homePanel.hidden).toBe(false);
    expect(experiencePanel.hidden).toBe(true);
  });

  it('should switch sections and sync the hash when a header tab is clicked', async () => {
    window.location.hash = '';

    const compiled = await createApp();
    const contactTab = compiled.querySelector('#desktop-tab-contact') as HTMLButtonElement;

    contactTab.click();
    await fixture.whenStable();

    const contactPanel = compiled.querySelector(`#${PORTFOLIO_DATA.tabs[3].sectionId}`) as HTMLElement;
    expect(window.location.hash).toBe('#contact');
    expect(contactPanel.hidden).toBe(false);
    expect(compiled.querySelector(`#${PORTFOLIO_DATA.tabs[3].sectionId} h2`)?.textContent).toContain(
      PORTFOLIO_DATA.contact.heading,
    );
  });

  it('should restore the active tab from the hash after the first render', async () => {
    window.location.hash = '#stack';

    const compiled = await createApp();
    const stackPanel = compiled.querySelector(`#${PORTFOLIO_DATA.tabs[2].sectionId}`) as HTMLElement;

    expect(compiled.querySelector('#desktop-tab-stack')?.getAttribute('aria-selected')).toBe('true');
    expect(stackPanel.hidden).toBe(false);
    expect(compiled.querySelector(`#${PORTFOLIO_DATA.tabs[2].sectionId} h2`)?.textContent).toContain(
      PORTFOLIO_DATA.stack.heading,
    );
  });
});
