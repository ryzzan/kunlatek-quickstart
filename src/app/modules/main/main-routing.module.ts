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
      loadChildren: () => import('../permission-group/permission-group.module').then(m => m.PermissionGroupModule)
    },
    {
      path: 'invitation',
      loadChildren: () => import('../invitation/invitation.module').then(m => m.InvitationModule)
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
