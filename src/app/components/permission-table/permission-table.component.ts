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
  ActivatedRoute
} from '@angular/router';
import {
  PermissionTableService
} from './permission-table.service';
import {
  MatSnackBar
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-permission-table',
  templateUrl: './permission-table.component.html',
  styleUrls: ['./permission-table.component.scss']
}) export class PermissionTableComponent implements OnInit {
  permissionTableForm: FormGroup;permissionTableDisplayedColumns: string[] = ['name', 'users', 'permissions', 'undefined', ];permissionTableDataSource: any = [];isLoading = true;constructor(private _formBuilder: FormBuilder, private _errorHandler: MyErrorHandler, private _dialog: MatDialog, private _permissionTableService: PermissionTableService, private _snackbar: MatSnackBar) {
    this.permissionTableForm = this._formBuilder.group({
      searchInput: [null, []],
    });
    this._permissionTableService.getAll().then((result) => {
      this.permissionTableDataSource = result;
      this.isLoading = false;
    }).catch(err => {
      this.isLoading = false;
      const message = this._errorHandler.apiErrorMessage(err.error.error.message);
      this._snackbar.open(message, undefined, {
        duration: 4 * 1000,
      });
    })
  }
  ngOnInit(): void {}
  removeConfirmationDialogOpenDialog = () => {
    const removeConfirmationDialogDialogRef = this._dialog.open(RemoveConfirmationDialogComponent, {})
  };permissionTableSubmit() {
    this._permissionTableService.find(this.permissionTableForm.value).then((res) => {
      this.isLoading = false;
    }).catch((err) => {
      this.isLoading = false;
      const message = this._errorHandler.apiErrorMessage(err.error.error.message);
      this._snackbar.open(message, undefined, {
        duration: 4 * 1000,
      });
    })
  }
}
