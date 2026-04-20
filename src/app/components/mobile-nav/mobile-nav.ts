import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { PortfolioTab, PortfolioTabId } from '../../data/portfolio-data';

@Component({
  selector: 'app-mobile-nav',
  imports: [],
  templateUrl: './mobile-nav.html',
  styleUrl: './mobile-nav.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileNavComponent {
  readonly tabs = input.required<readonly PortfolioTab[]>();
  readonly currentTab = input.required<PortfolioTabId>();
  readonly tabSelected = output<PortfolioTabId>();

  protected onKeydown(event: KeyboardEvent, tabId: PortfolioTabId): void {
    const tabs = this.tabs();
    const currentIndex = tabs.findIndex((tab) => tab.id === tabId);

    if (currentIndex === -1) {
      return;
    }

    let nextTabId: PortfolioTabId | null = null;

    switch (event.key) {
      case 'ArrowRight':
        nextTabId = tabs[(currentIndex + 1) % tabs.length]!.id;
        break;
      case 'ArrowLeft':
        nextTabId = tabs[(currentIndex - 1 + tabs.length) % tabs.length]!.id;
        break;
      case 'Home':
        nextTabId = tabs[0]!.id;
        break;
      case 'End':
        nextTabId = tabs[tabs.length - 1]!.id;
        break;
      default:
        return;
    }

    event.preventDefault();
    this.tabSelected.emit(nextTabId);
  }
}
