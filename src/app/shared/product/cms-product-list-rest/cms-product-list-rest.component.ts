// eslint-disable-next-line ish-custom-rules/ban-imports-file-pattern
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ContentPageletView } from 'ish-core/models/content-view/content-view.model';
import { CMSComponent } from 'ish-shared/cms-bootstrap/models/cms-component/cms-component.model';
import { GenerateLazyComponent } from 'ish-core/utils/module-loader/generate-lazy-component.decorator';

@Component({
  selector: 'ish-cms-product-list-rest',
  templateUrl: './cms-product-list-rest.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@GenerateLazyComponent()
export class CmsProductListRestComponent implements CMSComponent, OnChanges {
  @Input({ required: true }) pagelet: ContentPageletView;

  productSKUs$: Observable<string[]>;

  constructor(private httpClient: HttpClient, private cdRef: ChangeDetectorRef) {}

  ngOnChanges() {
    if (this.pagelet.hasParam('ProductsRestEndpoint')) {
      this.productSKUs$ = this.getProductSKUs$();
    }
    this.cdRef.detectChanges();
  }

  getProductSKUs$(): Observable<string[]> {
    return this.httpClient.get<unknown>(this.pagelet.stringParam('ProductsRestEndpoint')).pipe(
      map(data => {
        let skus: string[] = [];

        // if the REST response is not already an Array of SKUs
        // a given mapper function can be applied to the REST 'data' to map the data to an Array of SKUs
        skus = this.pagelet.hasParam('ProductsRestResponseMapper')
          ? Function('data', `"use strict"; return ${this.pagelet.stringParam('ProductsRestResponseMapper')}`)(data)
          : data;

        // limit the number of rendered products
        if (this.pagelet.hasParam('MaxNumberOfProducts')) {
          skus = skus.splice(0, this.pagelet.numberParam('MaxNumberOfProducts'));
        }

        return skus;
      })
    );
  }
}
