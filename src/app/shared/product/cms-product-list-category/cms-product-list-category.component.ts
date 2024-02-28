import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { CMSFacade } from 'ish-core/facades/cms.facade';
import { ShoppingFacade } from 'ish-core/facades/shopping.facade';
import { ContentPageletView } from 'ish-core/models/content-view/content-view.model';
import { whenTruthy } from 'ish-core/utils/operators';
import { CMSComponent } from 'ish-shared/cms-bootstrap/models/cms-component/cms-component.model';
import { GenerateLazyComponent } from 'ish-core/utils/module-loader/generate-lazy-component.decorator';

@Component({
  selector: 'ish-cms-product-list-category',
  templateUrl: './cms-product-list-category.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@GenerateLazyComponent()
export class CmsProductListCategoryComponent implements CMSComponent, OnChanges {
  @Input({ required: true }) pagelet: ContentPageletView;

  productSKUs$: Observable<string[]>;

  constructor(private cmsFacade: CMSFacade, private shoppingFacade: ShoppingFacade, private cdRef: ChangeDetectorRef) {}
  ngOnChanges() {
    if (this.pagelet.hasParam('Category')) {
      this.productSKUs$ = this.getProductSKUs$();
    }
    this.cdRef.detectChanges();
  }

  getProductSKUs$(): Observable<string[]> {
    return this.shoppingFacade.categoryIdByRefId$(this.pagelet.stringParam('Category')).pipe(
      whenTruthy(),
      switchMap(categoryId =>
        this.cmsFacade.parameterProductListFilter$(
          categoryId,
          undefined,
          undefined,
          this.pagelet.numberParam('MaxNumberOfProducts')
        )
      )
    );
  }
}
