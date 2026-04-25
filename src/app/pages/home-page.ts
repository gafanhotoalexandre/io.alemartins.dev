import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AboutComponent } from '../components/about/about';
import { PORTFOLIO_DATA, PortfolioTabId } from '../data/portfolio-data';

@Component({
	imports: [AboutComponent],
	template: `
		<section [id]="data.tabs[0].sectionId">
			<app-about [brand]="data.brand" [about]="data.about" (tabSelected)="selectTab($event)" />
		</section>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
	protected readonly data = PORTFOLIO_DATA;

	private readonly router = inject(Router);

	protected selectTab(tabId: PortfolioTabId): void {
		const nextTab = this.data.tabs.find((tab) => tab.id === tabId);

		if (!nextTab) {
			return;
		}

		void this.router.navigateByUrl(nextTab.path);
	}
}
