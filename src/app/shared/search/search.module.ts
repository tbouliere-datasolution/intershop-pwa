import { NgModule } from '@angular/core';
import { SharedModule } from 'ish-shared/shared.module';
import { SearchBoxComponent } from './search-box/search-box.component';
import { CollapsibleSearchBoxComponent } from './collapsible-search-box/collapsible-search-box.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [SharedModule, NgbCollapseModule],
  declarations: [SearchBoxComponent, CollapsibleSearchBoxComponent],
  exports: [SearchBoxComponent, CollapsibleSearchBoxComponent],
})
export class SearchModule {}
