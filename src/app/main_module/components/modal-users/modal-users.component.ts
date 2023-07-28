import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
/* FORMS */
import { FormControl, FormGroup, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { UserService } from '../../services/user.service';
import { PopupsService } from 'src/app/shared/services/popups.service';

interface Perfiles {
  value: number;
  viewValue: string;
}


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormGroup | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-modal-users',
  templateUrl: './modal-users.component.html',
  styleUrls: ['./modal-users.component.css']
})
export class ModalUsersComponent  {
  inputData: any;
  hide = true;
  formUsers: FormGroup;
  matcher = new MyErrorStateMatcher();
  isSavingNewUser = false;

  perfiles: Perfiles[] = [
    {value: 0, viewValue: 'Administrador'},
    {value: 1, viewValue: 'Secretaria'},
    {value: 2, viewValue: 'Veterinario'},
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private ref:MatDialogRef<ModalUsersComponent>,
    private userService: UserService,
    private popupsService: PopupsService
    )
  {
    this.inputData = this.data;
    this.formUsers = new FormGroup({
      dni: new FormControl('', [Validators.required]),
      names: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      perfil: new FormControl('', [Validators.required])
    });
  }

  closeModal() :void{
    this.ref.close();
  }

  OnCreateUser() :void{
    //registra usuario
    this.isSavingNewUser = true;
    this.userService.register(this.formUsers.value.email, this.formUsers.value.password)
    .then((userCredential) => {
      //if register true
      const newUser: any = {
        dni: this.formUsers.value.dni,
        names: this.formUsers.value.names,
        email: this.formUsers.value.email,
        password: this.formUsers.value.password,
        perfil: this.formUsers.value.perfil,
        dateCreationUser: new Date(),
        dateUpdateUser: new Date(),
        uid: userCredential.user.uid
      }
      //guarda el usuario en la collecion users
      this.userService.addUsers(newUser)
      .then((response) => {
        if (response === 'Exito') {
          // Mostrar una alerta si la operación fue un éxito.
          this.popupsService.openSnackBar('¡Usuario agregado exitosamente!', 'x', 4000, 'right', 'top');
          
        }else{
          // Mostrar una alerta si ocurrió un error.
          this.popupsService.openSnackBar('error: ' + response, 'x', 3000, 'right', 'top');
          console.log(response);
        }
        this.isSavingNewUser = false;
        this.ref.close();
      })
      .catch((error) => {
        // Mostrar una alerta si ocurrió un error inesperado en la promesa.
        console.log(error);
        this.isSavingNewUser = false;
        this.ref.close();
      });

    })
  }



}
