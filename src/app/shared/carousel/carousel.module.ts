import { NgModule } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'ish-shared/shared.module';
import { CmsCarouselComponent } from './cms-carousel/cms-carousel.component';
import { CmsBootstrapModule } from 'ish-shared/cms-bootstrap/cms-bootstrap.module';

@NgModule({
  imports: [NgbCarouselModule, CmsBootstrapModule, SharedModule],
  declarations: [CmsCarouselComponent],
  exports: [NgbCarouselModule, CmsCarouselComponent],
})
export class CarouselModule {}
