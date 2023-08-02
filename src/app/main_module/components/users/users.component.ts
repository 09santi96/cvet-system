import {AfterViewInit, Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import {Subject, Subscription } from 'rxjs';

import {MatDialog} from '@angular/material/dialog';
import {MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

import { UserService } from '../../services/user.service';
import { ModalUsersComponent } from '../modal-users/modal-users.component';
import { UserInterface } from './model-user';


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
  objectOne! : UserInterface;
  objectTwo = {
    title: 'Nuevo usuario'
  }
  dataDialogToSend = {
    objectUserInterface: this.objectOne,
    objectTitle: this.objectTwo
  };  
  private usersSubscription!: Subscription;
  private usersModalSubscription!: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog:MatDialog, 
    private usersService: UserService, 
    private elementRef: ElementRef
    ){
    }
  
  ngOnInit(){
    this.isLoadingResults = true;
  }

  ngAfterViewInit() {
    this.usersSubscription = this.usersService.getUsers().subscribe(rs => {
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

  ngOnDestroy() {
    // Unsubscribe from the Observable to avoid memory leaks
    if (this.usersSubscription) {
      this.usersSubscription.unsubscribe();
      console.log('desubscrito de la lista');
    }
    this.unsubscribeFromModalUser();
  }

  unsubscribeFromModalUser(): void{
    if (this.usersModalSubscription) {
      this.usersSubscription.unsubscribe();
      console.log('desubscrito del modal');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onCreate(id:string) :void {
  if(id !== '0'){
    this.objectTwo['title'] = 'Editar usuario';

    // error se subscribe cada vez que doy click al boton editar
   this.usersModalSubscription = this.usersService.getUserById(id).subscribe({
      next: (rs) => {
        this.dataDialogToSend.objectUserInterface = rs[0];
        console.log(this.dataDialogToSend);
      },
    })

    setTimeout(() => {
      this.dialog.open(ModalUsersComponent, {
        width: '50%',
        height: 'auto',
        data: this.dataDialogToSend
      })
    }, 500);

  }else{
    console.log(this.dataDialogToSend);
    this.objectTwo['title'] = 'Nuevo usuario';

  //open dialog nuevo usuario
    this.dialog.open(ModalUsersComponent, {
      disableClose: true,
      width: '50%',
      height: 'auto',
      data: this.dataDialogToSend
    })


  }
}



}
