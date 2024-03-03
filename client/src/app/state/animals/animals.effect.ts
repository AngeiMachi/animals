
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { AnimalService } from '../../services/animals.service';
import { createAnimal, createAnimalFailure, createAnimalSuccess, deleteAnimal, deleteAnimalSuccess, editAnimal, editAnimalFailure, editAnimalSuccess, loadAnimals, loadAnimalsFailure, loadAnimalsSuccess } from './animals.actions';
import { of } from 'rxjs';
import { Animal } from '../../models/models';
import { Router } from '@angular/router';

@Injectable()
export class AnimalsEffect {

  loadAnimals$ = createEffect(() => this.actions$.pipe(
      ofType(loadAnimals),
      mergeMap(() => this.animalService.getAnimals()
        .pipe(
          map(animals => {
            return (loadAnimalsSuccess({result: animals}))
          }),
          catchError((error) => of(loadAnimalsFailure()))
        ))
    )
  );

  createAnimal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createAnimal),
      mergeMap(({ animal }) =>
        this.animalService.createAnimal(animal).pipe(
          map(newAnimal => createAnimalSuccess({ animal: newAnimal as Animal })),
          catchError(error => of(createAnimalFailure({ error })))
        )
      ),
      tap(
        () => {
          alert('Animal created successfully');
          this.router.navigate(['/']);  
        },
        (error) => {
          alert('Failed to create Animal'); 
        }
      )
    )
  );

  editAnimal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editAnimal),
      mergeMap(({ animal }) =>
        this.animalService.updateAnimal(animal).pipe(
          map(updatedAnimal => editAnimalSuccess({  updatedAnimal: updatedAnimal as Animal })),
          catchError(error => of(editAnimalFailure({ error })))
        )
      ),
      
      tap(
        () => {
          alert('Animal updated successfully');
          this.router.navigate(['/']);
        },
        (error) => {
          alert('Failed to update animal'); 
        }
      )
    )
  );

  deleteAnimal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteAnimal),
      mergeMap(({ id }) =>
        this.animalService.deleteAnimal(id).pipe(
          map(() => deleteAnimalSuccess({  id: id })),
          catchError(error => of(editAnimalFailure({ error })))
        )
      ),
      tap(
        () => {
          alert('Animal deleted successfully');
          this.router.navigate(['/']);
        },
        (error) => {
          alert('Failed to delete animal'); 
        }
      )
    )
  );
  
  constructor(
    private actions$: Actions,
    private animalService: AnimalService,
    private router: Router
  ) {}
}
