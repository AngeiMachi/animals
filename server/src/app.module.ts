import { AnimalService } from './animals.service';
import { AnimalsController } from './animals.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [
    AnimalsController, AppController],
  providers: [
    AnimalService, AppService],
})
export class AppModule { }
