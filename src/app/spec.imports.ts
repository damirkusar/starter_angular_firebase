import { HttpClientTestingModule } from "@angular/common/http/testing";
import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireStorageModule } from "angularfire2/storage";
import { environment } from "../environments/environment";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AngularMaterialModule } from "./shared/angular-material.module";
import { RouterModule } from "@angular/router";

export const defaultServiceImports = [
  HttpClientTestingModule,
  AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
  AngularFirestoreModule, // imports firebase/firestore, only needed for database features
  AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
  AngularFireStorageModule, // imports firebase/storage only needed for storage features
  ];

export const sharedModules = [FormsModule, ReactiveFormsModule, AngularMaterialModule];

