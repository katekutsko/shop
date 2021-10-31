import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CartFacadeService } from '../../core';

@Injectable({
  providedIn: 'root',
})
export class IsCartNonEmptyGuard implements CanActivate {
  constructor(private cartFacade: CartFacadeService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.cartFacade.isCartNonEmpty();
  }
}
