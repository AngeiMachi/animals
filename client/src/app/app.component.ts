
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DialogComponent, ToolbarComponent } from '@app/components';
import { Store } from '@ngrx/store';
import { loadAnimals, setUserName } from '@app/state/animals';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ToolbarComponent,
    DialogComponent,
    RouterOutlet],
  templateUrl:'./app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit{
 
  name ='';

  constructor(private store: Store,public dialog: MatDialog) {}
  
  ngOnInit(): void {
    this.openDialog();
    this.store.dispatch(loadAnimals());
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      this.store.dispatch(setUserName({userName:result}));
    });
  }

}
