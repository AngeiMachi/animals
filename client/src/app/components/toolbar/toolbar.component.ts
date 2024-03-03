import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { AnimalState, selectUserName } from '@app/state/animals';
import { Store } from '@ngrx/store';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'nml-toolbar',
  standalone: true,
  imports: [CommonModule,RouterModule,MatToolbarModule,MatIconModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {

  userName = this.store.select(selectUserName);
  constructor(private store: Store<AnimalState>) {
  }
}
