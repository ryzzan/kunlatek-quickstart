import {
  Component
} from '@angular/core';
import { AuthService, SocialMedia } from './auth.service';

import { MatSnackBar } from '@angular/material/snack-bar';

import { MyErrorHandler } from '../../utils/error-handler';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
}) 

export class LoginComponent {
  user?: any;
  loggedIn = false;

  constructor(
    private authService: SocialAuthService, 
    private router: Router,
    private route: ActivatedRoute,
    private _snackbar: MatSnackBar,
    private _auth: AuthService,
    private _errorHandler: MyErrorHandler

  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.params['id']) {
      this._auth.setAuthenticationToken(this.route.snapshot.params['id'])
      .then((res: any) => {
        if (res?.token) {
          this._auth.getUserData(res.token)
          .then((userRes: any) => {
            if (userRes.uniqueId) {
              for (const key in userRes) {
                if (Object.prototype.hasOwnProperty.call(userRes, key)) {
                  const element = userRes[key];
                  sessionStorage.setItem(key, element);
                }
              }
              sessionStorage.setItem('token', res.token);
              sessionStorage.setItem('refreshToken', res.refreshToken);
              this.router.navigate(['/main']);
            }
          })
          .catch(userError => {
            const message = this._errorHandler.apiErrorMessage(userError.error.error.message);
            this._snackbar.open(message, undefined, {
              duration: 4 * 1000,
            });
          });
        }
      })
      .catch(error => console.log(error))
    }

    if (sessionStorage.getItem('email')) {
      this.loggedIn = true;
      this.router.navigate(['/main']);
    }

    if (!sessionStorage.getItem('email')) {
      this.authService.authState.subscribe((user) => {
        this.user = user;
        this.loggedIn = (this.user != null);
        for (const key in this.user) {
          if (Object.prototype.hasOwnProperty.call(this.user, key)) {
            sessionStorage.setItem(key, this.user[key]);
          }
        }
      });
    }
  }

  signInWithGoogle = () => {
    window.location.replace(`http://localhost:3000/auth/google-signin?projectId=${environment.projectId}`);
  }
}
