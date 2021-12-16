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
  CompanyFormService
} from './company-form.service';
import {
  MyErrorHandler
} from '../../utils/error-handler';
@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss']
}) 
export class CompanyFormComponent implements OnInit {
  companyFormId: string;
  isAddModule: boolean;
  mainDataForm: FormGroup;
  mobileForm: FormGroup;
  isLoading = false;
  isOptional = false;
  constructor(
      private _formBuilder: FormBuilder, 
      private _activatedRoute: ActivatedRoute, 
      private _companyFormService: CompanyFormService, 
      private _snackbar: MatSnackBar, 
      private _errorHandler: MyErrorHandler
) {
    this.companyFormId = this._activatedRoute.snapshot.params['id'];
    this.isAddModule = !this.companyFormId;
    this.mainDataForm = this._formBuilder.group(
        {
            uniqueId: [{
                value: null,
                disabled: false
            },
            []
            ],
            companyName: [{
                value: null,
                disabled: true
            },
            []
            ],
            businessName: [{
                value: null,
                disabled: true
            },
            []
            ]
        }
    );
  
      this.mobileForm = this._formBuilder.group({
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
        ]
      });
  }
  ngOnInit(): void {}

  uniqueIdCheck = () => {

  }

  smsCodeCheck = () => {
    
  }
  
  companyFormSubmit() {
    const merged = {...this.mainDataForm.value, ...this.mobileForm.value};
    this._companyFormService.save(merged).then((res) => {
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
