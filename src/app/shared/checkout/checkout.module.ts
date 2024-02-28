import { NgModule } from '@angular/core';

import { AddressModule } from 'ish-shared/address/address.module';
import { FormlyAddressFormsModule } from 'ish-shared/formly-address-forms/formly-address-forms.module';
import { FormlyModule } from 'ish-shared/formly/formly.module';
import { SharedModule } from 'ish-shared/shared.module';

import { BasketInvoiceAddressWidgetComponent } from './basket-invoice-address-widget/basket-invoice-address-widget.component';
import { BasketShippingAddressWidgetComponent } from './basket-shipping-address-widget/basket-shipping-address-widget.component';

@NgModule({
  imports: [AddressModule, FormlyAddressFormsModule, FormlyModule, SharedModule],
  declarations: [BasketInvoiceAddressWidgetComponent, BasketShippingAddressWidgetComponent],
  exports: [BasketInvoiceAddressWidgetComponent, BasketShippingAddressWidgetComponent],
})
export class CheckoutModule {}
