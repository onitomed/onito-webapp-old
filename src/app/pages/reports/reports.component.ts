import { Component, OnInit } from '@angular/core';
import { ReportsService } from 'src/app/services/reports.service';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { environment } from 'src/environments/environment';

interface linkObject {
  [key: string]: string  
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  
})

export class ReportsComponent implements OnInit {
  pdfSrc: string = ""
  link: string=""
  copyMessageDisplay = false
  copyMessage = "Copied link to reports"
  host: string = ''
  noReports = false
  isLoading = false
  

  constructor(private reportsService: ReportsService) {
    this.host = `${window.location.origin}`
    this.isLoading = true
    this.reportsService.getShareLink()
    .subscribe((linkObj: linkObject): void => {
      this.link = `${this.host}/#/view?token=${linkObj['link']}`
      
    })
    this.reportsService.findById()
    .subscribe((b64String: string): void => {
      const byteArray = new Uint8Array(atob(b64String).split('').map(char => char.charCodeAt(0)));
      const file = new Blob([byteArray], {type: 'application/pdf'});
      this.pdfSrc = URL.createObjectURL(file);
      this.isLoading = false
    });
    
   }
   _copied(element: boolean) {
    this.copyMessageDisplay = element
    setTimeout(() => {this.copyMessageDisplay=false}, 5000)
  }

  ngOnInit(): void {
  }

}
