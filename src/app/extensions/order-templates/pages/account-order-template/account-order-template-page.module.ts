import { CdkTableModule } from '@angular/cdk/table';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from 'ish-shared/shared.module';

import { OrderTemplatesModule } from '../../order-templates.module';

import { AccountOrderTemplateListComponent } from './account-order-template-list/account-order-template-list.component';
import { AccountOrderTemplatePageComponent } from './account-order-template-page.component';

const accountOrderTemplatePageRoutes: Routes = [
  {
    path: '',
    component: AccountOrderTemplatePageComponent,
  },
];

@NgModule({
  imports: [CdkTableModule, RouterModule.forChild(accountOrderTemplatePageRoutes), OrderTemplatesModule, SharedModule],
  declarations: [AccountOrderTemplateListComponent, AccountOrderTemplatePageComponent],
})
export class AccountOrderTemplatePageModule {}
