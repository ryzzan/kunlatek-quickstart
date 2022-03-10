import {
  HttpClient
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
}) export class SignupFormService {
  BASE_URL = environment.baseUrl;
  constructor(private _httpClient: HttpClient) {}
  getAll() {
    return this._httpClient.get(`${this.BASE_URL}/signupForms`, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      }
    }).toPromise();
  };
  delete(id: string) {
    return this._httpClient.delete(`${this.BASE_URL}/signupForms/${id}`, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      }
    }).toPromise();
  };
  save(body: any) {
    return this._httpClient.post(`${this.BASE_URL}/signupForms`, body, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      }
    }).toPromise();
  };
  update(body: any, id: string) {
    return this._httpClient.put(`${this.BASE_URL}/signupForms/${id}`, body, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      }
    }).toPromise();
  };
  find(id: string) {
    return this._httpClient.get(`${this.BASE_URL}/signupForms/${id}`, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      }
    }).toPromise();
  };
}
