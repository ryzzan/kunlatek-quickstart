import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UseConditionComponent } from './use-condition.component';

const routes: Routes = [{ path: '', component: UseConditionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UseConditionRoutingModule { }
