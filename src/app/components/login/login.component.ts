import { Component } from "@angular/core";
import { AuthService } from "./auth.service";

import { MyErrorHandler } from "../../utils/error-handler";
import { ActivatedRoute, Router } from "@angular/router";

import { UserInterface } from "../../interfaces/autentikigo";
import { MatSnackBar } from "@angular/material/snack-bar";
import { environment } from "src/environments/environment";

export interface ParamsI {
  token?: string;
}

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  user?: any;
  loggedIn = false;
  isLoading = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _auth: AuthService,
    private _errorHandler: MyErrorHandler,
    private _snackbar: MatSnackBar
  ) {
    this.setAuthentication();
  }

  signInWithGoogle = () => {
    this.isLoading = true;
    window.location.replace(`${environment.baseUrl}/auth/google-signin`);
  };

  signInWithApple = () => {
    this.isLoading = true;
    window.location.replace(`${environment.baseUrl}/auth/apple-signin`);
  };

  setAuthentication = async () => {
    this._auth.signOut();
    const params: ParamsI = this.route.snapshot.queryParams;
    
    if (params.token) {
      const token = params.token;
      try {        
        const result: any = await this._auth
                              .getUserData(token);
        if (result?.statusCode === 200) {
          this.setSessionStorage(result.data);
          this.router.navigate(["/main"]);
        }

        if (result?.statusCode === 601) {
          sessionStorage.setItem("tokenToRegister", token);
          this.router.navigate(["/signup"]);
        }

      } catch (error: any) {
        const message = this._errorHandler.apiErrorMessage(error?.message);
        this.sendErrorMessage(message);
      }
    }

    this.isLoading = false;

    if (sessionStorage.getItem("_id")) {
      this.router.navigate(["/main"]);
    }
  };

  setSessionStorage = (data: UserInterface) => {
    sessionStorage.setItem("_id", data.userData._id);
    sessionStorage.setItem("token", data.authToken);
    sessionStorage.setItem("refreshToken", data.authRefreshToken);
    sessionStorage.setItem("email", data.userData.email);
    sessionStorage.setItem(
      "permission",
      JSON.stringify(data.userData.permissionGroups)
    );

    if (data.userData.person) {
      sessionStorage.setItem("birthday", data.userData.person.birthday);
      sessionStorage.setItem("country", data.userData.person.country);
      sessionStorage.setItem("gender", data.userData.person.gender);
      sessionStorage.setItem("mother", data.userData.person.mother);
      sessionStorage.setItem("name", data.userData.person.name);
      sessionStorage.setItem("uniqueId", data.userData.person.uniqueId);
      sessionStorage.setItem("personId", data.userData.person._id);
    }

    if (data.userData.company) {
      sessionStorage.setItem("birthday", data.userData.company.birthday);
      sessionStorage.setItem("cnae", data.userData.company.cnae);
      sessionStorage.setItem(
        "corporateName",
        data.userData.company.corporateName
      );
      sessionStorage.setItem("tradeName", data.userData.company.tradeName);
      sessionStorage.setItem("companyEmail", data.userData.company.email);
      sessionStorage.setItem("responsible", data.userData.company.responsible);
      sessionStorage.setItem("uniqueId", data.userData.company.uniqueId);
      sessionStorage.setItem("companyId", data.userData.company._id);
    }
  };

  sendErrorMessage = (errorMessage: string) => {
    this._snackbar.open(errorMessage, undefined, {
      duration: 4 * 1000,
    });
  };
}
