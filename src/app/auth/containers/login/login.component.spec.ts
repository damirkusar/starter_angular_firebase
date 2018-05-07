import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthService } from '../../services';
import { StoreModule, combineReducers } from '@ngrx/store';
import * as fromAuth from '../../store/reducers';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { sharedModules } from '../../../spec.imports';

class AuthServiceMock {}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        declarations: [LoginComponent],
        imports: [
          ...sharedModules,
          StoreModule.forRoot({
            auth: combineReducers(fromAuth.reducers)
          })
        ],
        providers: [{ provide: AuthService, useClass: AuthServiceMock }]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should be create', () => {
    expect(component).toBeTruthy();
  });
});
