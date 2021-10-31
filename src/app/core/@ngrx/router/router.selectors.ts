import { createFeatureSelector } from '@ngrx/store';
import { getSelectors, RouterReducerState } from '@ngrx/router-store';

import { RouterStateUrl } from './router.state';

export const selectRouterState =
  createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');
export const {
  selectQueryParams,
  selectRouteParams,
  selectRouteData,
  selectUrl,
} = getSelectors(selectRouterState);
