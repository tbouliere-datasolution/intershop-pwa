import { NgModule } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SwiperModule } from 'swiper/angular';

import { CmsBootstrapModule } from 'ish-shared/cms-bootstrap/cms-bootstrap.module';
import { ProductCoreModule } from 'ish-shared/product-core/product-core.module';
import { PromotionModule } from 'ish-shared/promotion/promotion.module';
import { SharedModule } from 'ish-shared/shared.module';

import { CmsProductListCategoryComponent } from './cms-product-list-category/cms-product-list-category.component';
import { CmsProductListFilterComponent } from './cms-product-list-filter/cms-product-list-filter.component';
import { CmsProductListManualComponent } from './cms-product-list-manual/cms-product-list-manual.component';
import { CmsProductListRestComponent } from './cms-product-list-rest/cms-product-list-rest.component';
import { ProductListPagingComponent } from './product-list-paging/product-list-paging.component';
import { ProductListToolbarComponent } from './product-list-toolbar/product-list-toolbar.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { ProductsListComponent } from './products-list/products-list.component';

@NgModule({
  imports: [CmsBootstrapModule, InfiniteScrollModule, ProductCoreModule, PromotionModule, SharedModule, SwiperModule],
  declarations: [
    CmsProductListCategoryComponent,
    CmsProductListManualComponent,
    CmsProductListRestComponent,
    ProductListComponent,
    CmsProductListFilterComponent,
    ProductListingComponent,
    ProductListPagingComponent,
    ProductListToolbarComponent,
    ProductsListComponent,
  ],
  exports: [
    CmsProductListCategoryComponent,
    CmsProductListFilterComponent,
    CmsProductListManualComponent,
    CmsProductListRestComponent,

    ProductCoreModule,

    ProductListingComponent,

    ProductsListComponent,
    SwiperModule,
  ],
})
export class ProductModule {}
