import {
  NgModule
} from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import {
  MainComponent
} from './main.component';

const routes: Routes = [{
  path: '',
  component: MainComponent,
  children: [
    {
      path: 'permission',
      loadChildren: () => import('../permission/permission.module').then(m => m.PermissionModule)
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
