import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Category } from 'src/app/shared/enums/category';
import { ProductModel } from '../../models/product.model';

import { ProductComponent } from './product.component';

describe(ProductComponent.name, () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  const product: ProductModel = {
    id: '1',
    category: Category.ACCESSORIES,
    price: 100,
    name: 'Product',
    description: 'Description',
    isAvailable: true,
    isInCart: false,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('product info', () => {
    describe('when product is not in cart', () => {
      let buyButton: DebugElement;

      describe('and available', () => {
        beforeEach(() => {
          component.product = product;
          fixture.detectChanges();

          buyButton = fixture.debugElement.query(By.css('.product__buy'));
        });

        it('should display basic product info', () => {
          expect(
            fixture.debugElement.query(By.css('.product__title a'))
              .nativeElement.textContent
          ).toMatch(product.name);
          expect(
            fixture.debugElement.query(By.css('.product__category'))
              .nativeElement.textContent
          ).toMatch(product.category);
          expect(
            fixture.debugElement.query(By.css('.product__description'))
              .nativeElement.textContent
          ).toMatch(product.description);
          expect(
            fixture.debugElement.query(By.css('.product__price')).nativeElement
              .textContent
          ).toMatch(product.price.toFixed());
        });

        it('should display Buy button', () => {
          expect(buyButton).toBeDefined();
        });

        it('should emit addToCart event on click', (done: DoneFn) => {
          component.addToCart.subscribe((item: ProductModel) => {
            expect(item).toBe(product);
            done();
          });
          buyButton.triggerEventHandler('click', null);
        });
      });

      describe('and unavaialble', () => {
        beforeEach(() => {
          component.product = { ...product, isAvailable: false };
          fixture.detectChanges();

          buyButton = fixture.debugElement.query(By.css('.product__buy'));
        });
        it('should disable Buy button', () => {
          expect(buyButton.nativeElement.disabled).toBeTrue();
        });
      });
    });

    describe('when product is in cart', () => {
      beforeEach(() => {
        component.product = { ...product, isInCart: true };
        fixture.detectChanges();
      });
      it('should display purchase status', () => {
        expect(
          fixture.debugElement.query(By.css('.product__in-cart')).nativeElement
            .textContent
        ).toMatch('Added to Cart!');
      });
    });
  });
});
