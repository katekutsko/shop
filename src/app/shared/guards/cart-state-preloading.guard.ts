import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { catchError, first, Observable, of, tap } from 'rxjs';
import { CartFacadeService } from '../../core';

@Injectable({
  providedIn: 'root',
})
export class CartStatePreloadingGuard implements CanActivate {
  constructor(private cartService: CartFacadeService) {}

  canActivate(): Observable<boolean> {
    return this.cartService.loaded$.pipe(
      tap((loaded: boolean) => {
        if (!loaded) {
          this.cartService.loadCart();
        }
      }),
      first(Boolean, false),
      catchError(() => of(false))
    );
  }
}
