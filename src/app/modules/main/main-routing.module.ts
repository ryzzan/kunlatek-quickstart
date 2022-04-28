import {
  NgModule
} from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import { MenuGuard } from 'src/app/guards/menu.guard';
import { TextTransformation } from 'src/app/utils/text.transformation';
import {
  MainComponent
} from './main.component';

export const routes: Routes = [{
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
export class MainRoutingModule {
  constructor (
  ) {
    let permissions;
    const permissionString = sessionStorage.getItem('permission');
    if (permissionString !== null) permissions = JSON.parse(permissionString);
    permissions[0].permissions.forEach((permission: any) => {
      let moduleName = `m.${TextTransformation.setIdToClassName(permission.module.route)}Module`;
      if (routes[1]['children']) {
        routes[1]['children'].push({
          path: `${permission.module.route}`,
          loadChildren: () => import(`../${permission.module.route}/${permission.module.route}.module`).then(m => eval(moduleName)),
          canActivate: [MenuGuard]
        })
      }
    });
  }      
}
