import {
  NgModule
} from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthenticationGuard } from './guards/authentication.guard';

const routes: Routes = [
  {
    path: 'signup',
    loadChildren: () => import('./modules/signup/signup.module').then(m => m.SignupModule)
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'privacy-notice',
    loadChildren: () => import('./modules/privacy-notice/privacy-notice.module').then(m => m.PrivacyNoticeModule)
  },
  {
    path: 'use-condition',
    loadChildren: () => import('./modules/use-condition/use-condition.module').then(m => m.UseConditionModule)
  },
  {
    path: 'person',
    loadChildren: () => import('./modules/person/person.module').then(m => m.PersonModule)
  },
  {
    path: 'company',
    loadChildren: () => import('./modules/company/company.module').then(m => m.CompanyModule)
  },
  {
    path: 'main',
    canActivate: [AuthenticationGuard],
    loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: ':id',
    // canActivate: [AuthenticationGuard],
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: 'login'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
