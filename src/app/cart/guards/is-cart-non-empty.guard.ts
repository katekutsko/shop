import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { CartObservableService } from '../services/cart-observable.service';

@Injectable({
  providedIn: 'root',
})
export class IsCartNonEmptyGuard implements CanActivate {
  constructor(private cartService: CartObservableService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.cartService
      .isEmptyCart()
      .pipe(map((isEmptyCart: boolean) => !isEmptyCart));
  }
}
