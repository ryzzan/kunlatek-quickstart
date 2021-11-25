import {
  Component, Inject
} from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
export interface DialogData {
  isToLogout: boolean;
}
@Component({
  selector: 'app-logout-confirmation-dialog',
  templateUrl: './logout-confirmation-dialog.component.html',
  styleUrls: ['./logout-confirmation-dialog.component.scss']
}) 
export class LogoutConfirmationDialogComponent {
  isToLogout = true;
  constructor(
    public logoutConfirmationDialogDialogRef: MatDialogRef <LogoutConfirmationDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    
  };
  
  logoutConfirmationDialogOnNoClick(): void {
    this.logoutConfirmationDialogDialogRef.close();
  }
}
