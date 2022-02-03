import {
  HttpClient
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';
@Injectable({
  providedIn: 'root',
}) export class InvitationFormService {
  BASE_URL = 'https://kunlatek-quickstart-api-tftftsuywa-uc.a.run.app';
  constructor(private _httpClient: HttpClient) {}
  permissionGroupsSelectObjectGetAll() {
    return this._httpClient.get(`${this.BASE_URL}/permissions`, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      }
    }).toPromise();
  }
  getAll() {
    return this._httpClient.get(`${this.BASE_URL}/invitationForms`, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      }
    }).toPromise();
  };
  delete(id: string) {
    return this._httpClient.delete(`${this.BASE_URL}/invitationForms/${id}`, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      }
    }).toPromise();
  };
  save(body: any) {
    return this._httpClient.post(`${this.BASE_URL}/invitationForms`, body, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      }
    }).toPromise();
  };
  update(body: any, id: string) {
    return this._httpClient.put(`${this.BASE_URL}/invitationForms/${id}`, body, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      }
    }).toPromise();
  };
  find(id: string) {
    return this._httpClient.get(`${this.BASE_URL}/invitationForms/${id}`, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      }
    }).toPromise();
  };
}
