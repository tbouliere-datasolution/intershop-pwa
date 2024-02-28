import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { CMSFacade } from 'ish-core/facades/cms.facade';
import { ShoppingFacade } from 'ish-core/facades/shopping.facade';
import { ContentPageletView } from 'ish-core/models/content-view/content-view.model';
import { CMSComponent } from 'ish-shared/cms-bootstrap/models/cms-component/cms-component.model';
import { GenerateLazyComponent } from 'ish-core/utils/module-loader/generate-lazy-component.decorator';

@Component({
  selector: 'ish-cms-product-list-filter',
  templateUrl: './cms-product-list-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@GenerateLazyComponent()
export class CmsProductListFilterComponent implements CMSComponent, OnChanges {
  @Input({ required: true }) pagelet: ContentPageletView;

  productSKUs$: Observable<string[]>;

  constructor(private cmsFacade: CMSFacade, private shoppingFacade: ShoppingFacade, private cdRef: ChangeDetectorRef) {}

  ngOnChanges() {
    if (this.pagelet.hasParam('Filter')) {
      this.productSKUs$ = this.getProductSKUs$();
    }
    this.cdRef.detectChanges();
  }

  getProductSKUs$(): Observable<string[]> {
    return this.shoppingFacade.selectedCategoryId$.pipe(
      switchMap(categoryId =>
        this.cmsFacade.parameterProductListFilter$(
          categoryId,
          this.pagelet.stringParam('Filter'),
          this.pagelet.stringParam('Scope'),
          this.pagelet.numberParam('MaxNumberOfProducts')
        )
      )
    );
  }
}
