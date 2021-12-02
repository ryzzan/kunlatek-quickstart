import {
  NgModule
} from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import { AuthenticationGuard } from './guards/authentication.guard';

const routes: Routes = [{
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
    path: '',
    redirectTo: 'presentation',
    pathMatch: 'full'
  },
  {
    path: 'presentation',
    // canActivate: [AuthenticationGuard],
    loadChildren: () => import('./modules/presentation/presentation.module').then(m => m.PresentationModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule)
  },
  {
    path: '**',
    redirectTo: 'presentation'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
