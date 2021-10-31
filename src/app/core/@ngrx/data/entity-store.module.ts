import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  EntityMetadataMap,
  EntityDataModule,
  DefaultDataServiceConfig,
} from '@ngrx/data';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: 'http://localhost:3000/',
};

const pluralNames = {
  Cart: 'cart',
};

export const entityMetadata: EntityMetadataMap = {
  Cart: {},
};

export const selectEntityCacheState = createFeatureSelector('entityCache');

export const selectCartItemEntitites = createSelector(
  selectEntityCacheState,
  (entityState: any) => {
    return entityState.Cart.entities;
  }
);

@NgModule({
  imports: [
    CommonModule,
    EntityDataModule.forRoot({ entityMetadata, pluralNames }),
  ],
  providers: [
    { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig },
  ],
})
export class EntityStoreModule {}
