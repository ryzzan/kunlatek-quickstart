import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard {
  constructor(
    private router: Router,
    private location: Location
  ) {}

  canActivate = (): boolean => {    
    if (!sessionStorage.getItem('uniqueId')) {
      this.router.navigate(['/']);
      console.warn('You must authenticate to login!');
      return false;
    }

    return true;
  }
}
