import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from 'ish-shared/shared.module';

import { WishlistsModule } from '../../wishlists.module';

import { AccountWishlistDetailLineItemComponent } from './account-wishlist-detail-line-item/account-wishlist-detail-line-item.component';
import { AccountWishlistDetailPageComponent } from './account-wishlist-detail-page.component';
import { ProductModule } from 'ish-shared/product/product.module';

const accountWishlistDetailPageRoutes: Routes = [
  {
    path: '',
    component: AccountWishlistDetailPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(accountWishlistDetailPageRoutes), ProductModule, SharedModule, WishlistsModule],
  declarations: [AccountWishlistDetailLineItemComponent, AccountWishlistDetailPageComponent],
})
export class AccountWishlistDetailPageModule {}
