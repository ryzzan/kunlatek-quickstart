import {
  HttpClient
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';
import { environment } from 'src/environments/environment';

export enum SocialMedia {
  GoogleId = 'googleId',
  AppleId = 'appleId'
}

@Injectable({
  providedIn: 'root',
}) 
export class AuthService {
  BASE_URL = environment.baseUrl;
  constructor(private _httpClient: HttpClient) {}

  setAuthenticationToken = (code: string) => {
    return this._httpClient.get(`${this.BASE_URL}/auth/token?code=${code}`)
    .toPromise();
  }

  getUserData = (token: string) => {
    return this._httpClient.get(`${this.BASE_URL}/auth/login`, {
      headers: {
        'authorization': `Bearer ${token}`
      }
    }).toPromise();
  }

  signOut = async () => {
    sessionStorage.clear();
  }
}
