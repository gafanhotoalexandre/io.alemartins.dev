import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PortfolioExperienceSection } from '../../data/portfolio-data';

@Component({
  selector: 'app-experience',
  imports: [],
  templateUrl: './experience.html',
  styleUrl: './experience.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceComponent {
  readonly experience = input.required<PortfolioExperienceSection>();
}
