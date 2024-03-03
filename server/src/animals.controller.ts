/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { AnimalService } from './animals.service';
import { Animal } from './models';

@Controller('animals')
export class AnimalsController {
    constructor(private readonly animalService: AnimalService) {}
    
    @Get('getAnimals')
    getAnimals(): Animal[] {
        try {
            return this.animalService.getAnimals();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @Post('createAnimal')
    createAnimal(@Body()  animal : Animal): Animal {
        try {
            return this.animalService.createAnimal(animal);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @Post('updateAnimal')
    updateAnimal(@Body()  animal : Animal): Animal {
        try {
            return this.animalService.updateAnimal(animal);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @Delete('deleteAnimal:id')
    deleteAnimal(@Param('id') id:number): boolean {
        try {
            return this.animalService.deleteAnimal(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
