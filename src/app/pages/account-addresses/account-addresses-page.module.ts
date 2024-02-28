import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddressModule } from 'ish-shared/address/address.module';
import { FormlyAddressFormsModule } from 'ish-shared/formly-address-forms/formly-address-forms.module';
import { FormlyModule } from 'ish-shared/formly/formly.module';
import { SharedModule } from 'ish-shared/shared.module';

import { AccountAddressesPageComponent } from './account-addresses-page.component';
import { AccountAddressesComponent } from './account-addresses/account-addresses.component';

const routes: Routes = [{ path: '', component: AccountAddressesPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes), AddressModule, FormlyAddressFormsModule, FormlyModule, SharedModule],
  declarations: [AccountAddressesComponent, AccountAddressesPageComponent],
})
export class AccountAddressesPageModule {}
