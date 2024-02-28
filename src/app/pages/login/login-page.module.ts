import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { loginGuard } from 'ish-core/guards/login.guard';
import { LoginModule } from 'ish-shared/login/login.module';
import { SharedModule } from 'ish-shared/shared.module';

import { LoginPageComponent } from './login-page.component';

const loginPageRoutes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
    canActivate: [loginGuard],
    data: {
      meta: {
        title: 'account.login.link',
        robots: 'noindex, nofollow',
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(loginPageRoutes), LoginModule, SharedModule],
  declarations: [LoginPageComponent],
})
export class LoginPageModule {}
