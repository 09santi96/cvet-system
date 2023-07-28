import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UsersDataSource, UsersItem } from './users-datasource';
import {Subject} from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { ModalUsersComponent } from '../modal-users/modal-users.component';
import { UserService } from '../../services/user.service';



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
export class UsersComponent implements AfterViewInit, OnInit {
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<UsersItem>;
  /* data: UsersItem[] = [
    {dni: 39796812 ,names: 'pichica Martinez', email: '09santi96@gmail.com', password: 'samo7266', perfil: 1, dateCreationUser: '', dateUpdateUser: '', uid: '1'},
  ]; */
  
  dataSource!: UsersDataSource;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['uid', 'names', 'email', 'perfil', 'actions'];

  constructor(private dialog:MatDialog, private usersData: UserService) 
  {  }
  
  ngOnInit(): void {
    this.usersData.getUsers().subscribe(rs => {
      this.dataSource = new UsersDataSource(rs);
    });
  }

  ngAfterViewInit(): void {
    this.table.dataSource = this.dataSource;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onEdit(id:number) :void {

  }
  onDelete(id:number) :void {

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
