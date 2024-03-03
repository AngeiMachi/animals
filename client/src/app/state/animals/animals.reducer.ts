import { createReducer, on } from '@ngrx/store';
import { AnimalState } from './animals.selector';
import { createAnimalSuccess, editAnimalSuccess, loadAnimalsSuccess ,deleteAnimalSuccess, setUserName} from './animals.actions';
import { Animal } from '../../models/models';

export const animalState: AnimalState = {
  animalList:[],
  userName: ''
};

export const animalsReducer = createReducer(
  animalState,
  on(loadAnimalsSuccess, (store:AnimalState,action) => {
    return {
      ...store,
      animalList: action.result
     }
  }),
  on(createAnimalSuccess, (state, { animal }) => ({
    ...state,
    animalList: [...state.animalList, animal]
  })),
  on(editAnimalSuccess, (state, { updatedAnimal: updatedAnimal }) => ({
    ...state,
    animalList: state.animalList.map(animal => 
      animal.id === updatedAnimal.id ? updatedAnimal : animal
    )
  })),
  on(deleteAnimalSuccess, (state, { id }) => ({
    ...state,
    animalList: state.animalList.filter(animal => animal.id !== id)
  })),

  on(setUserName, (state, { userName }) => ({
    ...state,
    userName: userName
  }))
  


  
);
