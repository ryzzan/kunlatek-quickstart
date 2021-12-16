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
    CompanyRoutingModule
  } from './company-routing.module';
  import {
    CompanyComponent
  } from './company.component';
  import {
    CompanyFormComponent
  } from 'src/app/components/company-form/company-form.component';
  import {
    NgxMaskModule,
    IConfig
  } from 'ngx-mask';

  const maskConfig: Partial < IConfig > = {
    validation: false,
  };

  @NgModule({
    declarations: [
      CompanyComponent, 
      CompanyFormComponent,
    ],
    imports: [
      CommonModule, 
      CompanyRoutingModule, 
      SharedModule,
      NgxMaskModule.forRoot(maskConfig),
    ]
  }) 
  
  export class CompanyModule {}
