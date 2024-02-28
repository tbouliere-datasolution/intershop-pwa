import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormlyModule } from 'ish-shared/formly/formly.module';
import { SharedModule } from 'ish-shared/shared.module';

import { AccountProfileCompanyPageComponent } from './account-profile-company-page.component';
import { AccountProfileCompanyComponent } from './account-profile-company/account-profile-company.component';

const accountProfileCompanyPageRoutes: Routes = [{ path: '', component: AccountProfileCompanyPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(accountProfileCompanyPageRoutes), FormlyModule, SharedModule],
  declarations: [AccountProfileCompanyComponent, AccountProfileCompanyPageComponent],
})
export class AccountProfileCompanyPageModule {}
