import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GenerateLazyComponent } from 'ish-core/utils/module-loader/generate-lazy-component.decorator';

@Component({
  selector: 'ish-global-navigation',
  templateUrl: './global-navigation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@GenerateLazyComponent()
export class GlobalNavigationComponent implements OnChanges {
  @Input() showNavBar: boolean;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnChanges(_changes: SimpleChanges): void {
    // Lazy component bug
    this.cdRef.detectChanges();
  }
}
