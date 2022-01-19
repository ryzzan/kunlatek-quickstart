import {
  Component
} from '@angular/core';
import { AuthService } from './auth.service';

import { MatSnackBar } from '@angular/material/snack-bar';

import { MyErrorHandler } from '../../utils/error-handler';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { UserInterface } from '../../interfaces/autentikigo';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  user?: any;
  loggedIn = false;
  load = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _snackbar: MatSnackBar,
    private _auth: AuthService,
    private _errorHandler: MyErrorHandler,
  ) {}

  ngOnInit(): void {
    this._auth.signOut();
    
    const params = this.route.snapshot.queryParams;

    if (params['token']) {
      const token = params['token'];
      this._auth.getUserData(token)
      .then((res: any) => {
        if (res.userId) {
          this.setSessionStorage(res);
          this.router.navigate(['/main']);
        }
      })
      .catch(err => {
        if (err.error.error.message) {
          switch (err.error.error.message) {
            case 'User not registered':
              sessionStorage.setItem('tokenToRegister', token);
              this.router.navigate(['/person']);
              break;
          
            default:
              this.setErrorMessage(err.error.error.message);
              break;
          }
        }
      });
    }

    if (sessionStorage.getItem('userId')) {
      this.router.navigate(['/main']);      
    }
  }

  signInWithGoogle = () => {
    window.location.replace(`http://localhost:3000/auth/google-signin?projectId=${environment.projectId}`);
  }

  setSessionStorage = (userData: UserInterface) => {
    sessionStorage.setItem('birthday', userData.personInfo.birthday);
    sessionStorage.setItem('country', userData.personInfo.country);
    sessionStorage.setItem('gender', userData.personInfo.gender);
    sessionStorage.setItem('mother', userData.personInfo.mother);
    sessionStorage.setItem('name', userData.personInfo.name);
    sessionStorage.setItem('uniqueId', userData.personInfo.uniqueId);
    sessionStorage.setItem('_id', userData.personInfo._id);
    sessionStorage.setItem('userId', userData.userId);
  }

  setErrorMessage = (errorMessage: string) => {
    const message = this._errorHandler.apiErrorMessage(errorMessage);
    this._snackbar.open(message, undefined, {
      duration: 4 * 1000,
    });
  }
}
