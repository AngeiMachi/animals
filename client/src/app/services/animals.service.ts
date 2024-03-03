import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Animal } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  host = 'http://localhost:3000';
 
  constructor(private http: HttpClient) {}
  getAnimals():Observable<Animal[]> {
    return this.http.get<Animal[]>(`${this.host}/animals/getAnimals`).pipe(map((res) => res));
  }
  createAnimal(animal: Animal) {
    return this.http.post(`${this.host}/animals/createAnimal`, animal);
  }
  deleteAnimal(id: number) {
    return this.http.delete(`${this.host}/animals/deleteAnimal${id}`);
  }
  updateAnimal(animal: Animal) {
    return this.http.post(`${this.host}/animals/updateAnimal`, animal);
  }
}
