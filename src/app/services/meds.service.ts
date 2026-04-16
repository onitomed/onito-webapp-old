import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';

import { Meds } from '../models/Meds';
import { Observable } from 'rxjs';

const apiUrl = `${environment.apiUrl}/api/meds`

@Injectable({
  providedIn: 'root',
})
export class MedsService {
  constructor(private httpClient: HttpClient) { }
  public getPatientMeds(): Observable<Meds> {
    return this.httpClient.get<Meds>(`${apiUrl}`, { responseType: 'json'});
  }
}
