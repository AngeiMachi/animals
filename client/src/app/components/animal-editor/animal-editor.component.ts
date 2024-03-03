import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Animal, AnimalType } from '@app/models/';
import { MatDrawer } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { MatSelectModule } from '@angular/material/select';
import { AnimalState,
         createAnimal, 
         deleteAnimal,
          editAnimal
        } from '@app/state/animals/';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectUserName } from '@app/state/animals';


@Component({
  selector: 'nml-animal-editor',
  standalone: true,
  imports: [FormsModule,
            ReactiveFormsModule,
            MatFormFieldModule,
            MatInputModule,
            MatButtonModule,
            MatIconModule,
            MatSelectModule
          ],
  templateUrl: './animal-editor.component.html',
  styleUrl: './animal-editor.component.scss'
})
export class AnimalEditorComponent implements OnInit,OnChanges{
  @Input() animal:Animal | null = null;
  @Input() sideNav:MatDrawer | null= null;

  animalTypes = Object.keys(AnimalType).filter(key => isNaN(Number(key)));
  @Output() close = new EventEmitter();
  isEditMode = false;
  animalForm: FormGroup = new FormGroup({});
  
  userName = toSignal(this.store.select(selectUserName), { initialValue: 'Admin' });
  constructor(private fb: FormBuilder,private store: Store<AnimalState>,private router:Router){}
  
  ngOnInit() {
    this.animalForm = this.fb.group({
      name: ['', Validators.required],
      desciprtion: ['', [Validators.required]],
      animalType: [AnimalType.Dog, Validators.required],
    });
   
  }
  ngOnChanges() {
    if(this.animal){
      this.animalForm.patchValue({
        name: this.animal.name,
        desciprtion: this.animal.desciprtion,
      });
      this.isEditMode = true;
      
    }
  }

  deleteAnimal(){
    if(this.animal){
      this.store.dispatch(deleteAnimal({id: this.animal.id}));

      
    }
    this.onClose();
  }

  onSubmit() {
    if (this.animalForm.valid) {
      
      if (this.isEditMode) {
        const animal:Animal = {
          id:this.animal?.id || -1,
          name: this.animalForm.get('name')?.value,
          desciprtion: this.animalForm.get('desciprtion')?.value,
          animalType: this.animalForm.get('animalType')?.value as AnimalType || AnimalType.Other,
          createDate: this.animal?.createDate || new Date(),
          lastUpdate: new Date(),
          createdBy: this.animal?.createdBy || this.userName(),
      }
        this.store.dispatch(editAnimal({animal: animal}));
      } else {
        const animal:Animal = {
          id:-1,
          name: this.animalForm.get('name')?.value,
          desciprtion: this.animalForm.get('desciprtion')?.value,
          animalType: this.animalForm.get('animalType')?.value,
          createDate: new Date(),
          lastUpdate: new Date(),
          createdBy: this.userName(),
      }
      
        this.store.dispatch(createAnimal({animal: animal}));
        
      }
      
      this.close.emit();
      this.onClose();
     
    }
    
    
  }
  onClose(){
    this.animalForm.reset();
    Object.keys(this.animalForm.controls).forEach(key => {
      const control = this.animalForm.get(key);
      control?.markAsPristine();
      control?.markAsUntouched();
      control?.clearValidators();
    });
    this.animal=null;
    this.isEditMode = false;
    
    this.close.emit();
    this.router.navigate(['/']);
    this.sideNav?.close();
  }

}
