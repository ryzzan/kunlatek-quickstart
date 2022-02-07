import {
  HttpClient
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';

@Injectable({
  providedIn: 'root',
}) 

export class PermissionGroupTableService {
  BASE_URL = 'https://kunlatek-quickstart-api-tftftsuywa-uc.a.run.app';
  
  constructor(private _httpClient: HttpClient) {}
  
  getAll() {
    return this._httpClient.get(`${this.BASE_URL}/permissions`, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      }
    }).toPromise();
  };
  
  delete(id: string) {
    return this._httpClient.delete(`${this.BASE_URL}/permissions/${id}`, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      }
    }).toPromise();
  };

  find(id: string) {
    return this._httpClient.get(`${this.BASE_URL}/permissions/${id}`, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      }
    }).toPromise();
  };
  
  refreshToken() {
    return this._httpClient.get(`${this.BASE_URL}/auth/refresh-token`, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      }
    }).toPromise();
  };
}
