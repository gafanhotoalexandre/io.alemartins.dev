import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PortfolioContactSection } from '../../data/portfolio-data';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  readonly contact = input.required<PortfolioContactSection>();
}
