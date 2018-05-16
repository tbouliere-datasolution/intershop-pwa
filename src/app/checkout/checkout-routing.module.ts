import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'basket', loadChildren: 'app/checkout/containers/basket-page/basket-page.module#BasketPageModule' },
  {
    path: 'checkout/address',
    loadChildren:
      'app/checkout/containers/checkout-address-page/checkout-address-page.module#CheckoutAddressPageModule',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutRoutingModule {}
