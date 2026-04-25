import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PortfolioTab, PortfolioTabId } from '../../data/portfolio-data';

@Component({
  selector: 'app-mobile-nav',
  imports: [RouterLink],
  templateUrl: './mobile-nav.html',
  styleUrl: './mobile-nav.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileNavComponent {
  readonly tabs = input.required<readonly PortfolioTab[]>();
  readonly currentTab = input<PortfolioTabId | null>(null);
}
