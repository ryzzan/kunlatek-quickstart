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
  MatSnackBar
} from '@angular/material/snack-bar';
import {
  InvitationFormService
} from './invitation-form.service';
import {
  MyErrorHandler
} from '../../utils/error-handler';
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
  invitationFormId: string;
  isAddModule: boolean;
  invitationFormForm: FormGroup;
  isLoading = false;
  constructor(private _formBuilder: FormBuilder, private _activatedRoute: ActivatedRoute, private _invitationFormService: InvitationFormService, private _snackbar: MatSnackBar, private _errorHandler: MyErrorHandler) {
    this.invitationFormId = this._activatedRoute.snapshot.params['id'];
    this.isAddModule = !this.invitationFormId;
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
      this._snackbar.open(message, undefined, {
        duration: 4 * 1000,
      });
    })
  }
}
