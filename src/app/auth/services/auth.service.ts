import { Injectable } from '@angular/core';
import { User as fbUser, UserCredential } from '@firebase/auth-types';
import { DocumentSnapshot } from '@firebase/firestore-types';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Authenticate, RegisterUser } from '../models';
import { User } from '../../user/models';

@Injectable()
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  public login(authenticate: Authenticate): Observable<fbUser> {
    return Observable.fromPromise(
      this.afAuth.auth.signInWithEmailAndPassword(
        authenticate.email,
        authenticate.password
      )
    );
  }

  public register(registerUser: RegisterUser): Observable<UserCredential> {
    return Observable.fromPromise(
      this.afAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(
        registerUser.email,
        registerUser.password
      )
    );
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}

// import { Injectable } from '@angular/core';
// import { AbstractControl } from '@angular/forms';
// import { LoggerService } from './logger.service';
// import { HttpClient } from '@angular/common/http';

// const loggerInstanceName = 'ValidationService';

// @Injectable()
// export class ValidationService {
//   static passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[$@$!%*?&+-])[A-Za-z\d$@$!%*?&+-äöü]{8,}/g;
//   static emailPattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
//   static phonePattern = /^\+([1-9]{2,2}[0-9 ]{9,13})$/i;

//   constructor(
//     private logger: LoggerService,
//     private http: HttpClient) { }

//   // tslint:disable-next-line:member-ordering
//   static validatePasswordMatch(control: AbstractControl) {
//     const newPassword = control.get('newPassword').value; // to get value in input tag
//     const confirmPassword = control.get('confirmPassword').value; // to get value in input tag
//     if (newPassword !== confirmPassword) {
//       control.get('confirmPassword').setErrors({ matchPassword: true });
//       return 'Passwords do not match.';
//     } else {
//       return null;
//     }
//   }
// }
