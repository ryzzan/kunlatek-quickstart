import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PresentationTemplateComponent } from 'src/app/components/presentation-template/presentation-template.component';
import { PresentationComponent } from './presentation.component';

const routes: Routes = [
  { 
    path: '', 
    component: PresentationComponent,
    children: [
      {
        path: '',
        component: PresentationTemplateComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PresentationRoutingModule { }
