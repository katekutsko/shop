import { InjectionToken } from '@angular/core';

export class LocalStorageService {
  getItem(key: string): string {
    return window.localStorage.getItem(key);
  }

  setItem(key: string, value: string): void {
    window.localStorage.setItem(key, value);
  }
}

export const LocalStorage: InjectionToken<Storage> =
  new InjectionToken<Storage>('Local storage API provider');
