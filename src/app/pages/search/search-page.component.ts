import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { AppFacade } from 'ish-core/facades/app.facade';
import { InstantSearchFacade } from 'ish-core/facades/instant-search.facade';
import { ShoppingFacade } from 'ish-core/facades/shopping.facade';
import { DeviceType } from 'ish-core/models/viewtype/viewtype.types';

@Component({
  selector: 'ish-search-page',
  templateUrl: './search-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPageComponent implements OnInit {
  searchTerm$: Observable<string>;
  numberOfItems$: Observable<number>;
  searchLoading$: Observable<boolean>;
  deviceType$: Observable<DeviceType>;
  filterParams$: Observable<string>;
  hasInstantSearch$: Observable<boolean>;

  constructor(
    private shoppingFacade: ShoppingFacade,
    private appFacade: AppFacade,
    private activatedRoute: ActivatedRoute,
    private instantSearchFacade: InstantSearchFacade
  ) {}

  ngOnInit() {
    this.searchTerm$ = this.shoppingFacade.searchTerm$;
    this.numberOfItems$ = this.shoppingFacade.searchItemsCount$;
    this.searchLoading$ = this.shoppingFacade.searchLoading$;
    this.deviceType$ = this.appFacade.deviceType$;
    this.filterParams$ = this.activatedRoute.queryParamMap.pipe(map(x => x.get('filters')));
    this.hasInstantSearch$ = this.instantSearchFacade.select('activated').pipe(startWith(false));
  }
}
