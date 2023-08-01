import {AfterViewInit, Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import {Subject} from 'rxjs';

import {MatDialog} from '@angular/material/dialog';
import {MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';

import { UserService } from '../../services/user.service';
import { ModalUsersComponent } from '../modal-users/modal-users.component';


export class MyCustomPaginatorIntl implements MatPaginatorIntl {
  changes = new Subject<void>();

  firstPageLabel = `Primera pagina`;
  itemsPerPageLabel = `Usuarios por pagina:`;
  lastPageLabel = `Ultima pagina`;
  nextPageLabel = 'Siguiente pagina';
  previousPageLabel = 'Anterior pagina';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return `Pagina 1 de 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return `Pagina ${page + 1} de ${amountPages}`;
  }
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [{provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl}]
})
export class UsersComponent implements AfterViewInit, OnInit{
  displayedColumns: string[] = [ 'dateCreationUser', 'dni', 'names', 'email', 'perfil', 'actions'];
  dataSource!: MatTableDataSource<any>; 
  isLoadingResults = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog:MatDialog, 
    private usersData: UserService, 
    private elementRef: ElementRef
    ){  }
  
  ngOnInit(){
    this.isLoadingResults = true;
  }

  ngAfterViewInit() {
    this.usersData.getUsers().subscribe(rs => {
      this.dataSource = new MatTableDataSource(rs);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoadingResults = false;
    });

    const elementToHide = this.elementRef.nativeElement.querySelector('.mat-mdc-form-field-subscript-wrapper');
    // Verificar si el elemento existe antes de ocultarlo
    if (elementToHide) {
      //elementToHide.style.content = 'none';
      const nuevoSpan = document.createElement("strong");
      nuevoSpan.textContent = "Fecha de creacion";
      elementToHide.appendChild(nuevoSpan);
    }
    
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onCreate(id:number) :void {
    this.dialog.open(ModalUsersComponent, {
      width: '50%',
      height: 'auto',
      data:{
        title: 'Nuevo usuario'
      }
    })
  }
  
}
