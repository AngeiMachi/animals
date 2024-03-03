import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AnimalType } from '@app/models/models';

@Component({
  selector: 'nml-animal-item',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './animal-item.component.html',
  styleUrl: './animal-item.component.scss'
})
export class AnimalItemComponent {
  @Input() animalType:AnimalType=AnimalType.Other;
  @Input() name:string='';
}
