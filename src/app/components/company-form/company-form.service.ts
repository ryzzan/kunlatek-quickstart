import { HttpClient } from '@angular/common/http';import { Injectable } from '@angular/core';@Injectable({providedIn: 'root',})export class CompanyFormService {BASE_URL = 'http://localhost:3000';constructor(private _httpClient: HttpClient) {}getAll() {return this._httpClient.get(`${this.BASE_URL}/companyForms`, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}}).toPromise();};delete(id: string) {return this._httpClient.delete(`${this.BASE_URL}/companyForms/${id}`,{headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}}).toPromise();};save(body: any) {return this._httpClient.post(`${this.BASE_URL}/companyForms`, body,{headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}}).toPromise();};update(body: any, id: string) {return this._httpClient.put(`${this.BASE_URL}/companyForms/${id}`, body,{headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}}).toPromise();};find(id: string) {return this._httpClient.get(`${this.BASE_URL}/companyForms/${id}`,{headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}}).toPromise();};}