import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecentlyModule } from '../../recently.module';

import { RecentlyPageComponent } from './recently-page.component';
import { ProductModule } from 'ish-shared/product/product.module';

const recentlyPageRoutes: Routes = [
  {
    path: '',
    component: RecentlyPageComponent,
    data: {
      meta: {
        title: 'application.recentlyViewed.heading',
        robots: 'noindex, nofollow',
      },
      breadcrumbData: [{ key: 'application.recentlyViewed.breadcrumb.label' }],
    },
  },
];

@NgModule({
  imports: [RecentlyModule, ProductModule, RouterModule.forChild(recentlyPageRoutes)],
  declarations: [RecentlyPageComponent],
})
export class RecentlyPageModule {}
