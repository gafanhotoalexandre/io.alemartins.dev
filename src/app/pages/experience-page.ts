import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ExperienceComponent } from '../components/experience/experience';
import { PORTFOLIO_DATA } from '../data/portfolio-data';

@Component({
	imports: [ExperienceComponent],
	template: `
		<section [id]="data.tabs[1].sectionId">
			<app-experience [experience]="data.experience" />
		</section>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperiencePage {
	protected readonly data = PORTFOLIO_DATA;
}
