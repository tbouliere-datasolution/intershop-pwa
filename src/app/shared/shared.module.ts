import { Injector, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthorizationToggleModule } from 'ish-core/authorization-toggle.module';
import { FeatureToggleModule } from 'ish-core/feature-toggle.module';
import { RoleToggleModule } from 'ish-core/role-toggle.module';
import { FeatureEventService } from 'ish-core/utils/feature-event/feature-event.service';
import { ModuleLoaderService } from 'ish-core/utils/module-loader/module-loader.service';

import { AddressDoctorExportsModule } from '../extensions/address-doctor/exports/address-doctor-exports.module';
import { CaptchaExportsModule } from '../extensions/captcha/exports/captcha-exports.module';
import { CompareExportsModule } from '../extensions/compare/exports/compare-exports.module';
import { ContactUsExportsModule } from '../extensions/contact-us/exports/contact-us-exports.module';
import { OrderTemplatesExportsModule } from '../extensions/order-templates/exports/order-templates-exports.module';
import { ProductNotificationsExportsModule } from '../extensions/product-notifications/exports/product-notifications-exports.module';
import { PunchoutExportsModule } from '../extensions/punchout/exports/punchout-exports.module';
import { QuickorderExportsModule } from '../extensions/quickorder/exports/quickorder-exports.module';
import { QuotingExportsModule } from '../extensions/quoting/exports/quoting-exports.module';
import { RatingExportsModule } from '../extensions/rating/exports/rating-exports.module';
import { RecentlyExportsModule } from '../extensions/recently/exports/recently-exports.module';
import { StoreLocatorExportsModule } from '../extensions/store-locator/exports/store-locator-exports.module';
import { TactonExportsModule } from '../extensions/tacton/exports/tacton-exports.module';
import { WishlistsExportsModule } from '../extensions/wishlists/exports/wishlists-exports.module';

import { BasicSharedModule } from './basic-shared.module';
import { UiSharedModule } from './ui-shared.module';
import { UtilsModule } from './utils/utils.module';

const importExportModules = [
  BasicSharedModule,
  UiSharedModule,
  AddressDoctorExportsModule,
  AuthorizationToggleModule,
  CaptchaExportsModule,
  CompareExportsModule,
  ContactUsExportsModule,
  FeatureToggleModule,
  OrderTemplatesExportsModule,
  ProductNotificationsExportsModule,
  PunchoutExportsModule,
  QuickorderExportsModule,
  QuotingExportsModule,
  RatingExportsModule,
  ReactiveFormsModule,
  RecentlyExportsModule,
  RoleToggleModule,
  StoreLocatorExportsModule,
  TactonExportsModule,
  UtilsModule,
  WishlistsExportsModule,
];

@NgModule({
  imports: [...importExportModules],

  exports: [...importExportModules],
})
export class SharedModule {
  constructor(moduleLoader: ModuleLoaderService, featureEventNotifier: FeatureEventService, injector: Injector) {
    moduleLoader.init(injector);
    featureEventNotifier.setupAvailableResultListener(injector);
  }
}
