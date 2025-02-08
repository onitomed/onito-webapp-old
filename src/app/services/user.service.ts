import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../models/User'
import { USER } from '../mock-user'
import { TokenStorageService } from './token-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8000/api/users/'

  constructor(private httpClient: HttpClient, private tokenStorageService: TokenStorageService, private router: Router) { }

  getUser (): Observable<User> {
    return this.httpClient.get<User>(this.apiUrl + 'me');
  }

  logout() {
    this.tokenStorageService.signOut(); 
  }
  
}