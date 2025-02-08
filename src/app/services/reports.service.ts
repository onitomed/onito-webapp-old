import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { UserService } from './user.service';
import { User } from '../models/User';
import { environment } from 'src/environments/environment';

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
}
