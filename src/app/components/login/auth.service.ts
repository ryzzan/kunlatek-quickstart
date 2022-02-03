import {
  HttpClient
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';
import { environment } from 'src/environments/environment.prod';

export enum SocialMedia {
  GoogleId = 'googleId',
  AppleId = 'appleId'
}

@Injectable({
  providedIn: 'root',
}) 
export class AuthService {
  BASE_URL = 'https://kunlatek-quickstart-api-tftftsuywa-uc.a.run.app';
  constructor(private _httpClient: HttpClient) {}

  setAuthenticationToken = (code: string) => {
    return this._httpClient.get(`${this.BASE_URL}/auth/token?code=${code}&secret=${environment.projectId}`)
    .toPromise();
  }

  getUserData = (token: string) => {
    return this._httpClient.get(`${this.BASE_URL}/auth/get-user`, {
      headers: {
        'authorization': `Bearer ${token}`
      }
    }).toPromise();
  }

  signOut = async () => {
    sessionStorage.clear();
  }
}
