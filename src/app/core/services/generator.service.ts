import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { idGenerator } from './gen-id.generator';

@Injectable({
  providedIn: 'root',
})
export class GeneratorService {
  private generator: Observable<number>;

  constructor(@Inject(idGenerator) generator: Observable<number>) {
    this.generator = generator;
  }

  generate(length: number): string {
    return Math.round(
      Math.pow(36, length + 1) - Math.random() * Math.pow(36, length)
    )
      .toString(36)
      .slice(1);
  }

  getNewID(): Observable<number> {
    return this.generator;
  }
}

export const generatedString: InjectionToken<string> =
  new InjectionToken<string>('Random sequence generator');
