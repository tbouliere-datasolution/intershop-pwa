import { NgModule } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { BasicSharedModule } from 'ish-shared/basic-shared.module';

import { AccordionItemComponent } from './accordion-item/accordion-item.component';
import { AccordionComponent } from './accordion/accordion.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { InPlaceEditComponent } from './in-place-edit/in-place-edit.component';
import { InfoBoxComponent } from './info-box/info-box.component';
import { InfoMessageComponent } from './info-message/info-message.component';
import { LoadingComponent } from './loading/loading.component';
import { ModalDialogLinkComponent } from './modal-dialog-link/modal-dialog-link.component';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';
import { PagingComponent } from './paging/paging.component';
import { SuccessMessageComponent } from './success-message/success-message.component';

@NgModule({
  imports: [BasicSharedModule, NgbCollapseModule],
  declarations: [
    AccordionComponent,
    AccordionItemComponent,
    BreadcrumbComponent,
    ErrorMessageComponent,
    InfoBoxComponent,
    InfoMessageComponent,
    InPlaceEditComponent,
    LoadingComponent,
    ModalDialogComponent,
    ModalDialogLinkComponent,
    PagingComponent,
    SuccessMessageComponent,
  ],
  exports: [
    AccordionComponent,
    AccordionItemComponent,
    BreadcrumbComponent,
    ErrorMessageComponent,
    InfoBoxComponent,
    InfoMessageComponent,
    InPlaceEditComponent,
    LoadingComponent,
    ModalDialogComponent,
    ModalDialogLinkComponent,
    PagingComponent,
    SuccessMessageComponent,
  ],
})
export class UtilsModule {}
