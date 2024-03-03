import { createAction, props } from "@ngrx/store";
import { Animal } from "../../models/models";

export const loadAnimals  = createAction('[Animals] Load Animal');
export const loadAnimalsSuccess = createAction('[Animals] Load Animal Success', props<{ result: Animal[] }>());
export const loadAnimalsFailure = createAction('[Animals] Load Animal Failure');
  
export const createAnimal = createAction('[Animals] Create Animal', props<{ animal: Animal }>());
export const createAnimalSuccess = createAction('[Animals] Create Animal Success', props<{ animal: Animal }>());
export const createAnimalFailure = createAction('[Animals] Create Animal Failure', props<{ error: any }>());

export const editAnimal = createAction('[Animals] Edit Animal', props<{ animal: Animal }>());
export const editAnimalSuccess = createAction('[Animals] Edit Animal Success', props<{ updatedAnimal: Animal }>());
export const editAnimalFailure = createAction('[Animals] Edit Animal Failure', props<{ error: any }>());

export const deleteAnimal = createAction('[Animals] Delete Animal', props<{ id: number }>());
export const deleteAnimalSuccess = createAction('[Animals] Delete Animal Success', props<{ id: number }>());
export const deleteAnimalFailure = createAction('[Animals] Delete Animal Failure', props<{ error: any }>());

export const  setUserName = createAction('[User] Set User Name', props<{ userName: string }>());
