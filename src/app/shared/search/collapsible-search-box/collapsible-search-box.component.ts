import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { GenerateLazyComponent } from 'ish-core/utils/module-loader/generate-lazy-component.decorator';

@Component({
  selector: 'ish-collapsible-search-box',
  templateUrl: './collapsible-search-box.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@GenerateLazyComponent()
export class CollapsibleSearchBoxComponent implements OnChanges {
  @Input() isSticky = false;
  @Input() showSearch = true;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnChanges(_changes: SimpleChanges): void {
    // Lazy component bug
    this.cdRef.detectChanges();
  }
}
