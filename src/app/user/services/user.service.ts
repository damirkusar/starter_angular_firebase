import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { User } from '../models';
import { DocumentSnapshot } from '@firebase/firestore-types';

@Injectable()
export class UserService {
  constructor(private afFirestore: AngularFirestore) {}

  public setUser(user: User): Observable<any> {
    const users = this.afFirestore.collection('users');
    return Observable.fromPromise(users.doc(user.uid).set(user));
  }

  public getUser(uid: string): Observable<DocumentSnapshot> {
    const userDocument = this.afFirestore.collection<User>('users').doc(uid);
    return Observable.fromPromise(userDocument.ref.get());
  }
}
