import { NgModule } from '@angular/core';

import { SharedModule } from 'ish-shared/shared.module';

import { LanguageSwitchComponent } from './language-switch/language-switch.component';

@NgModule({
  imports: [SharedModule],
  declarations: [LanguageSwitchComponent],
  exports: [LanguageSwitchComponent],
})
export class LanguageModule {}
