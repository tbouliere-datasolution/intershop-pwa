import { NgModule } from '@angular/core';
import { ConfigOption, FormlyModule as CoreFormly } from '@ngx-formly/core';

import { AddressModule } from 'ish-shared/address/address.module';
import { BasketModule } from 'ish-shared/basket/basket.module';
import { CheckoutModule } from 'ish-shared/checkout/checkout.module';
import { CmsModule } from 'ish-shared/cms/cms.module';
import { FormlyModule } from 'ish-shared/formly/formly.module';
import { SharedModule } from 'ish-shared/shared.module';

import { CheckoutReviewPageComponent } from './checkout-review-page.component';
import { CheckoutReviewComponent } from './checkout-review/checkout-review.component';
import { CheckoutReviewTacFieldComponent } from './formly/checkout-review-tac-field/checkout-review-tac-field.component';

const checkoutReviewFormlyConfig: ConfigOption = {
  types: [
    {
      name: 'ish-checkout-review-tac-field',
      component: CheckoutReviewTacFieldComponent,
    },
  ],
};

@NgModule({
  imports: [
    CoreFormly.forChild(checkoutReviewFormlyConfig),
    AddressModule,
    BasketModule,
    CheckoutModule,
    CmsModule,
    FormlyModule,
    SharedModule,
  ],
  declarations: [CheckoutReviewComponent, CheckoutReviewPageComponent, CheckoutReviewTacFieldComponent],
})
export class CheckoutReviewPageModule {
  static component = CheckoutReviewPageComponent;
}
