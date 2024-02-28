import { NgModule } from '@angular/core';

import { SharedModule } from 'ish-shared/shared.module';

import { PromotionDetailsComponent } from './promotion-details/promotion-details.component';
import { PromotionRemoveComponent } from './promotion-remove/promotion-remove.component';

@NgModule({
  imports: [SharedModule],
  declarations: [PromotionDetailsComponent, PromotionRemoveComponent],
  exports: [PromotionDetailsComponent, PromotionRemoveComponent],
})
export class PromotionModule {}
