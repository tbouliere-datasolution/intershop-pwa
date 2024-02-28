import {
  ApplicationRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  Input,
  OnChanges,
  ViewChild,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { map, take } from 'rxjs/operators';

import { ContentPageletView } from 'ish-core/models/content-view/content-view.model';
import { arraySlices } from 'ish-core/utils/functions';
import { whenTruthy } from 'ish-core/utils/operators';
import { CMSComponent } from 'ish-shared/cms-bootstrap/models/cms-component/cms-component.model';
import { GenerateLazyComponent } from 'ish-core/utils/module-loader/generate-lazy-component.decorator';

@Component({
  selector: 'ish-cms-carousel',
  templateUrl: './cms-carousel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@GenerateLazyComponent()
export class CmsCarouselComponent implements CMSComponent, OnChanges {
  @Input({ required: true }) pagelet: ContentPageletView;

  @ViewChild('ngbCarousel') carousel: NgbCarousel;

  slideItems = 6;
  itemGridSize = 12;
  pageletSlides: string[][] = [];

  constructor(private appRef: ApplicationRef, private cdRef: ChangeDetectorRef) {}

  private destroyRef = inject(DestroyRef);

  ngOnChanges() {
    if (this.pagelet.hasParam('SlideItems')) {
      this.slideItems = this.pagelet.numberParam('SlideItems');
    }
    this.itemGridSize = (12 - (12 % this.slideItems)) / this.slideItems;

    const slotPagelets = this.pagelet.slot('app_sf_base_cm:slot.carousel.items.pagelet2-Slot').pageletIDs;
    this.pageletSlides = arraySlices(slotPagelets, this.slideItems);

    if (!SSR) {
      this.appRef.isStable
        .pipe(
          whenTruthy(),
          map(() => (this.pagelet.booleanParam('StartCycling') ? this.pagelet.numberParam('SlideInterval', 5000) : 0)),
          take(1),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe(val => {
          if (val && this.carousel) {
            this.carousel.interval = val;
            this.carousel.cycle();
          }
        });
    }

    // Lazy component bug
    this.cdRef.detectChanges();
  }
}
