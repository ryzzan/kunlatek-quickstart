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
  PermissionGroupFormService
} from './permission-group-form.service';
import {
  MyErrorHandler
} from '../../utils/error-handler';
import { MatSnackBar } from '@angular/material/snack-bar';
export interface SelectObjectInterface {
  label ? : string;
  value ? : string;
}
@Component({
  selector: 'app-permission-group-form',
  templateUrl: './permission-group-form.component.html',
  styleUrls: ['./permission-group-form.component.scss']
}) 
export class PermissionGroupFormComponent implements OnInit {
    // usersSelectObject: Array <SelectObjectInterface> = [];
    moduleSelectObject: Array <SelectObjectInterface> = [];
    permissionsSelectObject: Array <SelectObjectInterface> = [];
    permissionGroupFormId: string = '';
    isAddModule: boolean = true;
    permissionGroupFormForm: FormGroup;
    isLoading = false;
    constructor(
        private _formBuilder: FormBuilder, 
        private _activatedRoute: ActivatedRoute, 
        private _permissionGroupFormService: PermissionGroupFormService, 
        private _errorHandler: MyErrorHandler,
        private _snackbar: MatSnackBar
    ) {
        this._activatedRoute.params.subscribe(routeParams => {
            this.permissionGroupFormId = routeParams['id'];
            this.isAddModule = !this.permissionGroupFormId;
        
            if (this.permissionGroupFormId) {
                this._permissionGroupFormService.find(this.permissionGroupFormId)
                .then(res => {
                    if (res) this.permissionGroupFormForm.patchValue(res);
                })
                .catch(err => {
                    const message = this._errorHandler.apiErrorMessage(err.error.error.message);
                    this.sendErrorMessage(message);
                })
            }
          })
        
        // this._permissionGroupFormService.usersSelectObjectGetAll().then((array: any) => {
        //     for (let index = 0; index < array.length; index++) {
        //         const object = array[index];
        //         this.usersSelectObject.push({label: object['name'], value: object['_id']});
        //     }
        // });
        
        this.permissionGroupFormForm = this._formBuilder.group({
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
            // users: [null, []],
            modulesPermissionGroups: this._formBuilder.array([]),
        });
    }
    ngOnInit(): void {
        // this._permissionGroupFormService.moduleSelectObjectGetAll().then((array: any) => {
        //     for (let index = 0; index < array.length; index++) {
        //         const object = array[index];
        //         this.moduleSelectObject.push({label: object['name'], value: object['_id']});
        //     }

        //     this.moduleSelectObject.forEach(element => {
        //         this.modulesPermissionGroups.push(this._formBuilder.group({
        //             module: [{value: element.value, disabled: true},[]],
        //             permissions: [null, []],
        //         }))
        //     });
        // });

        this._permissionGroupFormService.permissionsSelectObjectGetAll().then((array: any) => 
        {
            for (let index = 0; index < array.length; index++) {
                const object = array[index];
                this.permissionsSelectObject.push({label: object['name'], value: object['_id']});
            }
        });
    }
    
    get modulesPermissionGroups(): FormArray {
        return this.permissionGroupFormForm.get('modulesPermissionGroups') as FormArray
    };

    permissionGroupFormSubmit() {
        this._permissionGroupFormService
        .save(this.permissionGroupFormForm.value)
        .then((res) => {
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
