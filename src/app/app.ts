import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  PLATFORM_ID,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { AboutComponent } from './components/about/about';
import { ContactComponent } from './components/contact/contact';
import { ExperienceComponent } from './components/experience/experience';
import { HeaderComponent } from './components/header/header';
import { MobileNavComponent } from './components/mobile-nav/mobile-nav';
import { StackComponent } from './components/stack/stack';
import { PORTFOLIO_DATA, PortfolioTabId } from './data/portfolio-data';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, MobileNavComponent, AboutComponent, ExperienceComponent, StackComponent, ContactComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnDestroy {
  protected readonly data = PORTFOLIO_DATA;
  protected readonly currentTab = signal<PortfolioTabId>(PORTFOLIO_DATA.site.defaultTab);
  protected readonly sectionIds = {
    home: PORTFOLIO_DATA.tabs.find((tab) => tab.id === 'home')!.sectionId,
    experience: PORTFOLIO_DATA.tabs.find((tab) => tab.id === 'experience')!.sectionId,
    stack: PORTFOLIO_DATA.tabs.find((tab) => tab.id === 'stack')!.sectionId,
    contact: PORTFOLIO_DATA.tabs.find((tab) => tab.id === 'contact')!.sectionId,
  } as const;

  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly hashChangeHandler = () => {
    const nextTab = this.getTabFromHash(window.location.hash);

    if (!nextTab || nextTab === this.currentTab()) {
      return;
    }

    this.currentTab.set(nextTab);
    this.scrollToTop();
  };

  constructor() {
    if (!this.isBrowser) {
      return;
    }

    afterNextRender(() => {
      this.applyHashOnBoot();
      window.addEventListener('hashchange', this.hashChangeHandler);
    });
  }

  ngOnDestroy(): void {
    if (!this.isBrowser) {
      return;
    }

    window.removeEventListener('hashchange', this.hashChangeHandler);
  }

  protected selectTab(tabId: PortfolioTabId): void {
    if (!this.isValidTabId(tabId)) {
      return;
    }

    const changed = this.currentTab() !== tabId;

    if (changed) {
      this.currentTab.set(tabId);
      this.scrollToTop();
      this.syncHash(tabId);
    }
  }

  private applyHashOnBoot(): void {
    const nextTab = this.getTabFromHash(window.location.hash);

    if (!nextTab || nextTab === this.currentTab()) {
      return;
    }

    this.currentTab.set(nextTab);
  }

  private getTabFromHash(hash: string): PortfolioTabId | null {
    const value = hash.replace(/^#/, '');

    if (!value) {
      return this.data.site.defaultTab;
    }

    return this.isValidTabId(value) ? value : null;
  }

  private isValidTabId(value: string): value is PortfolioTabId {
    return this.data.tabs.some((tab) => tab.id === value);
  }

  private syncHash(tabId: PortfolioTabId): void {
    if (!this.isBrowser || window.location.hash === `#${tabId}`) {
      return;
    }

    window.location.hash = tabId;
  }

  private scrollToTop(): void {
    if (!this.isBrowser) {
      return;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
