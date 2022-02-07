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
  PermissionGroupTableService
} from './permission-group-table.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-permission-group-table',
  templateUrl: './permission-group-table.component.html',
  styleUrls: ['./permission-group-table.component.scss']
}) 
export class PermissionGroupTableComponent implements OnInit {
  permissionGroupTableForm: FormGroup;
  permissionGroupTableDisplayedColumns: string[] = ['name', 'users', 'permissions', 'undefined',];
  permissionGroupTableDataSource: any = [];
  isLoading = true;
  constructor(
    private _formBuilder: FormBuilder, 
    private _errorHandler: MyErrorHandler, 
    private _dialog: MatDialog, 
    private _permissionGroupTableService: PermissionGroupTableService,
    private _snackbar: MatSnackBar,
  ) {
    this.permissionGroupTableForm = this._formBuilder.group({
      searchInput: [null, []],
    });
    
    this._permissionGroupTableService.getAll()
    .then((result: any) => {
      this.permissionGroupTableDataSource = result;
      this.isLoading = false;
    }).catch(err => {
      this.isLoading = false;
      const message = this._errorHandler.apiErrorMessage(err.error.error.message);
      this.sendErrorMessage(message);
    })
  }
  ngOnInit(): void {}
  removeConfirmationDialogOpenDialog = () => {
    const removeConfirmationDialogDialogRef = this._dialog.open(RemoveConfirmationDialogComponent, {})
  };
  
  permissionGroupTableSubmit() { console.log(60);
    this._permissionGroupTableService.find(this.permissionGroupTableForm.value).then((res) => {
      console.log(res, 62);
      this.isLoading = false;
    }).catch((err) => {
      this.isLoading = false;
      const message = this._errorHandler.apiErrorMessage(err.error.error.message);
      this.sendErrorMessage(message);
    })
  }

  sendErrorMessage = (errorMessage: string) => {
    this._snackbar.open(errorMessage, undefined, {
        duration: 4 * 1000,
    });
  }
}
