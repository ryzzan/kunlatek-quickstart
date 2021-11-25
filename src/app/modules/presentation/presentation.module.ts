import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PresentationRoutingModule } from './presentation-routing.module';
import { PresentationComponent } from './presentation.component';
import { PresentationTemplateComponent } from '../../components/presentation-template/presentation-template.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PresentationComponent,
    PresentationTemplateComponent
  ],
  imports: [
    CommonModule,
    PresentationRoutingModule,
    SharedModule
  ]
})
export class PresentationModule { }
