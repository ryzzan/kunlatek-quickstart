import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const permissions = sessionStorage.getItem('permissions');

    if (typeof permissions === 'string') { console.log(permissions)
      const permissionsObject = JSON.parse(permissions);

      for (const key in permissionsObject) {
        if (Object.prototype.hasOwnProperty.call(permissionsObject, key)) {
          const element = permissionsObject[key];

          if (key === 'module') {
            console.log(element === route.url);
          }          
        }
      }
    }
    return true;
  }
  
}
