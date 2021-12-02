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
  PersonFormService
} from './person-form.service';
import {
  MyErrorHandler
} from '../../utils/error-handler';
export interface SelectObjectInterface {
  label ? : string;
  value ? : string;
}
@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
}) export class PersonFormComponent implements OnInit {
  genderSelectObject = [{
    "label": "Feminino",
    "value": "female"
  }, {
    "label": "Masculino",
    "value": "male"
  }];
  personFormId: string;
  isAddModule: boolean;
  personFormForm: FormGroup;
  isLoading = false;
  constructor(private _formBuilder: FormBuilder, private _activatedRoute: ActivatedRoute, private _personFormService: PersonFormService, private _snackbar: MatSnackBar, private _errorHandler: MyErrorHandler) {
    this.personFormId = this._activatedRoute.snapshot.params['id'];
    this.isAddModule = !this.personFormId;
    this.personFormForm = this._formBuilder.group({
      uniqueId: [{
          value: null,
          disabled: false
        },
        []
      ],
      birthday: [{
          value: null,
          disabled: false
        },
        []
      ],
      name: [{
          value: null,
          disabled: true
        },
        []
      ],
      gender: [{
          value: null,
          disabled: true
        },
        []
      ],
      phone: [{
          value: null,
          disabled: false
        },
        []
      ],
      smsCode: [{
          value: null,
          disabled: false
        },
        []
      ],
    });
  }
  ngOnInit(): void {}
  personFormSubmit() {
    this._personFormService.save(this.personFormForm.value).then((res) => {
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
