import {
  Component,
  OnInit
} from '@angular/core';
import {
  MatDialog
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/components/login/auth.service';
import {
  LogoutConfirmationDialogComponent
} from 'src/app/components/logout-confirmation-dialog/logout-confirmation-dialog.component';
import { MyErrorHandler } from 'src/app/utils/error-handler';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
}) 
export class MainComponent implements OnInit {
  permissionGroupsOwners;
  permissionIndex = 0;
  userType;
  menu = [
    {
      router: '/main/dashboard',
      title: 'Página inicial',
      icon: 'dashboard',
      itens: [],
    }
  ];
  isMenuOpened = true;
  isToLogout: boolean = true;
  constructor(
    private logoutDialog: MatDialog,
    private router: Router,
    private _errorHandler: MyErrorHandler,
    private _auth: AuthService,
    private _snackbar: MatSnackBar,
  ) {
    if (sessionStorage.getItem('permission') !== null) {
      sessionStorage.getItem('personId') ? this.userType = 'person' : this.userType = 'company';
      const permissionString = sessionStorage.getItem('permission');
      let permissions;
      if (permissionString !== null) {
        permissions = JSON.parse(permissionString);
        this.permissionGroupsOwners =  permissions;
      }
      
      permissions[this.permissionIndex].permissions.forEach((permission: any) => {
        this.menu.push({
          router: `/main/${permission.module.route}`,
          title: `${permission.module.name}`,
          icon: 'dashboard',
          itens: [],
        })
      });
    }
  };
  
  ngOnInit(): void {};  
  
  logoutOpenDialog = (): void => {
    const logoutDialogRef = this.logoutDialog.open(LogoutConfirmationDialogComponent, {
      data: {
        isToLogout: this.isToLogout,
      }
    });

    logoutDialogRef.afterClosed().subscribe((res: any) => {
      if (res) this.logout();
    });
  };

  logout = () => {
    this._auth.signOut()
    .then(res => {
      this.router.navigate(['/']);
    })
    .catch(err => {
      const message = this._errorHandler.apiErrorMessage(err.message);
      this.sendErrorMessage(message);
    })
  };

  changePermissionIndex = (index: number) => {
    this.permissionIndex = index;
    this.setMenuByPermission();
  }

  setMenuByPermission = () => {
    this.menu = [
      {
        router: '/main/dashboard',
        title: 'Página inicial',
        icon: 'dashboard',
        itens: [],
      }
    ];
    if (sessionStorage.getItem('permission') !== null) {
      sessionStorage.getItem('personId') ? this.userType = 'person' : this.userType = 'company';
      const permissionString = sessionStorage.getItem('permission');
      let permissions;
      if (permissionString !== null) {
        permissions = JSON.parse(permissionString);
        this.permissionGroupsOwners =  permissions;
      }
      
      permissions[this.permissionIndex].permissions.forEach((permission: any) => {
        this.menu.push({
          router: `/main/${permission.module.route}`,
          title: `${permission.module.name}`,
          icon: 'dashboard',
          itens: [],
        })
      });
    }
  }

  sendErrorMessage = (errorMessage: string) => {
    this._snackbar.open(errorMessage, undefined, {
        duration: 4 * 1000,
    });
  }
}
