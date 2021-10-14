import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CanComponentDeactivate } from 'src/app/core/models/can-component-deactivate';
import { ProductModel } from 'src/app/products/models/product.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit, CanComponentDeactivate {
  product: ProductModel;

  isChanged = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data
      .pipe(map((data) => data.product))
      .subscribe((product: ProductModel) => {
        this.product = { ...product };
      });
  }

  canDeactivate():
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return !this.isChanged;
  }

  onChange(): void {
    this.isChanged = true;
  }

  onSave(): void {
    this.isChanged = false;
  }
}
