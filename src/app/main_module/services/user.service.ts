import { Injectable } from '@angular/core';
import { Auth, sendPasswordResetEmail, createUserWithEmailAndPassword} from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

import { UserInterface } from 'src/app/main_module/components/users/model-user';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private auth: Auth,
        private firestore: Firestore
  ) { }

  async addUsers(newUser: UserInterface): Promise<string> {
  const userRef = doc(this.firestore, 'users', newUser.uid);
    try{
      await setDoc(userRef, newUser);
      return 'Exito';

    }catch (error) {
      return 'Error '+ error;
    }
  }
    

  async register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  async resetPassword(email: string): Promise<void>{
    try{
      return sendPasswordResetEmail(this.auth, email);
    }
    catch(error){
      //console.log(error);
    }
  }



}