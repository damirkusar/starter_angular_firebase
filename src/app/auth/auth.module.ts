import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { routes } from './auth-routing';
import { containers } from './containers';
import { components } from './components';
import { services } from './services';

import { reducers, effects } from './store';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [...containers, ...components],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('authReducer', reducers),
    EffectsModule.forFeature(effects),
    SharedModule
  ],
  providers: [...services],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthModule {}
