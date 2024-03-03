import { CommonModule, Location } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import { Store } from '@ngrx/store';

import { map } from 'rxjs';

import { AnimalState, 
         selectAnimalList }
          from '@app/state/animals';

import { AnimalEditorComponent,
         ManagementToolComponent,
         AnimalListComponent,
         AnimalTableComponent 
        } from '@app/components/';
import { Animal } from '@app/models';

@Component({
  selector: 'nml-landing-page',
  standalone: true,
  imports: [MatSidenavModule,
            CommonModule,
            MatInputModule,
            AnimalEditorComponent,
            ManagementToolComponent,
            ManagementToolComponent,
            AnimalListComponent,
            AnimalTableComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
 
  constructor(private store: Store<AnimalState>,private location: Location) {
    
  }

  animals$ = this.store.select(selectAnimalList);
  slectedAnimal: Animal | null = null;
  @ViewChild('sideNav') sidenav!: MatSidenav;
  
  isTableView = true;
  searchTerm = '';
  
  handleSideNavOpen(action: string){
    if(action === 'new'){
      this.location.go('/new-animal');
    } else if (action === 'update'){
      this.location.go('/animal-update');
    }
    this.sidenav.open();
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: any) {
    if (this.sidenav.opened) {
      this.sidenav.close();
    }
  }

  onInputChange(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.filterAnimals();
  }

  private filterAnimals(): void {
    this.animals$ = this.store.select(selectAnimalList).pipe(
      map(animals => {
        if (!this.searchTerm) {
          return animals; // If search term is empty, return all animals
        } else {
          return animals.filter(animal => 
            animal.name?.toLowerCase().includes(this.searchTerm.toLowerCase())
          );
        }
      })
    );
  }
}
