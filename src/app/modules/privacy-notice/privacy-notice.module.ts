import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivacyNoticeRoutingModule } from './privacy-notice-routing.module';
import { PrivacyNoticeComponent } from './privacy-notice.component';
import { PrivacyNoticeTemplateComponent } from '../../components/privacy-notice-template/privacy-notice-template.component';


@NgModule({
  declarations: [
    PrivacyNoticeComponent,
    PrivacyNoticeTemplateComponent
  ],
  imports: [
    CommonModule,
    PrivacyNoticeRoutingModule
  ]
})
export class PrivacyNoticeModule { }
