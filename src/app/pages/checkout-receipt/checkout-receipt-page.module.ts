import { NgModule } from '@angular/core';
import { RequisitionManagementExportsModule } from 'requisition-management';

import { AddressModule } from 'ish-shared/address/address.module';
import { BasketModule } from 'ish-shared/basket/basket.module';
import { CheckoutModule } from 'ish-shared/checkout/checkout.module';
import { CmsModule } from 'ish-shared/cms/cms.module';
import { SharedModule } from 'ish-shared/shared.module';

import { CheckoutReceiptOrderComponent } from './checkout-receipt-order/checkout-receipt-order.component';
import { CheckoutReceiptPageComponent } from './checkout-receipt-page.component';
import { CheckoutReceiptComponent } from './checkout-receipt/checkout-receipt.component';

@NgModule({
  imports: [AddressModule, BasketModule, CheckoutModule, CmsModule, RequisitionManagementExportsModule, SharedModule],
  declarations: [CheckoutReceiptComponent, CheckoutReceiptOrderComponent, CheckoutReceiptPageComponent],
})
export class CheckoutReceiptPageModule {
  static component = CheckoutReceiptPageComponent;
}
