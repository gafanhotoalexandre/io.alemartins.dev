import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { PortfolioAboutSection, PortfolioBrand, PortfolioTabId } from '../../data/portfolio-data';

@Component({
  selector: 'app-about',
  imports: [NgOptimizedImage],
  templateUrl: './about.html',
  styleUrl: './about.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  readonly brand = input.required<PortfolioBrand>();
  readonly about = input.required<PortfolioAboutSection>();
  readonly tabSelected = output<PortfolioTabId>();
}
