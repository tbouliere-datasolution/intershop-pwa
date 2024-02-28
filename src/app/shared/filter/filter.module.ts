import { NgModule } from '@angular/core';
import { SharedModule } from 'ish-shared/shared.module';
import { FilterTextComponent } from './filter-text/filter-text.component';
import { FilterSwatchImagesComponent } from './filter-swatch-images/filter-swatch-images.component';
import { FilterNavigationSidebarComponent } from './filter-navigation-sidebar/filter-navigation-sidebar.component';
import { FilterNavigationHorizontalComponent } from './filter-navigation-horizontal/filter-navigation-horizontal.component';
import { FilterNavigationBadgesComponent } from './filter-navigation-badges/filter-navigation-badges.component';
import { FilterDropdownComponent } from './filter-dropdown/filter-dropdown.component';
import { FilterCollapsibleComponent } from './filter-collapsible/filter-collapsible.component';
import { FilterCheckboxComponent } from './filter-checkbox/filter-checkbox.component';
import { FilterNavigationComponent } from './filter-navigation/filter-navigation.component';

@NgModule({
  imports: [SharedModule],
  declarations: [
    FilterCheckboxComponent,
    FilterCollapsibleComponent,
    FilterDropdownComponent,
    FilterNavigationBadgesComponent,
    FilterNavigationHorizontalComponent,
    FilterNavigationSidebarComponent,
    FilterSwatchImagesComponent,
    FilterTextComponent,
    FilterNavigationComponent,
  ],
  exports: [
    FilterCheckboxComponent,
    FilterCollapsibleComponent,
    FilterDropdownComponent,
    FilterNavigationBadgesComponent,
    FilterNavigationHorizontalComponent,
    FilterNavigationSidebarComponent,
    FilterSwatchImagesComponent,
    FilterTextComponent,
    FilterNavigationComponent,
  ],
})
export class FilterModule {}
