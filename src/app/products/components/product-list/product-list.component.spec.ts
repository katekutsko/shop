import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { EMPTY, of } from 'rxjs';
import { Category } from 'src/app/shared/enums/category';
import { ProductModel } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { ProductComponent } from '../product/product.component';

import { ProductListComponent } from './product-list.component';

describe(ProductListComponent.name, () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  let productsServiceMock: Partial<ProductsService>;

  const products: ProductModel[] = [
    {
      id: '1',
      category: Category.ACCESSORIES,
      price: 100,
      name: 'Leather coat',
      description: 'Description 1',
      isAvailable: true,
      isInCart: false,
    },
    {
      id: '2',
      category: Category.CLOTHES,
      price: 100,
      name: 'Product 2',
      description: 'Fur coat with a hood',
      isAvailable: true,
      isInCart: false,
    },
    {
      id: '3',
      category: Category.SHOES,
      price: 100,
      name: 'Product 3',
      description: 'Description 3',
      isAvailable: true,
      isInCart: false,
    },
  ];
  beforeEach(() => {
    productsServiceMock = {};

    productsServiceMock.loadProducts = jasmine.createSpy();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductListComponent, ProductComponent],
      providers: [{ provide: ProductsService, useValue: productsServiceMock }],
      schemas: [NO_ERRORS_SCHEMA],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe(ProductListComponent.prototype.ngOnInit.name, () => {
    beforeEach(() => {
      productsServiceMock.getProducts = jasmine
        .createSpy()
        .and.returnValue(EMPTY);
    });

    beforeEach(() => {
      component.ngOnInit();
    });

    it('should call productsService#loadProducts', () => {
      expect(productsServiceMock.loadProducts).toHaveBeenCalled();
    });
  });

  describe('products list', () => {
    let productDes: DebugElement[];
    let productComps: ProductComponent[];

    beforeEach(() => {
      productsServiceMock.getProducts = jasmine
        .createSpy()
        .and.returnValue(of(products));
      productsServiceMock.addItemToCart = jasmine.createSpy();
    });

    beforeEach(fakeAsync(() => {
      fixture.detectChanges();
      let searchInput: HTMLInputElement = fixture.debugElement.query(
        By.css('input')
      ).nativeElement;
      searchInput.value = 'coat';
      searchInput.dispatchEvent(new Event('keyup'));
      tick(500);
      fixture.detectChanges();

      productDes = fixture.debugElement.queryAll(
        By.directive(ProductComponent)
      );
      productComps = productDes.map((debugElement: DebugElement) =>
        debugElement.injector.get(ProductComponent)
      );
    }));

    it('should render 2 product cards corresponding to the search criteria', () => {
      expect(productDes).toHaveSize(2);
    });

    it('should call productsService#addItemToCart when product emits addToCart event', () => {
      productComps[0].addToCart.next(products[0]);

      expect(productsServiceMock.addItemToCart).toHaveBeenCalledWith(
        products[0]
      );
    });
  });
});
