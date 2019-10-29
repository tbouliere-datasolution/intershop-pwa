import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng-mocks';

import { VariationProductMasterView } from 'ish-core/models/product-view/product-view.model';
import { FilterNavigationContainerComponent } from 'ish-shared/filter/containers/filter-navigation/filter-navigation.container';
import { ProductListingContainerComponent } from 'ish-shared/product/containers/product-listing/product-listing.container';

import { ProductMasterVariationsComponent } from './product-master-variations.component';

describe('Product Master Variations Component', () => {
  let component: ProductMasterVariationsComponent;
  let fixture: ComponentFixture<ProductMasterVariationsComponent>;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        MockComponent(FilterNavigationContainerComponent),
        MockComponent(ProductListingContainerComponent),
        ProductMasterVariationsComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductMasterVariationsComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;

    component.product = { sku: '123456789' } as VariationProductMasterView;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    expect(element).toBeTruthy();
    expect(() => fixture.detectChanges()).not.toThrow();
    expect(element).toMatchInlineSnapshot(`
      <a id="variation-list-top"></a
      ><ish-filter-navigation
        orientation="horizontal"
        ng-reflect-orientation="horizontal"
      ></ish-filter-navigation
      ><ish-product-listing-container
        fragmentonrouting="variation-list-top"
        mode="paging"
        ng-reflect-mode="paging"
        ng-reflect-fragment-on-routing="variation-list-top"
      ></ish-product-listing-container>
    `);
  });

  it('should set the correct id for the underlying product list', () => {
    fixture.detectChanges();
    const productList = fixture.debugElement.query(By.css('ish-product-listing-container'))
      .componentInstance as ProductListingContainerComponent;

    expect(productList.id).toMatchInlineSnapshot(`
      Object {
        "type": "master",
        "value": "123456789",
      }
    `);
  });
});