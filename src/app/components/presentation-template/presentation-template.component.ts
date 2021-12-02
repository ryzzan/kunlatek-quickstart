import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-presentation-template',
  templateUrl: './presentation-template.component.html',
  styleUrls: ['./presentation-template.component.scss']
})
export class PresentationTemplateComponent implements OnInit {
  user?: any;
  loggedIn = false;

  constructor(
    private authService: SocialAuthService, 
    private router: Router,
    private _snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
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

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
    .then(res => {
      this.authService.authState.subscribe((user) => {
        this.user = user;
        this.loggedIn = (this.user != null);
        for (const key in this.user) {
          if (Object.prototype.hasOwnProperty.call(this.user, key)) {
            sessionStorage.setItem(key, this.user[key]);
          }
        }

        if (sessionStorage.getItem('email')) this.router.navigate(['/main']);


      });
    })
    .catch(error => {
      this._snackbar.open(error, undefined, {
        duration: 4 * 1000,
      });
    })
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
}
