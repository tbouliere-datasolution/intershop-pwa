import { NgModule } from '@angular/core';

import { SharedModule } from 'ish-shared/shared.module';

import { RecentlyViewedComponent } from './shared/recently-viewed/recently-viewed.component';
import { ProductModule } from 'ish-shared/product/product.module';

@NgModule({
  imports: [ProductModule, SharedModule],
  declarations: [RecentlyViewedComponent],
  exports: [SharedModule],
})
export class RecentlyModule {}
