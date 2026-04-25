import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContactComponent } from '../components/contact/contact';
import { PORTFOLIO_DATA } from '../data/portfolio-data';

@Component({
	imports: [ContactComponent],
	template: `
		<section [id]="data.tabs[3].sectionId">
			<app-contact [contact]="data.contact" />
		</section>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactPage {
	protected readonly data = PORTFOLIO_DATA;
}
