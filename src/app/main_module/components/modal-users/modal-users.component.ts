import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
/* FORMS */
import { FormControl, FormGroup, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

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

  foods: Perfiles[] = [
    {value: 0, viewValue: 'Administrador'},
    {value: 1, viewValue: 'Secretaria'},
    {value: 2, viewValue: 'Veterinario'},
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private ref:MatDialogRef<ModalUsersComponent>)
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
}
