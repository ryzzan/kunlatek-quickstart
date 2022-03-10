import {
  HttpClient
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
}) export class CompanyFormService {
  BASE_URL = environment.baseUrl;
  constructor(private _httpClient: HttpClient) {}
  save(body: any) {
    return this._httpClient.post(`${this.BASE_URL}/auth/signup`, body, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('tokenToRegister')}`
      }
    }).toPromise();
  };
}
