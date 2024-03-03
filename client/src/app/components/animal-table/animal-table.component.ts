import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Animal } from '../../models/models';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'nml-animal-table',
  standalone: true,
  imports:  [DatePipe,MatTableModule, MatPaginatorModule],
  templateUrl: './animal-table.component.html',
  styleUrl: './animal-table.component.scss'
})
export class AnimalTableComponent implements AfterViewInit,OnChanges{ 
  @Input() animals:Animal[] | null=[];
  displayedColumns: string[] = ['animalType','name', 'createDate', 'lastUpdate', 'createdBy'];
  dataSource = new MatTableDataSource<Animal>(this.animals as Animal[]);
  @Output() rowClick= new EventEmitter<Animal>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource<Animal>(this.animals as Animal[]);
    this.dataSource.paginator = this.paginator;
  }
}

