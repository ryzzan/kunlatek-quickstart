import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';
import {
  ActivatedRoute
} from '@angular/router';
import {
  InvitationFormService
} from './invitation-form.service';
import {
  MyErrorHandler
} from '../../utils/error-handler';
import { MatSnackBar } from '@angular/material/snack-bar';
export interface SelectObjectInterface {
  label?: string;
  value?: string;
}
@Component({
  selector: 'app-invitation-form',
  templateUrl: './invitation-form.component.html',
  styleUrls: ['./invitation-form.component.scss']
}) export class InvitationFormComponent implements OnInit {
  typeSelectObject = [{
    "label": "Pessoa",
    "value": "person"
  }, {
    "label": "Empresa",
    "value": "company"
  }];
  permissionGroupsSelectObject: Array<SelectObjectInterface> = [];
  invitationFormId: string = '';
  isAddModule: boolean = true;
  invitationFormForm: FormGroup;
  isLoading = false;
  constructor(
    private _formBuilder: FormBuilder, 
    private _activatedRoute: ActivatedRoute, 
    private _invitationFormService: InvitationFormService, 
    private _errorHandler: MyErrorHandler,
    private _snackbar: MatSnackBar,
  ) {
    this._activatedRoute.params.subscribe(routeParams => {
      this.invitationFormId = routeParams['id'];
      this.isAddModule = !this.invitationFormId;
  
      if (this.invitationFormId) {
          this._invitationFormService.find(this.invitationFormId)
          .then(res => {
              if (res) this.invitationFormForm.patchValue(res);
          })
          .catch(err => {
              const message = this._errorHandler.apiErrorMessage(err.error.error.message);
              this.sendErrorMessage(message);
          })
      }
    })
    
    this._invitationFormService.permissionGroupsSelectObjectGetAll().then((array: any) => {
      for (let index = 0; index < array.length; index++) {
        const object = array[index];
        this.permissionGroupsSelectObject.push({
          label: object['name'],
          value: object['id']
        });
      }
    });
    this.invitationFormForm = this._formBuilder.group({
      type: [null, []],
      email: [{
          value: null,
          disabled: false
        },
        []
      ],
      name: [{
          value: null,
          disabled: false
        },
        []
      ],
      permissionGroups: [null, []],
    });
  }
  ngOnInit(): void {}
  invitationFormSubmit() {
    this._invitationFormService.save(this.invitationFormForm.value).then((res) => {
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
