import {
  Component
} from '@angular/core';
import { AuthService } from './auth.service';

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
          sessionStorage.setItem('token', token);
          this.setSessionStorage(res);
          this.router.navigate(['/main']);
        }
      })
      .catch(err => {
        if (err.error.error.message) {
          switch (err.error.error.message) {
            case 'User not registered':
              sessionStorage.setItem('tokenToRegister', token);
              this.router.navigate(['/signup']);
              break;
          
            default:
              this._errorHandler.apiErrorMessage(err.error.error.message);
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
    if (userData.personInfo) {
      sessionStorage.setItem('birthday', userData.personInfo.birthday);
      sessionStorage.setItem('country', userData.personInfo.country);
      sessionStorage.setItem('gender', userData.personInfo.gender);
      sessionStorage.setItem('mother', userData.personInfo.mother);
      sessionStorage.setItem('name', userData.personInfo.name);
      sessionStorage.setItem('uniqueId', userData.personInfo.uniqueId);
      sessionStorage.setItem('_id', userData.personInfo._id);
      sessionStorage.setItem('userId', userData.userId);
    }

    if (userData.companyInfo) {
      sessionStorage.setItem('birthday', userData.companyInfo.birthday);
      sessionStorage.setItem('cnae', userData.companyInfo.cnae);
      sessionStorage.setItem('corporateName', userData.companyInfo.corporateName);
      sessionStorage.setItem('tradeName', userData.companyInfo.tradeName);
      sessionStorage.setItem('email', userData.companyInfo.email);
      sessionStorage.setItem('responsible', userData.companyInfo.responsible);
      sessionStorage.setItem('uniqueId', userData.companyInfo.uniqueId);
      sessionStorage.setItem('_id', userData.companyInfo._id);
      sessionStorage.setItem('userId', userData.userId);
    }
  }
}
