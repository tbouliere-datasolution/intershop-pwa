import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BasketModule } from 'ish-shared/basket/basket.module';
import { CmsModule } from 'ish-shared/cms/cms.module';
import { SharedModule } from 'ish-shared/shared.module';

import { BasketPageComponent } from './basket-page.component';
import { ShoppingBasketEmptyComponent } from './shopping-basket-empty/shopping-basket-empty.component';
import { ShoppingBasketComponent } from './shopping-basket/shopping-basket.component';

const basketPageRoutes: Routes = [{ path: '', component: BasketPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(basketPageRoutes), BasketModule, CmsModule, SharedModule],
  declarations: [BasketPageComponent, ShoppingBasketComponent, ShoppingBasketEmptyComponent],
})
export class BasketPageModule {}
