import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from 'ish-shared/shared.module';

import { ErrorPageComponent } from './error-page.component';
import { ErrorComponent } from './error/error.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { SearchModule } from 'ish-shared/search/search.module';

const errorPageRoutes: Routes = [
  { path: '', component: ErrorPageComponent, data: { wrapperClass: 'errorpage', headerType: 'error' } },
];

@NgModule({
  imports: [RouterModule.forChild(errorPageRoutes), SearchModule, SharedModule],
  declarations: [ErrorComponent, ErrorPageComponent, ServerErrorComponent],
})
export class ErrorPageModule {}
