import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import {
  MyErrorHandler
} from '../../utils/error-handler';
import {
  RemoveConfirmationDialogComponent
} from '../remove-confirmation-dialog/remove-confirmation-dialog.component';
import {
  MatDialog
} from '@angular/material/dialog';

import {
  InvitationTableService
} from './invitation-table.service';

@Component({
  selector: 'app-invitation-table',
  templateUrl: './invitation-table.component.html',
  styleUrls: ['./invitation-table.component.scss']
}) 
export class InvitationTableComponent implements OnInit {
    invitationTableForm: FormGroup;
    invitationTableDisplayedColumns: string[] = ['type', 'email', 'name', 'permissionGroups', 'undefined', ];
    invitationTableDataSource: any = [];
    isLoading = true;
    
    constructor(
        private _formBuilder: FormBuilder, 
        private _errorHandler: MyErrorHandler, 
        private _dialog: MatDialog, 
        private _invitationTableService: InvitationTableService, 
    ) {
        this.invitationTableForm = this._formBuilder.group({
        email: [null, []],
        name: [null, []],
    });

    this._invitationTableService.getAll().then((result) => {
      this.invitationTableDataSource = result;
      this.isLoading = false;
    }).catch(err => {
      this.isLoading = false;
      this._errorHandler.apiErrorMessage(err.error.error.message);
    })
  }

  ngOnInit(): void {}

  removeConfirmationDialogOpenDialog = () => {
    const removeConfirmationDialogDialogRef = this._dialog.open(RemoveConfirmationDialogComponent, {})
  };invitationTableSubmit() {
    this._invitationTableService.find(this.invitationTableForm.value).then((res) => {
      this.isLoading = false;
    }).catch((err) => {
      this.isLoading = false;
      this._errorHandler.apiErrorMessage(err.error.error.message);
    })
  }
}
