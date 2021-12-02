import {
  HttpClient
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';
@Injectable({
  providedIn: 'root',
}) export class PermissionTableService {
  BASE_URL = 'http://localhost:3000';
  constructor(private _httpClient: HttpClient) {}
  getAll() {
    return this._httpClient.get(`${this.BASE_URL}/permissions`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).toPromise();
  };
  delete(id: string) {
    return this._httpClient.delete(`${this.BASE_URL}/permissions/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).toPromise();
  };
  find(id: string) {
    return this._httpClient.get(`${this.BASE_URL}/permissions/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).toPromise();
  };
}
