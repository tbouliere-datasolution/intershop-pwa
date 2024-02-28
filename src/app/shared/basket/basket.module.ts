import { NgModule } from '@angular/core';

import { AddressModule } from 'ish-shared/address/address.module';
import { BasketCoreModule } from 'ish-shared/basket-core/basket-core.module';
import { FormlyModule } from 'ish-shared/formly/formly.module';
import { ProductModule } from 'ish-shared/product/product.module';
import { PromotionModule } from 'ish-shared/promotion/promotion.module';
import { SharedModule } from 'ish-shared/shared.module';

import { BasketAddressSummaryComponent } from './basket-address-summary/basket-address-summary.component';
import { BasketApprovalInfoComponent } from './basket-approval-info/basket-approval-info.component';
import { BasketBuyerComponent } from './basket-buyer/basket-buyer.component';
import { BasketCostCenterSelectionComponent } from './basket-cost-center-selection/basket-cost-center-selection.component';
import { BasketCostSummaryComponent } from './basket-cost-summary/basket-cost-summary.component';
import { BasketDesiredDeliveryDateComponent } from './basket-desired-delivery-date/basket-desired-delivery-date.component';
import { BasketInfoComponent } from './basket-info/basket-info.component';
import { BasketItemsSummaryComponent } from './basket-items-summary/basket-items-summary.component';
import { BasketMerchantMessageViewComponent } from './basket-merchant-message-view/basket-merchant-message-view.component';
import { BasketMerchantMessageComponent } from './basket-merchant-message/basket-merchant-message.component';
import { BasketOrderReferenceComponent } from './basket-order-reference/basket-order-reference.component';
import { BasketPromotionCodeComponent } from './basket-promotion-code/basket-promotion-code.component';
import { BasketPromotionComponent } from './basket-promotion/basket-promotion.component';
import { BasketShippingMethodComponent } from './basket-shipping-method/basket-shipping-method.component';
import { BasketValidationItemsComponent } from './basket-validation-items/basket-validation-items.component';
import { BasketValidationProductsComponent } from './basket-validation-products/basket-validation-products.component';
import { BasketValidationResultsComponent } from './basket-validation-results/basket-validation-results.component';
import { ClearBasketComponent } from './clear-basket/clear-basket.component';
import { LineItemEditDialogComponent } from './line-item-edit-dialog/line-item-edit-dialog.component';
import { LineItemEditComponent } from './line-item-edit/line-item-edit.component';
import { LineItemListElementComponent } from './line-item-list-element/line-item-list-element.component';
import { LineItemListComponent } from './line-item-list/line-item-list.component';

@NgModule({
  imports: [AddressModule, BasketCoreModule, FormlyModule, ProductModule, PromotionModule, SharedModule],
  declarations: [
    BasketAddressSummaryComponent,
    BasketApprovalInfoComponent,
    BasketBuyerComponent,
    BasketCostCenterSelectionComponent,
    BasketCostSummaryComponent,
    BasketDesiredDeliveryDateComponent,
    BasketInfoComponent,
    BasketItemsSummaryComponent,
    BasketMerchantMessageComponent,
    BasketMerchantMessageViewComponent,
    BasketOrderReferenceComponent,
    BasketPromotionCodeComponent,
    BasketPromotionComponent,
    BasketShippingMethodComponent,
    BasketValidationItemsComponent,
    BasketValidationProductsComponent,
    BasketValidationResultsComponent,
    ClearBasketComponent,
    LineItemEditComponent,
    LineItemEditDialogComponent,
    LineItemListComponent,
    LineItemListElementComponent,
  ],
  exports: [
    BasketAddressSummaryComponent,
    BasketApprovalInfoComponent,
    BasketBuyerComponent,
    BasketCoreModule,
    BasketCostCenterSelectionComponent,
    BasketCostSummaryComponent,
    BasketDesiredDeliveryDateComponent,
    BasketInfoComponent,
    BasketItemsSummaryComponent,
    BasketMerchantMessageComponent,
    BasketMerchantMessageViewComponent,
    BasketOrderReferenceComponent,
    BasketPromotionCodeComponent,
    BasketPromotionComponent,
    BasketShippingMethodComponent,
    BasketValidationResultsComponent,
    ClearBasketComponent,
    LineItemListComponent,
  ],
})
export class BasketModule {}
