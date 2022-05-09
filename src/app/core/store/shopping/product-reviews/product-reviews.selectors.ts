import { createSelector } from '@ngrx/store';

import { getShoppingState } from 'ish-core/store/shopping/shopping-store';

import { productReviewsAdapter } from './product-reviews.reducer';

const getProductReviewsState = createSelector(getShoppingState, state => state.productReviews);

const { selectAll, selectEntities } = productReviewsAdapter.getSelectors(getProductReviewsState);

export const getProductReviewBySku = (sku: string) =>
  createSelector(selectEntities, entities => entities[sku]?.reviews);

export const getProductReviews = selectAll;