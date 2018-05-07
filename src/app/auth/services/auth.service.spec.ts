import { async, TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { environment } from '../../../environments/environment';
import { defaultServiceImports } from '../../spec.imports';

describe('AuthService', () => {
  let service: AuthService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [...defaultServiceImports],
      providers: [AuthService]
    });
  }));

  beforeEach(() => {
    service = TestBed.get(AuthService);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });
});
