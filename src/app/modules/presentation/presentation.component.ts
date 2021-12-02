import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { AuthService, SocialMedia } from './auth.service';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
})
export class PresentationComponent implements OnInit {
  user?: any;
  loggedIn = false;

  constructor(
    private authService: SocialAuthService, 
    private router: Router,
    private _snackbar: MatSnackBar,
    private _auth: AuthService
  ) { }

  ngOnInit(): void {if (sessionStorage.getItem('email')) {
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

  signInWithGoogle = async (): Promise<void> => {
    await  this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
    .then(res => {
      this.authService.authState.subscribe((user) => {
        this.user = user;
        
        this.loggedIn = (this.user != null);
        for (const key in this.user) {
          if (Object.prototype.hasOwnProperty.call(this.user, key)) {
            sessionStorage.setItem(key, this.user[key]);
          }
        }

        if (this.user.provider && this.user.idToken) {
          this._auth.find(SocialMedia.GoogleId)
          .then(res => {
            const string = JSON.stringify(res);
            const array = JSON.parse(string);
            
            if (array.length > 0) {
              sessionStorage.setItem('isAuthorized', 'true');
              this.router.navigate(['/main']);
            }
          })
          .catch(error => {
            this._snackbar.open(error, undefined, {
              duration: 4 * 1000,
            });
          })
        }

      });
    })
    .catch(error => {
      if (
        error.error !== 'popup_closed_by_user'
      ) {
        this._snackbar.open(error.error, undefined, {
          duration: 4 * 1000,
        });
      }
    })
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
}
