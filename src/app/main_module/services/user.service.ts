import { Injectable } from '@angular/core';
import { Auth, sendPasswordResetEmail, createUserWithEmailAndPassword} from '@angular/fire/auth';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { UserInterface } from 'src/app/main_module/components/users/model-user';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private auth: Auth,
        private firestore: Firestore
    ) { }

  addUsers(newUser: UserInterface){
    const userRef = collection(this.firestore, 'users');
    return addDoc(userRef, newUser);
  }


  
  async resetPassword(email: string): Promise<void>{
    try{
      return sendPasswordResetEmail(this.auth, email);
    }
    catch(error){
      //console.log(error);
    }
  }

  async register({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }


}