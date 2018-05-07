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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../auth.styles.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private store: Store<fromAuth.State>, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {}

  onLogin({
    value,
    valid
  }: {
    value: { email: string; password: string };
    valid: boolean;
  }) {
    this.store.dispatch(
      new Auth.Login({ email: value.email, password: value.password })
    );
  }
}
