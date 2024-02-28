import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrderModule } from 'ish-shared/order/order.module';
import { SharedModule } from 'ish-shared/shared.module';

import { OrganizationManagementModule } from '../../organization-management.module';

import { CostCenterDetailPageComponent } from './cost-center-detail-page.component';

const costCenterDetailPageRoutes: Routes = [{ path: '', component: CostCenterDetailPageComponent }];

@NgModule({
  imports: [OrderModule, RouterModule.forChild(costCenterDetailPageRoutes), OrganizationManagementModule, SharedModule],
  declarations: [CostCenterDetailPageComponent],
})
export class CostCenterDetailPageModule {}
