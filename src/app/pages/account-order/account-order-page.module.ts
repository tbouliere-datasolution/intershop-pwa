import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddressModule } from 'ish-shared/address/address.module';
import { BasketModule } from 'ish-shared/basket/basket.module';
import { SharedModule } from 'ish-shared/shared.module';

import { AccountOrderPageComponent } from './account-order-page.component';
import { AccountOrderComponent } from './account-order/account-order.component';

const routes: Routes = [
  {
    path: '',
    component: AccountOrderPageComponent,
    children: [
      {
        path: '**',
        component: AccountOrderPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), AddressModule, BasketModule, SharedModule],
  declarations: [AccountOrderComponent, AccountOrderPageComponent],
})
export class AccountOrderPageModule {}
