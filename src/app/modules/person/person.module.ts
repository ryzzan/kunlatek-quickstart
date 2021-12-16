  import {
    NgModule
  } from '@angular/core';
  import {
    CommonModule
  } from '@angular/common';
  import {
    SharedModule
  } from '../shared/shared.module';
  import {
    PersonRoutingModule
  } from './person-routing.module';
  import {
    PersonComponent
  } from './person.component';
  import {
    PersonFormComponent
  } from 'src/app/components/person-form/person-form.component';
  import { NgxMaskModule, IConfig } from 'ngx-mask';;
  const maskConfig: Partial<IConfig> = {
    validation: false,
  };
  
  @NgModule({
    declarations: [PersonComponent, PersonFormComponent, ],
    imports: [
      CommonModule, 
      PersonRoutingModule, 
      SharedModule,
      NgxMaskModule.forRoot(maskConfig),
    ]
  }) export class PersonModule {}
