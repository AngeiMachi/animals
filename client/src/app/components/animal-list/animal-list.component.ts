import { Component, Input } from '@angular/core';
import { AnimalItemComponent } from '../animal-item/animal-item.component';
import { Animal } from '../../models/models';

@Component({
  selector: 'nml-animal-list',
  standalone: true,
  imports: [AnimalItemComponent],
  templateUrl: './animal-list.component.html',
  styleUrl: './animal-list.component.scss'
})
export class AnimalListComponent {
  @Input() animals: Animal[] | null = [];
}
