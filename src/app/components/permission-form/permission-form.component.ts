import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormArray
} from '@angular/forms';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';
import {
  ActivatedRoute
} from '@angular/router';
import {
  MatSnackBar
} from '@angular/material/snack-bar';
import {
  PermissionFormService
} from './permission-form.service';
import {
  MyErrorHandler
} from '../../utils/error-handler';
export interface SelectObjectInterface {
  label ? : string;
  value ? : string;
}
@Component({
  selector: 'app-permission-form',
  templateUrl: './permission-form.component.html',
  styleUrls: ['./permission-form.component.scss']
}) 
export class PermissionFormComponent implements OnInit {
    usersSelectObject: Array <SelectObjectInterface> = [];
    moduleSelectObject: Array <SelectObjectInterface> = [];
    permissionsSelectObject: Array <SelectObjectInterface> = [];
    permissionFormId: string;
    isAddModule: boolean;
    permissionFormForm: FormGroup;
    isLoading = false;
    constructor(
        private _formBuilder: FormBuilder, 
        private _activatedRoute: ActivatedRoute, 
        private _permissionFormService: PermissionFormService, 
        private _snackbar: MatSnackBar, 
        private _errorHandler: MyErrorHandler
    ) {
        this.permissionFormId = this._activatedRoute.snapshot.params['id'];
        
        this.isAddModule = !this.permissionFormId;
        
        this._permissionFormService.usersSelectObjectGetAll().then((array: any) => {
            for (let index = 0; index < array.length; index++) {
                const object = array[index];
                this.usersSelectObject.push({label: object['name'], value: object['id']});
            }
        });
        
        this.permissionFormForm = this._formBuilder.group({
            name: [{
                value: null,
                disabled: false
                },
                []
            ],
            description: [{
                value: null,
                disabled: false
                },
                []
            ],
            users: [null, []],
            modulesPermissions: this._formBuilder.array([]),
        });
    }
    ngOnInit(): void {
        this._permissionFormService.moduleSelectObjectGetAll().then((array: any) => {
            for (let index = 0; index < array.length; index++) {
                const object = array[index];
                this.moduleSelectObject.push({label: object['name'], value: object['id']});
            }

            this.moduleSelectObject.forEach(element => {
                this.modulesPermissions.push(this._formBuilder.group({
                    module: [{value: element.value, disabled: true},[]],
                    permissions: [null, []],
                }))
            });
        });

        this._permissionFormService.permissionsSelectObjectGetAll().then((array: any) => 
        {
            for (let index = 0; index < array.length; index++) {
                const object = array[index];
                this.permissionsSelectObject.push({label: object['name'], value: object['id']});
            }
        });
    }
    
    get modulesPermissions(): FormArray {
        return this.permissionFormForm.get('modulesPermissions') as FormArray
    };

    permissionFormSubmit() {
        this._permissionFormService
        .save(this.permissionFormForm.value)
        .then((res) => {
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
