import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'nml-management-tool',
  standalone: true,
  imports: [MatIconModule,MatButtonModule,MatIconModule,MatFormFieldModule],
  templateUrl: './management-tool.component.html',
  styleUrl: './management-tool.component.scss'
})
export class ManagementToolComponent {
    @Input() isTableView = true;
    @Output() toggleTableView = new EventEmitter<boolean>();
    @Output() createNewAnimal = new EventEmitter();

    
}
