import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FileuploadService } from 'src/app/services/fileupload.service';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})

export class FileUploadComponent implements OnInit {
  fileToUpload: File | null = null;
  uploadStatus: string = 'waiting';
  isLoading = false
  
  constructor(private httpService: HttpClient, private fileUploadService: FileuploadService) { 
  }

  ngOnInit(): void {
  }

  handleFileInput(event: Event) {
    
    const target = event.target as HTMLInputElement;
    this.fileToUpload = (target.files as FileList)[0];
  }

  uploadFile() {
    if (this.fileToUpload) {
      this.isLoading = true
      this.fileUploadService.uploadFile(this.fileToUpload).subscribe({next: () => {
        this.isLoading = false
        this.uploadStatus = 'completed'
        
      },
      error: () => {
        this.isLoading = false
        this.uploadStatus = 'error'
        
      }})
    }
  }

}
