import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CmsModule } from 'ish-shared/cms/cms.module';
import { SharedModule } from 'ish-shared/shared.module';

import { ContentPageComponent } from './content-page.component';

const contentPageRoutes: Routes = [
  {
    // compatibility to old routes
    path: 'page/:contentPageId',
    component: ContentPageComponent,
  },
  {
    path: '**',
    component: ContentPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(contentPageRoutes), CmsModule, SharedModule],
  declarations: [ContentPageComponent],
})
export class ContentPageModule {}
