import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivateChild,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UserRole, AppState, UserRoleService, RouterActions } from '../../core';

@Injectable({
  providedIn: 'root',
})
export class IsAdminGuard implements CanActivate, CanActivateChild {
  constructor(
    private readonly userRoleService: UserRoleService,
    private store: Store<AppState>
  ) {}

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.navigateByRole();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.navigateByRole();
  }

  private navigateByRole(): Observable<boolean> {
    return this.userRoleService.getCurrentUserRole().pipe(
      map((role: UserRole) => role === UserRole.ADMIN),
      tap((isAdmin: boolean) => {
        if (!isAdmin) {
          this.store.dispatch(RouterActions.go({ path: ['/no-access'] }));
        }
      })
    );
  }
}
