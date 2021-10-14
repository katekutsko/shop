import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class IsCartNonEmptyGuard implements CanActivate {
  constructor(private cartService: CartService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.cartService.getTotalItemsAmount().pipe(
      map((amount: number) => {
        return amount > 0;
      })
    );
  }
}
