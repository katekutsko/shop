import { InjectionToken } from '@angular/core';

export interface GlobalConstants {
  App: string;
  Ver: string;
  API_URL: string;
}

export const globalConstants: GlobalConstants = {
  App: 'TaskManager',
  Ver: '1.0',
  API_URL: 'http://localhost:4200',
};

export const ConstantService: InjectionToken<GlobalConstants> =
  new InjectionToken<GlobalConstants>('Constants service');
