import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivacyNoticeComponent } from './privacy-notice.component';

const routes: Routes = [{ path: '', component: PrivacyNoticeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivacyNoticeRoutingModule { }
