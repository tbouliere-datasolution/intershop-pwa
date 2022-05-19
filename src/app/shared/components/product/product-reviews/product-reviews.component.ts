import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountFacade } from 'ish-core/facades/account.facade';
import { ProductContextFacade } from 'ish-core/facades/product-context.facade';
import { ProductReview } from 'ish-core/models/product-reviews/product-review.model';
import { range } from 'lodash-es';
import { Observable, Subject } from 'rxjs';
import { filter, map, take, takeUntil } from 'rxjs/operators';
import { CreateReviewModalComponent } from './create-review-modal/create-review-modal.component';

@Component({
  selector: 'ish-product-reviews',
  templateUrl: './product-reviews.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductReviewsComponent implements OnInit {
  productReviews$: Observable<ProductReview[]>;
  stars$: Observable<('full' | 'half' | 'empty')[]>;
  rating$: Observable<number>;

  private destroy$ = new Subject<void>();

  constructor(private context: ProductContextFacade, private accountFacade: AccountFacade, private router: Router) {}

  ngOnInit() {
    this.productReviews$ = this.context.select('reviews');
    this.rating$ = this.context.select('product', 'roundedAverageRating').pipe(filter(x => typeof x === 'number'));
    this.stars$ = this.rating$.pipe(
      map(rate => range(1, 6).map(index => (index <= rate ? 'full' : index - 0.5 === rate ? 'half' : 'empty')))
    );
  }

  /**
   * if the user is not logged in display login dialog, else open select wishlist dialog
   */
  openModal(modal: CreateReviewModalComponent) {
    this.accountFacade.isLoggedIn$.pipe(take(1), takeUntil(this.destroy$)).subscribe(isLoggedIn => {
      if (isLoggedIn) {
        modal.show();
      } else {
        // stay on the same page after login
        const queryParams = { returnUrl: this.router.routerState.snapshot.url, messageKey: 'wishlists' };
        this.router.navigate(['/login'], { queryParams });
      }
    });
  }
}
