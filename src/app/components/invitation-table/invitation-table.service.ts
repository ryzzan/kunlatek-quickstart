import {
  HttpClient
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';

@Injectable({
  providedIn: 'root',
}) export class InvitationTableService {
  BASE_URL = 'http://localhost:3000';
  constructor(private _httpClient: HttpClient) {}
  getAll() {
    return this._httpClient.get(`${this.BASE_URL}/invitations`, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      }
    }).toPromise();
  };
  delete(id: string) {
    return this._httpClient.delete(`${this.BASE_URL}/invitations/${id}`, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      }
    }).toPromise();
  };
  find(id: string) {
    return this._httpClient.get(`${this.BASE_URL}/invitations/${id}`, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      }
    }).toPromise();
  };
}
