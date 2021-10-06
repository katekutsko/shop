import { InjectionToken } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';

export function genID(): Observable<number> {
  return timer(0, 1000).pipe(map(() => Math.floor(Math.random() * 100)));
}

export const idGenerator: InjectionToken<Observable<number>> =
  new InjectionToken<Observable<number>>('Infinite number sequence');
