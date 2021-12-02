import {
  Component,
  OnInit
} from '@angular/core';
import {
  MatDialog
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import {
  LogoutConfirmationDialogComponent
} from 'src/app/components/logout-confirmation-dialog/logout-confirmation-dialog.component';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
}) export class MainComponent implements OnInit {
  userData = localStorage.getItem('user_data');
  userDataObject;
  userType;
  menu = [{
    router: '/main/dashboard',
    title: 'Página inicial',
    icon: 'dashboard',
    itens: [],
  }, {
    router: '/main/permission',
    title: 'Permissões',
    icon: 'dashboard',
    itens: [],
  }, {
    router: '/main/invitation',
    title: 'Convites',
    icon: 'dashboard',
    itens: [],
  }];
  isMenuOpened = true;
  isToLogout: boolean = true;
  constructor(
    private authService: SocialAuthService,
    private logoutDialog: MatDialog,
    private router: Router,
    private _snackbar: MatSnackBar
  ) {
    if (this.userData) {
      this.userDataObject = JSON.parse(this.userData);
      this.userType = this.userDataObject.type;
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
    this.authService.signOut()
    .then(res => {
      sessionStorage.clear();
      
      this.router.navigate(['/']);
    })
    .catch(error => {
      this._snackbar.open(error, undefined, {
        duration: 4 * 1000,
      });
      
      sessionStorage.clear();
      
      this.router.navigate(['/']);
    })
  };
}
