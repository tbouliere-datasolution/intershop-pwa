import { NgModule } from '@angular/core';

import { SharedModule } from 'ish-shared/shared.module';

import { BasketErrorMessageComponent } from './basket-error-message/basket-error-message.component';

@NgModule({
  imports: [SharedModule],
  declarations: [BasketErrorMessageComponent],
  exports: [BasketErrorMessageComponent],
})
export class BasketCoreModule {}
