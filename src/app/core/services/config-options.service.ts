import { Injectable } from '@angular/core';
import { ConfigModel } from '../models/config-model';

@Injectable({
  providedIn: 'root',
})
export class ConfigOptionsService {
  private configuration: ConfigModel;

  constructor() {}

  setConfig(newConfiguration: ConfigModel): void {
    this.configuration = newConfiguration;
  }

  getConfig(): ConfigModel {
    return this.configuration;
  }

  updateConfig(updates: Partial<ConfigModel>): void {
    this.configuration = { ...this.configuration, ...updates };
  }
}
