import { NgModule } from '@angular/core';

import { SharedModule } from 'ish-shared/shared.module';

import { CMSContainerComponent } from './components/cms-container/cms-container.component';
import { CMSDialogComponent } from './components/cms-dialog/cms-dialog.component';
import { CMSFreestyleComponent } from './components/cms-freestyle/cms-freestyle.component';
import { CMSImageEnhancedComponent } from './components/cms-image-enhanced/cms-image-enhanced.component';
import { CMSImageComponent } from './components/cms-image/cms-image.component';
import { CMSStandardPageComponent } from './components/cms-standard-page/cms-standard-page.component';
import { CMSStaticPageComponent } from './components/cms-static-page/cms-static-page.component';
import { CMSTextComponent } from './components/cms-text/cms-text.component';
import { CMSVideoComponent } from './components/cms-video/cms-video.component';

import { CMS_COMPONENT } from '../cms-bootstrap/configurations/injection-keys';
import { LazyCmsCarouselComponent } from './shared/lazy-cms-carousel/lazy-cms-carousel.component';

import { LazyCmsProductListManualComponent } from './shared/lazy-cms-product-list-manual/lazy-cms-product-list-manual.component';
import { LazyCmsProductListFilterComponent } from './shared/lazy-cms-product-list-filter/lazy-cms-product-list-filter.component';
import { LazyCmsProductListCategoryComponent } from './shared/lazy-cms-product-list-category/lazy-cms-product-list-category.component';
import { LazyCmsProductListRestComponent } from './shared/lazy-cms-product-list-rest/lazy-cms-product-list-rest.component';
import { CmsBootstrapModule } from 'ish-shared/cms-bootstrap/cms-bootstrap.module';

@NgModule({
  imports: [SharedModule, CmsBootstrapModule],
  declarations: [
    CMSContainerComponent,
    CMSDialogComponent,
    CMSFreestyleComponent,
    CMSImageComponent,
    CMSImageEnhancedComponent,
    CMSStandardPageComponent,
    CMSStaticPageComponent,
    CMSTextComponent,
    CMSVideoComponent,
    LazyCmsProductListCategoryComponent,
    LazyCmsCarouselComponent,
    LazyCmsProductListFilterComponent,
    LazyCmsProductListManualComponent,
    LazyCmsProductListRestComponent,
  ],
  exports: [CmsBootstrapModule],
  providers: [
    {
      provide: CMS_COMPONENT,
      useValue: {
        definitionQualifiedName: 'app_sf_base_cm:component.common.text.pagelet2-Component',
        class: CMSTextComponent,
      },
      multi: true,
    },
    {
      provide: CMS_COMPONENT,
      useValue: {
        definitionQualifiedName: 'app_sf_base_cm:component.common.freeStyle.pagelet2-Component',
        class: CMSFreestyleComponent,
      },
      multi: true,
    },
    {
      provide: CMS_COMPONENT,
      useValue: {
        definitionQualifiedName: 'app_sf_base_cm:component.common.container.pagelet2-Component',
        class: CMSContainerComponent,
      },
      multi: true,
    },
    {
      provide: CMS_COMPONENT,
      useValue: {
        definitionQualifiedName: 'app_sf_base_cm:component.common.image.pagelet2-Component',
        class: CMSImageComponent,
      },
      multi: true,
    },
    {
      provide: CMS_COMPONENT,
      useValue: {
        definitionQualifiedName: 'app_sf_base_cm:component.common.imageEnhanced.pagelet2-Component',
        class: CMSImageEnhancedComponent,
      },
      multi: true,
    },
    {
      provide: CMS_COMPONENT,
      useValue: {
        definitionQualifiedName: 'app_sf_base_cm:component.common.carousel.pagelet2-Component',
        class: LazyCmsCarouselComponent,
      },
      multi: true,
    },
    {
      provide: CMS_COMPONENT,
      useValue: {
        definitionQualifiedName: 'app_sf_base_cm:component.common.productListManual.pagelet2-Component',
        class: LazyCmsProductListManualComponent,
      },
      multi: true,
    },
    {
      provide: CMS_COMPONENT,
      useValue: {
        definitionQualifiedName: 'app_sf_base_cm:component.common.productListFilter.pagelet2-Component',
        class: LazyCmsProductListFilterComponent,
      },
      multi: true,
    },
    {
      provide: CMS_COMPONENT,
      useValue: {
        definitionQualifiedName: 'app_sf_base_cm:component.common.productListCategory.pagelet2-Component',
        class: LazyCmsProductListCategoryComponent,
      },
      multi: true,
    },
    {
      provide: CMS_COMPONENT,
      useValue: {
        definitionQualifiedName: 'app_sf_base_cm:component.common.productListRest.pagelet2-Component',
        class: LazyCmsProductListRestComponent,
      },
      multi: true,
    },
    {
      provide: CMS_COMPONENT,
      useValue: {
        definitionQualifiedName: 'app_sf_base_cm:component.common.video.pagelet2-Component',
        class: CMSVideoComponent,
      },
      multi: true,
    },
    {
      provide: CMS_COMPONENT,
      useValue: {
        definitionQualifiedName: 'app_sf_base_cm:component.shopping.staticPage.pagelet2-Component',
        class: CMSStaticPageComponent,
      },
      multi: true,
    },
    {
      provide: CMS_COMPONENT,
      useValue: {
        definitionQualifiedName: 'app_sf_base_cm:pagevariant.standard.pagelet2-Pagevariant',
        class: CMSStandardPageComponent,
      },
      multi: true,
    },
    {
      provide: CMS_COMPONENT,
      useValue: {
        definitionQualifiedName: 'app_sf_base_cm:component.common.dialog.pagelet2-Component',
        class: CMSDialogComponent,
      },
      multi: true,
    },
  ],
})
export class CmsModule {}
