import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

export enum SocialMedia {
  GoogleId = 'googleId',
  AppleId = 'appleId'
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  BASE_URL = environment.baseUrl;

  constructor(
    public _httpClient: HttpClient
  ) { }

  find = (socialMedia: SocialMedia) => {
    const res = this._httpClient
    .get(`${this.BASE_URL}/users?filter={"where":{
        "${socialMedia}":"${sessionStorage.getItem('id')}",
        "projects":["${environment.projectId}"]
      }}`, 
    {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
      }
    }).toPromise();
    
    return res;
  }

  update(body: any, id: string) {
    return this._httpClient.put(`${this.BASE_URL}/users/${id}`, body, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).toPromise();
  }
}
