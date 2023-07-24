import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UsersDataSource, UsersItem } from './users-datasource';
import {Subject} from 'rxjs';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; // O importa 'NgbModalModule' para ngx-bootstrap
import {ModalUsersComponent} from '../modal-users/modal-users.component'

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
export class UsersComponent implements AfterViewInit {
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<UsersItem>;
  dataSource: UsersDataSource;


  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'actions'];

  constructor(private modalService: NgbModal) {
    this.dataSource = new UsersDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  onEdit(id:number) :void {

  }
  onCreate(id:number) :void {
    const modalRef = this.modalService.open(ModalUsersComponent); // Ajusta el componente modal que deseas abrir
   // Pasar datos al componente modal si es necesario
   modalRef.componentInstance.id = id;
      modalRef.result.then(
        (result) => {
          // Lógica que se ejecuta al cerrar el modal (si es necesario)
          console.log('Modal cerrado:', result);
        },
        (reason) => {
          // Lógica que se ejecuta si el modal se cierra de manera inesperada (si es necesario)
          console.log('Modal cerrado inesperadamente:', reason);
        }
      );
    }


}
