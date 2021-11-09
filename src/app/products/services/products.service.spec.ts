import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CartItemModel } from 'src/app/cart/models';
import { CartFacadeService, ProductsFacadeService } from '../../core';
import { ProductModel } from '../models/product.model';
import { ProductsService } from './products.service';
import * as util from '../mappers/map-product-to-cart-item';

describe(ProductsService.name, () => {
  let service: ProductsService;
  let productsFacade: Partial<ProductsFacadeService>;
  let cartFacade: Partial<CartFacadeService>;

  const products: ProductModel[] = [
    {
      id: '1',
      name: 'product 1',
      description: 'desc 1',
      price: 100,
      category: null,
      isAvailable: true,
    },
    {
      id: '2',
      name: 'product 2',
      description: 'desc 2',
      price: 200,
      category: null,
      isAvailable: true,
    },
  ];
  const cartItems: CartItemModel[] = [
    {
      id: '1',
      name: 'product 1',
      price: 100,
      quantity: 1,
    },
  ];

  beforeEach(() => {
    productsFacade = {};
    cartFacade = {};
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: CartFacadeService, useValue: cartFacade },
        { provide: ProductsFacadeService, useValue: productsFacade },
      ],
    });
  });

  beforeEach(() => {
    service = TestBed.inject<ProductsService>(ProductsService);
  });

  describe(ProductsService.prototype.loadProducts.name, () => {
    beforeEach(() => {
      productsFacade.loadProducts = jasmine.createSpy();

      service.loadProducts();
    });
    it('should call ProductsFacadeService#loadProducts', () => {
      expect(productsFacade.loadProducts).toHaveBeenCalled();
    });
  });
  describe(ProductsService.prototype.getProducts.name, () => {
    beforeEach(() => {
      productsFacade.products$ = of(products);
      cartFacade.items$ = of(cartItems);
    });
    it('should return observable of products with purchase status available', (done: DoneFn) => {
      service.getProducts().subscribe((updatedProducts: ProductModel[]) => {
        expect(updatedProducts).toEqual([
          { ...products[0], isInCart: true },
          { ...products[1], isInCart: false },
        ]);
        done();
      });
    });
  });
  describe(ProductsService.prototype.getProductById.name, () => {
    beforeEach(() => {
      productsFacade.products$ = of(products);
      cartFacade.items$ = of([]);
    });
    describe('when item with specified id is available', () => {
      it('should return corresponding item with purchase status available', (done: DoneFn) => {
        service.getProductById('1').subscribe((product: ProductModel) => {
          expect(product).toEqual({ ...products[0], isInCart: false });
          done();
        });
      });
    });
    describe('when item with specified id is not available', () => {
      it('should return empty model', (done: DoneFn) => {
        service.getProductById('3').subscribe((product: ProductModel) => {
          expect(product).toEqual({
            category: null,
            description: null,
            id: null,
            name: null,
            isAvailable: null,
            price: null,
          });
          done();
        });
      });
    });
  });
  describe(ProductsService.prototype.addItemToCart.name, () => {
    beforeEach(() => {
      cartFacade.createCartItem = jasmine.createSpy();
      const utilspy = jasmine
        .createSpyObj(util, ['mapProductToCartItem']);
        utilspy.mapProductToCartItem.and.returnValue(cartItems[0]);

      service.addItemToCart(products[0]);
    });
    it('should call CartFacadeService#createCartItem', () => {
      expect(cartFacade.createCartItem).toHaveBeenCalledWith(cartItems[0]);
    });
  });
});
