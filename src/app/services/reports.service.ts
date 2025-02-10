import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { UserService } from './user.service';
import { User } from '../models/User';
import { environment } from 'src/environments/environment';

interface linkObject {
  [key: string]: string  
}

@Injectable({
  providedIn: 'root'
})

export class ReportsService {
  user!: User;

  constructor(private httpClient: HttpClient, private userService: UserService) { }

  public findById(): Observable<string> {
    this.userService.getUser().subscribe((user) => {
      this.user = user
    })
    return this.httpClient.get(`${environment.apiUrl}/api/patientdata/`, { responseType: 'text'});
  }
  public findByToken(token: string): Observable<string> {
    return this.httpClient.get(`${environment.apiUrl}/view/${token}`, { responseType: 'text'});
  }
  public getShareLink(): Observable<linkObject> {
    return this.httpClient.get<linkObject>(`${environment.apiUrl}/api/patientdata/share`, { responseType: 'json'});
  }
}
