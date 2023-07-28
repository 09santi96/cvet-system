import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';

import {MatDialog} from '@angular/material/dialog';
import {MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

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

export class VeterinariosComponent implements AfterViewInit{
  displayedColumns: string[] = ['uid', 'names', 'email', 'perfil', 'actions'];
  dataSource!: MatTableDataSource<any>; 

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog:MatDialog, private usersData: UserService){
   
  }

  ngAfterViewInit() {
    this.usersData.getUsers().subscribe(rs => {
      this.dataSource = new MatTableDataSource(rs);
      this.dataSource.paginator = this.paginator;
    });
    
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


