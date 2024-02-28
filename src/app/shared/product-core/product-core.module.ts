import { NgModule } from '@angular/core';

import { ProductImageComponent } from 'ish-shared/product-core/product-image/product-image.component';
import { PromotionModule } from 'ish-shared/promotion/promotion.module';
import { SharedModule } from 'ish-shared/shared.module';

import { ProductAddToBasketComponent } from './product-add-to-basket/product-add-to-basket.component';
import { ProductAttachmentsComponent } from './product-attachments/product-attachments.component';
import { ProductAttributesComponent } from './product-attributes/product-attributes.component';
import { ProductBundleDisplayComponent } from './product-bundle-display/product-bundle-display.component';
import { ProductChooseVariationComponent } from './product-choose-variation/product-choose-variation.component';
import { ProductIdComponent } from './product-id/product-id.component';
import { ProductInventoryComponent } from './product-inventory/product-inventory.component';
import { ProductItemVariationsComponent } from './product-item-variations/product-item-variations.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductLabelComponent } from './product-label/product-label.component';
import { ProductNameComponent } from './product-name/product-name.component';
import { ProductPriceComponent } from './product-price/product-price.component';
import { ProductPromotionComponent } from './product-promotion/product-promotion.component';
import { ProductQuantityLabelComponent } from './product-quantity-label/product-quantity-label.component';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { ProductRowComponent } from './product-row/product-row.component';
import { ProductShipmentComponent } from './product-shipment/product-shipment.component';
import { ProductTileComponent } from './product-tile/product-tile.component';
import { ProductVariationDisplayComponent } from './product-variation-display/product-variation-display.component';
import { ProductVariationSelectDefaultComponent } from './product-variation-select-default/product-variation-select-default.component';
import { ProductVariationSelectEnhancedComponent } from './product-variation-select-enhanced/product-variation-select-enhanced.component';
import { ProductVariationSelectSwatchComponent } from './product-variation-select-swatch/product-variation-select-swatch.component';
import { ProductVariationSelectComponent } from './product-variation-select/product-variation-select.component';

@NgModule({
  imports: [PromotionModule, SharedModule],
  declarations: [
    ProductAddToBasketComponent,
    ProductAttachmentsComponent,
    ProductAttributesComponent,
    ProductIdComponent,
    ProductImageComponent,
    ProductItemVariationsComponent,
    ProductLabelComponent,
    ProductNameComponent,
    ProductPromotionComponent,
    ProductBundleDisplayComponent,
    ProductRowComponent,
    ProductShipmentComponent,
    ProductTileComponent,
    ProductVariationDisplayComponent,
    ProductVariationSelectComponent,
    ProductVariationSelectDefaultComponent,
    ProductVariationSelectEnhancedComponent,
    ProductVariationSelectSwatchComponent,
    ProductChooseVariationComponent,
    ProductImageComponent,
    ProductInventoryComponent,
    ProductPriceComponent,
    ProductItemComponent,
    ProductQuantityComponent,
    ProductQuantityLabelComponent,
  ],
  exports: [
    ProductAddToBasketComponent,
    ProductIdComponent,
    ProductImageComponent,
    ProductImageComponent,
    ProductInventoryComponent,
    ProductItemComponent,
    ProductLabelComponent,
    ProductNameComponent,
    ProductPromotionComponent,
    ProductRowComponent,
    ProductAttachmentsComponent,
    ProductShipmentComponent,
    ProductTileComponent,
    ProductVariationDisplayComponent,
    ProductVariationSelectComponent,
    ProductVariationSelectDefaultComponent,
    ProductVariationSelectEnhancedComponent,
    ProductVariationSelectSwatchComponent,
    ProductAttributesComponent,
    ProductBundleDisplayComponent,
    ProductPriceComponent,
    ProductQuantityComponent,
    ProductQuantityLabelComponent,
  ],
})
export class ProductCoreModule {}
