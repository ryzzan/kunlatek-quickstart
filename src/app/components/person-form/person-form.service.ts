import {
  HttpClient
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';
@Injectable({
  providedIn: 'root',
}) export class PersonFormService {
  BASE_URL = 'http://localhost:3000';
  constructor(private _httpClient: HttpClient) {}
  save(body: any) {
    return this._httpClient.post(`${this.BASE_URL}/auth/signup`, body, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('tokenToRegister')}`
      }
    }).toPromise();
  };
}
