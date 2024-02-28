import { NgModule } from '@angular/core';

import { BasketModule } from 'ish-shared/basket/basket.module';
import { CheckoutModule } from 'ish-shared/checkout/checkout.module';
import { FormlyAddressFormsModule } from 'ish-shared/formly-address-forms/formly-address-forms.module';
import { FormlyModule } from 'ish-shared/formly/formly.module';
import { LoginModule } from 'ish-shared/login/login.module';
import { SharedModule } from 'ish-shared/shared.module';

import { CheckoutAddressAnonymousComponent } from './checkout-address-anonymous/checkout-address-anonymous.component';
import { CheckoutAddressPageComponent } from './checkout-address-page.component';
import { CheckoutAddressComponent } from './checkout-address/checkout-address.component';
import { CheckoutAddressAnonymousFormComponent } from './formly/components/checkout-address-anonymous-form/checkout-address-anonymous-form.component';

@NgModule({
  imports: [BasketModule, CheckoutModule, FormlyAddressFormsModule, FormlyModule, LoginModule, SharedModule],
  declarations: [
    CheckoutAddressAnonymousComponent,
    CheckoutAddressAnonymousFormComponent,
    CheckoutAddressComponent,
    CheckoutAddressPageComponent,
  ],
})
export class CheckoutAddressPageModule {
  static component = CheckoutAddressPageComponent;
}
