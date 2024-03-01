import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges } from '@angular/core';

import { GenerateLazyComponent } from 'ish-core/utils/module-loader/generate-lazy-component.decorator';

/**
 * The Content Include Component renders the content of the include with the given 'includeId'.
 * For rendering it uses the {@link ContentPageletComponent} for each sub pagelet.
 *
 * @example
 * <ish-content-include includeId="pwa.include.homepage.pagelet2-Include"></ish-content-include>
 * or with lazy loading within the application shell
 * <ish-lazy-content-include includeId="include.footer.pagelet2-Include"></ish-lazy-content-include>
 */
@Component({
  selector: 'ish-shell-content-include',
  templateUrl: './shell-content-include.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@GenerateLazyComponent()
export class ShellContentIncludeComponent implements OnChanges {
  @Input({ required: true }) includeId: string;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges() {
    // lazy include bug
    this.cdr.detectChanges();
  }
}
