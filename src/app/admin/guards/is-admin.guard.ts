import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivateChild,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UserRole } from 'src/app/core';
import { UserRoleService } from 'src/app/core/services/user-role.service';

@Injectable({
  providedIn: 'root',
})
export class IsAdminGuard implements CanActivate, CanActivateChild {
  constructor(
    private readonly userRoleService: UserRoleService,
    private router: Router
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
          this.router.navigate(['/no-access']);
        }
      })
    );
  }
}
