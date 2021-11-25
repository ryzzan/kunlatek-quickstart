import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (!sessionStorage.getItem('isAuthorized')) {
      void this.router.navigate(['/']);
      console.warn('You must authenticate to login');
      return false;
    }
    return true;
  }
  
}
