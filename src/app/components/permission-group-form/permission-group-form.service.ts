import {
  HttpClient
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';
@Injectable({
  providedIn: 'root',
}) export class PermissionGroupFormService {
  BASE_URL = 'http://localhost:3000';
  constructor(private _httpClient: HttpClient) {}
  usersSelectObjectGetAll() {
    return this._httpClient.get(`${this.BASE_URL}/users`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).toPromise();
  }
  moduleSelectObjectGetAll() {
    return this._httpClient.get(`${this.BASE_URL}/modules`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).toPromise();
  }
  permissionsSelectObjectGetAll() {
    return this._httpClient.get(`${this.BASE_URL}/acl-actions`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).toPromise();
  }
  getAll() {
    return this._httpClient.get(`${this.BASE_URL}/acl`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).toPromise();
  };
  delete(id: string) {
    return this._httpClient.delete(`${this.BASE_URL}/acl/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).toPromise();
  };
  save(body: any) {
    return this._httpClient.post(`${this.BASE_URL}/acl`, body, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).toPromise();
  };
  update(body: any, id: string) {
    return this._httpClient.put(`${this.BASE_URL}/acl/${id}`, body, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).toPromise();
  };
  find(id: string) {
    return this._httpClient.get(`${this.BASE_URL}/acl/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).toPromise();
  };
}
