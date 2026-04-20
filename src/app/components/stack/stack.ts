import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PortfolioStackSection } from '../../data/portfolio-data';

@Component({
  selector: 'app-stack',
  imports: [],
  templateUrl: './stack.html',
  styleUrl: './stack.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StackComponent {
  readonly stack = input.required<PortfolioStackSection>();
}
