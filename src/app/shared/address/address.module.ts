import { NgModule } from '@angular/core';

import { SharedModule } from 'ish-shared/shared.module';

import { AddressComponent } from './address/address.component';

@NgModule({
  imports: [SharedModule],
  declarations: [AddressComponent],
  exports: [AddressComponent],
})
export class AddressModule {}
