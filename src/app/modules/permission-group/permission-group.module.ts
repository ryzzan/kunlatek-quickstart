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
    PermissionGroupRoutingModule
  } from './permission-group-routing.module';
  import {
    PermissionGroupComponent
  } from './permission-group.component';
  import {
    PermissionGroupFormComponent
  } from 'src/app/components/permission-group-form/permission-group-form.component';
  import {
    PermissionGroupTableComponent
  } from 'src/app/components/permission-group-table/permission-group-table.component';
  @NgModule({
    declarations: [
      PermissionGroupComponent, 
      PermissionGroupFormComponent, 
      PermissionGroupTableComponent, 
    ],
    imports: [
      CommonModule, 
      PermissionGroupRoutingModule, 
      SharedModule
    ]
  }) export class PermissionGroupModule {}
