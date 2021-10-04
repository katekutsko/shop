import { InjectionToken } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';

// это не будут целые числа.
// предполагал использовать function*
export const genID: Observable<number> = timer(0, 1000).pipe(
  map(() => Math.random())
);

export const idGenerator: InjectionToken<Observable<number>> =
  new InjectionToken<Observable<number>>('Infinite number sequence');
