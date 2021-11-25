import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UseConditionRoutingModule } from './use-condition-routing.module';
import { UseConditionComponent } from './use-condition.component';
import { UseConditionTemplateComponent } from '../../components/use-condition-template/use-condition-template.component';


@NgModule({
  declarations: [
    UseConditionComponent,
    UseConditionTemplateComponent
  ],
  imports: [
    CommonModule,
    UseConditionRoutingModule
  ]
})
export class UseConditionModule { }
