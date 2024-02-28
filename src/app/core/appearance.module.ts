import { NgModule } from '@angular/core';

import { IconModule } from './icon.module';
import { ThemeService } from './utils/theme/theme.service';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    IconModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 3000,
      positionClass: 'toast-top-full-width', // toast-top-center
      preventDuplicates: true,
    }),
  ],
})
export class AppearanceModule {
  constructor(themeService: ThemeService) {
    themeService.init();
  }
}
