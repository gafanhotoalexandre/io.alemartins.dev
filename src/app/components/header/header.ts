import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PortfolioBrand, PortfolioTab, PortfolioTabId } from '../../data/portfolio-data';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly brand = input.required<PortfolioBrand>();
  readonly tabs = input.required<readonly PortfolioTab[]>();
  readonly currentTab = input<PortfolioTabId | null>(null);
}
