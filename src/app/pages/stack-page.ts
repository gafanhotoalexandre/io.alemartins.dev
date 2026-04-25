import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StackComponent } from '../components/stack/stack';
import { PORTFOLIO_DATA } from '../data/portfolio-data';

@Component({
	imports: [StackComponent],
	template: `
		<section [id]="data.tabs[2].sectionId">
			<app-stack [stack]="data.stack" />
		</section>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StackPage {
	protected readonly data = PORTFOLIO_DATA;
}
