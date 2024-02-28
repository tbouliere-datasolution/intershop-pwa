import { NgModule } from '@angular/core';
import {
  NgbCollapseModule,
  NgbDropdownModule,
  NgbModalModule,
  NgbPopoverConfig,
  NgbPopoverModule,
} from '@ng-bootstrap/ng-bootstrap';

const importExportModules = [NgbCollapseModule, NgbDropdownModule, NgbModalModule, NgbPopoverModule];

@NgModule({
  imports: [...importExportModules],
  exports: [...importExportModules],
})
export class UiSharedModule {
  constructor(popoverConfig: NgbPopoverConfig) {
    popoverConfig.placement = 'top';
    popoverConfig.triggers = 'hover';
    popoverConfig.container = 'body';
  }
}
