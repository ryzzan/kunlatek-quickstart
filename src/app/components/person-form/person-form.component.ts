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
  PersonFormService
} from './person-form.service';
import {
  MyErrorHandler
} from '../../utils/error-handler';
import { MatSnackBar } from '@angular/material/snack-bar';
export interface SelectObjectInterface {
  label ? : string;
  value ? : string;
}
@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
}) 
export class PersonFormComponent implements OnInit {
  genderSelectObject = [{
    "label": "Feminino",
    "value": "female"
  }, {
    "label": "Masculino",
    "value": "male"
  }];
  personFormId: string;
  isAddModule: boolean;
  mainDataForm: FormGroup;
  mobileForm: FormGroup;
  isLoading = false;
  isOptional = false;
  
  constructor(
    private router: Router,
    private _formBuilder: FormBuilder, 
    private _activatedRoute: ActivatedRoute, 
    private _personFormService: PersonFormService, 
    private _errorHandler: MyErrorHandler,
    private _snackbar: MatSnackBar,
  ) {
    this.personFormId = this._activatedRoute.snapshot.params['id'];
    this.isAddModule = !this.personFormId;
    this.mainDataForm = this._formBuilder.group({
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
      country: 'br',
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
    });

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
  
  personFormSubmit() {
    this.isLoading = true;
    // const merged = {...this.mainDataForm.value, ...this.mobileForm.value};
    const timestamp = this.addHours(new Date(this.mainDataForm.value.birthday), 5);
    this.mainDataForm.value.birthday = new Date(timestamp);
    
    this._personFormService
    .save(this.mainDataForm.value).then((res: any) => {
      this.isLoading = false;
      const message = res.message;
      this._errorHandler.apiErrorMessage(res.message);
      this.sendErrorMessage(message);
      this.router.navigate(['/login']);
    }).catch((err) => {
      this.isLoading = false;
      
      if (err.message) {
        const message = err.message;
        switch (err.message) {
          case 'jwt expired':
            this._errorHandler.apiErrorMessage(err.message);
            this.sendErrorMessage(message);
            this.router.navigate(['/login']);
            break;
        
          default:
            this._errorHandler.apiErrorMessage(err.message);
            this.sendErrorMessage(message);
            break;
        }
      }
    })
  }

  addHours = (date: Date, hours: number) => {
    const timestamp = date.setHours(date.getHours()+hours);
    return timestamp;
  }

  sendErrorMessage = (errorMessage: string) => {
    this._snackbar.open(errorMessage, undefined, {
        duration: 4 * 1000,
    });
  }
}
