import { NgModule } from '@angular/core';

import { FormlyModule } from 'ish-shared/formly/formly.module';
import { SharedModule } from 'ish-shared/shared.module';

import { Auth0SignInComponent } from './auth0-sign-in/auth0-sign-in.component';
import { IdentityProviderLoginComponent } from './identity-provider-login/identity-provider-login.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginModalComponent } from './login-modal/login-modal.component';

@NgModule({
  imports: [FormlyModule, SharedModule],
  declarations: [Auth0SignInComponent, IdentityProviderLoginComponent, LoginFormComponent, LoginModalComponent],
  exports: [IdentityProviderLoginComponent, LoginFormComponent],
})
export class LoginModule {}
