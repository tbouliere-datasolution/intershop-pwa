import { CdkTableModule } from '@angular/cdk/table';
import { NgModule } from '@angular/core';

import { AddressModule } from 'ish-shared/address/address.module';
import { SharedModule } from 'ish-shared/shared.module';

import { OrderListComponent } from './order-list/order-list.component';
import { OrderWidgetComponent } from './order-widget/order-widget.component';

@NgModule({
  imports: [AddressModule, CdkTableModule, SharedModule],
  declarations: [OrderListComponent, OrderWidgetComponent],
  exports: [OrderListComponent, OrderWidgetComponent],
})
export class OrderModule {}
