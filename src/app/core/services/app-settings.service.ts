import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, Observable, of, retry, tap } from 'rxjs';
import { AppSettingsModel } from '../models';
import { LocalStorage, LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AppSettingsService {
  private appSettingsKey: string = 'app-settings';
  private appSettingsUrl: string = 'http://localhost:4000/settings';
  private defaultAppSettings: AppSettingsModel = {
    isAsc: false,
  };

  constructor(
    @Inject(LocalStorage) private readonly localStorage: LocalStorageService,
    private readonly http: HttpClient
  ) {}

  getSettings(): Observable<AppSettingsModel> {
    let storedSettings: string = this.localStorage.getItem(this.appSettingsKey);

    if (storedSettings) {
      return of(JSON.parse(storedSettings)) as Observable<AppSettingsModel>;
    }

    return this.http.get<AppSettingsModel>(this.appSettingsUrl).pipe(
      retry(2),
      catchError(() => {
        console.error(
          `Could not fetch from ${this.appSettingsUrl}. Setting default values.`
        );
        return of(this.defaultAppSettings);
      }),
      tap((fetchedSettings: AppSettingsModel) => {
        this.setSettings(fetchedSettings);
      })
    );
  }

  setSettings(settings: AppSettingsModel): void {
    this.localStorage.setItem(this.appSettingsKey, JSON.stringify(settings));
  }
}
