import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

import * as fromRouter from '@ngrx/router-store';
import * as fromUser from './user-state/index';
import * as fromPlant from './plant-state/index';

export interface State {
  router: fromRouter.RouterReducerState<any>,
  userState: fromUser.State,
  plantState: fromPlant.State
}

export const initialState: State = {
  router: undefined,
  userState: fromUser.initialState,
  plantState: fromPlant.initialState
}

export const reducers: ActionReducerMap<State> = {
  router: fromRouter.routerReducer,
  userState: fromUser.reducer,
  plantState: fromPlant.reducer
};

export const selectRouter = createFeatureSelector<
  State,
  fromRouter.RouterReducerState<any>
>('router');
 
const {
  selectQueryParams,    // select the current route query params
  selectQueryParam,     // factory function to select a query param
  selectRouteParams,    // select the current route params
  selectRouteParam,     // factory function to select a route param
  selectRouteData,      // select the current route data
  selectUrl,            // select the current url
} = fromRouter.getSelectors(selectRouter);

export const selectPlantType = createSelector(selectRouteParam('plantType'), (plantType) => plantType);

const selectUserState = createFeatureSelector(fromUser.userStateFeatureKey);

const selectPlantState = createFeatureSelector(fromPlant.plantStateFeatureKey);

export const selectUser = createSelector(selectUserState, (state: fromUser.State) => state.user);

export const selectPlantListings = createSelector(selectPlantState, (state: fromPlant.State) => state.plantListings);

export const selectSelectedPlant = createSelector(selectPlantState, (state: fromPlant.State) => state.selectedPlant);

export const selectPlantTableData = createSelector(
  selectPlantType, 
  selectUser,
  selectPlantListings,
  (plantType, user, plantListings) => { 
    if(plantType && user && plantListings) {
      return { plantType, user, plantListings };
    }
  }
);