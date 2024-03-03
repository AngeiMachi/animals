
  import {Component, Inject} from '@angular/core';
  import {
    MAT_DIALOG_DATA,
    MatDialogRef,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  } from '@angular/material/dialog';
  import {MatButtonModule} from '@angular/material/button';
  import {FormsModule} from '@angular/forms';
  import {MatInputModule} from '@angular/material/input';
  import {MatFormFieldModule} from '@angular/material/form-field';
  
  @Component({
    selector: 'app-dialog',
    templateUrl: 'dialog.component.html',
    styleUrl: './dialog.component.scss',
    standalone: true,
    imports: [
      MatFormFieldModule,
      MatInputModule,
      FormsModule,
      MatButtonModule,
      MatDialogTitle,
      MatDialogContent,
      MatDialogActions,
      MatDialogClose,
    ],
  })
  export class DialogComponent {

    name='';
    constructor(
      public dialogRef: MatDialogRef<any>,
    ) {}
  
    onOk(): void {
      if (this.name.length>=3) {
        this.dialogRef.close(this.name);
      }
    
    }
  }
  
  