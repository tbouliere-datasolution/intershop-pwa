import { NgModule } from '@angular/core';

import { BasketCoreModule } from 'ish-shared/basket-core/basket-core.module';
import { CmsModule } from 'ish-shared/cms/cms.module';
import { LanguageModule } from 'ish-shared/language/language.module';
import { ProductCoreModule } from 'ish-shared/product-core/product-core.module';
import { SharedModule } from 'ish-shared/shared.module';

import { GlobalNavigationComponent } from './global-navigation/global-navigation.component';
import { HeaderNavigationComponent } from './header-navigation/header-navigation.component';
import { LoginStatusComponent } from './login-status/login-status.component';
import { MiniBasketContentComponent } from './mini-basket-content/mini-basket-content.component';
import { SubCategoryNavigationComponent } from './sub-category-navigation/sub-category-navigation.component';
import { UserInformationMobileComponent } from './user-information-mobile/user-information-mobile.component';

@NgModule({
  imports: [BasketCoreModule, CmsModule, LanguageModule, ProductCoreModule, SharedModule],
  declarations: [
    GlobalNavigationComponent,
    HeaderNavigationComponent,
    LoginStatusComponent,
    MiniBasketContentComponent,
    SubCategoryNavigationComponent,
    UserInformationMobileComponent,
  ],
  exports: [GlobalNavigationComponent, LoginStatusComponent, MiniBasketContentComponent],
})
export class NavigationModule {}
