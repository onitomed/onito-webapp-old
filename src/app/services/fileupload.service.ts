import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileuploadService {
   private uploadUrl = 'http://localhost:8000/api/patientdata'

  constructor(private httpClient: HttpClient) {}
  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('dataFile', file);
    return this.httpClient.post(this.uploadUrl, formData);
  }
}
