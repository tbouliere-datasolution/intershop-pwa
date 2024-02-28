import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges } from '@angular/core';

import { ContentPageletView } from 'ish-core/models/content-view/content-view.model';
import { GenerateLazyComponent } from 'ish-core/utils/module-loader/generate-lazy-component.decorator';
import { CMSComponent } from 'ish-shared/cms-bootstrap/models/cms-component/cms-component.model';

@Component({
  selector: 'ish-cms-product-list-manual',
  templateUrl: './cms-product-list-manual.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@GenerateLazyComponent()
export class CmsProductListManualComponent implements CMSComponent, OnChanges {
  @Input({ required: true }) pagelet: ContentPageletView;

  productSKUs: string[] = [];

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnChanges() {
    this.productSKUs = this.pagelet.hasParam('Products')
      ? this.pagelet.configParam<string[]>('Products').map(product => product.split('@')[0])
      : [];
    this.cdRef.detectChanges();
  }
}
