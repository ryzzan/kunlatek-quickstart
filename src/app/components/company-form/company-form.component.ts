import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';
import {
  ActivatedRoute, Router
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
    private router: Router,
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
            country: 'br',
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
    const timestamp = this.addHours(new Date(this.mainDataForm.value.birthday), 5);
    this.mainDataForm.value.birthday = new Date(timestamp);
    
    this._companyFormService
    .save(this.mainDataForm.value).then((res) => {
      this.isLoading = false;
    }).catch((err) => {
      this.isLoading = false;

      if (err.error.error.message) {
        switch (err.error.error.message) {
          case 'jwt expired':
            this.setErrorMessage(err.error.error.message);
            this.router.navigate(['/login']);
            break;
        
          default:
            this.setErrorMessage(err.error.error.message);
            break;
        }
      }
    })
  }

  setErrorMessage = (errorMessage: string) => {
    const message = this._errorHandler.apiErrorMessage(errorMessage);
    
    this._snackbar.open(message, undefined, {
      duration: 4 * 1000,
    });
  }

  addHours = (date: Date, hours: number) => {
    const timestamp = date.setHours(date.getHours()+hours);
    return timestamp;
  }
}