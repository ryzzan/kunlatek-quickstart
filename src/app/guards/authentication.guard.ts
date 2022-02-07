import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard {
  canActivate = (
    router: Router
  ): boolean => {    
    if (!sessionStorage.getItem('uniqueId')) {
      router.navigate(['/']);
      console.warn('You must authenticate to login!');
      return false;
    }

    return true;
  }
}
