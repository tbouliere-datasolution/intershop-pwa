import { NgModule } from '@angular/core';
import { SharedModule } from 'ish-shared/shared.module';
import { ContentDesignViewWrapperComponent } from './components/content-design-view-wrapper/content-design-view-wrapper.component';
import { ContentIncludeComponent } from './components/content-include/content-include.component';
import { ContentNavigationComponent } from './components/content-navigation/content-navigation.component';
import { ContentPageletComponent } from './components/content-pagelet/content-pagelet.component';
import { ContentSlotComponent } from './components/content-slot/content-slot.component';
import { ContentViewcontextComponent } from './components/content-viewcontext/content-viewcontext.component';

@NgModule({
  imports: [SharedModule],
  declarations: [
    ContentDesignViewWrapperComponent,
    ContentIncludeComponent,
    ContentNavigationComponent,
    ContentPageletComponent,
    ContentSlotComponent,
    ContentViewcontextComponent,
  ],
  exports: [
    ContentDesignViewWrapperComponent,
    ContentIncludeComponent,
    ContentNavigationComponent,
    ContentPageletComponent,
    ContentSlotComponent,
    ContentViewcontextComponent,
  ],
})
export class CmsBootstrapModule {}
