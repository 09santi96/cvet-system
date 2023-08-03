import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth, createUserWithEmailAndPassword} from '@angular/fire/auth';

import { Firestore, doc, setDoc, collection, collectionData, query, orderBy} from '@angular/fire/firestore';

import { UserInterface } from 'src/app/main_module/components/users/model-user';
import { where } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  
  constructor(private auth: Auth,
        private firestore: Firestore,
  ) {   }
  
  userCollectionRef = collection(this.firestore, 'users');

  async addUsers(newUser: UserInterface): Promise<string> {
    const userDocRef = doc(this.firestore, 'users', newUser.uid);
      try{
        await setDoc(userDocRef, newUser);
        return 'Exito';

      }catch (error) {
        return 'Error '+ error;
      }
  }

  async register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

/*   async getCurrentUserData(){
    const user = this.auth.currentUser;
    if(user){
      const userDocRef = doc(this.firestore, 'users', user.uid);
      return await getDoc(userDocRef);

    }else{
      return null
    }

  } */

  /* async resetPassword(email: string): Promise<void>{
    try{
      return sendPasswordResetEmail(this.auth, email);
    }
    catch(error){
      //console.log(error);
    }
  } */


  getUsers(): Observable<UserInterface[]>{
    let queryUsers = query(this.userCollectionRef, orderBy('dateUpdateUser', 'desc'));
    return collectionData(queryUsers, undefined) as Observable<UserInterface[]>;
  }

  getUserById(id :string) :Observable<UserInterface[]> {
    // get a reference to the user-profile collection
    let queryCurrenteUser = query(this.userCollectionRef, where('uid', '==', id));
    // get documents (data) from the collection using collectionData
    return collectionData(queryCurrenteUser) as Observable<UserInterface[]>;
  }

  getVets(): Observable<UserInterface[]>{
    let queryVets = query(this.userCollectionRef, where('perfil', '==', 2));
    return collectionData(queryVets, undefined) as Observable<UserInterface[]>;
  }

}