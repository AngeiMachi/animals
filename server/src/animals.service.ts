/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import {  Animal } from './models';
import * as fs from 'fs';

@Injectable()
export class AnimalService {
    private animals: Array<Animal>;
    constructor() {
      this.animals = JSON.parse(fs.readFileSync('./src/animals.json', 'utf8')); 
    }
    getAnimals(): Animal[] {
      return this.animals;
    }
    createAnimal(animal:Animal): Animal {
      const newAnimal = { id: this.animals.length + 1, 
                      name:animal.name,
                      desciprtion:animal.desciprtion,
                      animalType:animal.animalType,
                      createDate:new Date(),
                      lastUpdate:new Date(),
                      createdBy:animal.createdBy
                    };
      this.animals = [...this.animals, { ...newAnimal}];
      const dataToWrite = '['+this.animals.map(animal => JSON.stringify(animal)).join('\n,')+']';

      fs.writeFileSync('./src/animals.json', dataToWrite);
      return animal;
    }
    updateAnimal(animal:Animal): Animal {
      const updatedAnimal = { id: animal.id, 
                      name:animal.name,
                      desciprtion:animal.desciprtion,
                      animalType:animal.animalType,
                      createDate:animal.createDate,
                      lastUpdate:new Date(),
                      createdBy:animal.createdBy
                    };
      const index =this.animals.findIndex(animal => animal.id === updatedAnimal.id);
      this.animals[index]=updatedAnimal;
      const dataToWrite = '['+this.animals.map(animal => JSON.stringify(animal)).join('\n,')+']';
      fs.writeFileSync('./src/animals.json', dataToWrite);
      return animal;
    }

    deleteAnimal(id:number): boolean {
      try {
        this.animals = this.animals.filter(animal => animal.id != id);
        const dataToWrite = '['+this.animals.map(animal => JSON.stringify(animal)).join('\n,')+']';
        fs.writeFileSync('./src/animals.json', dataToWrite);
        return true;
      } catch (error) {
        return false;
      }
      
    }
    
 }
