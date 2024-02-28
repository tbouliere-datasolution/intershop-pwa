import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CmsModule } from 'ish-shared/cms/cms.module';
import { SharedModule } from 'ish-shared/shared.module';

import { SearchNoResultComponent } from './search-no-result/search-no-result.component';
import { SearchPageComponent } from './search-page.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { SearchModule } from 'ish-shared/search/search.module';
import { ProductModule } from 'ish-shared/product/product.module';
import { FilterModule } from 'ish-shared/filter/filter.module';

const searchPageRoutes: Routes = [
  {
    path: ':searchTerm',
    component: SearchPageComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(searchPageRoutes),
    CmsModule,
    SearchModule,
    ProductModule,
    FilterModule,
    SharedModule,
  ],
  declarations: [SearchNoResultComponent, SearchPageComponent, SearchResultComponent],
})
export class SearchPageModule {}
