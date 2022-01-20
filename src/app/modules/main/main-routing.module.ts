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
    redirectTo: 'dashboard'
  }, {
  path: '',
  component: MainComponent,
  children: [
    {
      path: 'dashboard',
      loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    {
      path: 'permission',
      loadChildren: () => import('../permission-group/permission-group.module').then(m => m.PermissionGroupModule)
    },
    {
      path: 'invitation',
      loadChildren: () => import('../invitation/invitation.module').then(m => m.InvitationModule)
    }
  ]
},
{
  path: '**',
  redirectTo: 'dashboard'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
