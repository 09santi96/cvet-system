import {AfterViewInit, Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {LiveAnnouncer} from '@angular/cdk/a11y';

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
  selector: 'app-veterinarios',
  templateUrl: './veterinarios.component.html',
  styleUrls: ['./veterinarios.component.css'],
  providers: [{provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl}]
})

export class VeterinariosComponent implements AfterViewInit, OnInit{
  displayedColumns: string[] = ['uid', 'names', 'email', 'perfil', 'actions'];
  dataSource!: MatTableDataSource<any>; 
  isLoadingResults = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog:MatDialog, 
    private usersData: UserService, 
    private elementRef: ElementRef,
    private _liveAnnouncer: LiveAnnouncer
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
      elementToHide.style.display = 'none';
    }
    
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
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


