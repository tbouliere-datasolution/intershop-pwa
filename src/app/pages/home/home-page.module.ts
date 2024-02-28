import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CmsModule } from 'ish-shared/cms/cms.module';
import { SharedModule } from 'ish-shared/shared.module';

import { HomePageComponent } from './home-page.component';

const homePageRoutes: Routes = [{ path: '', component: HomePageComponent, data: { wrapperClass: 'homepage' } }];

@NgModule({
  imports: [RouterModule.forChild(homePageRoutes), CmsModule, SharedModule],
  declarations: [HomePageComponent],
})
export class HomePageModule {}
