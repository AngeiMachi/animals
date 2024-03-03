import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Animal } from "../../models/models";

export interface AnimalState {
  animalList: Animal[]
  userName: string;
}

export const selectAnimalsState = createFeatureSelector<AnimalState>('animals');
export const selectAnimalList = createSelector(
  selectAnimalsState,
  (state: AnimalState) => state.animalList 
);

export const selectUserName = createSelector(
  selectAnimalsState,
  (state: AnimalState) => state?.userName
);