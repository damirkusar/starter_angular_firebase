import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { User } from '../../../user/models';
import { AuthService } from '../../services';

import * as fromAuth from '../../store/reducers';
import * as fromAuthSelectors from '../../store/selectors';
import * as Auth from '../../store/actions';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../../auth.styles.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(private store: Store<fromAuth.State>, private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      passwordConfirmation: ['', [Validators.required]]
    });
  }

  ngOnInit() {}

  onRegister({
    value,
    valid
  }: {
    value: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    };
    valid: boolean;
  }) {
    console.log(value);
    this.store.dispatch(
      new Auth.Register({
        firstName: value.firstName,
        lastName: value.lastName,
        email: value.email,
        password: value.password
      })
    );
  }
}
