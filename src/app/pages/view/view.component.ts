import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { ReportsService } from 'src/app/services/reports.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CdkCopyToClipboard } from '@angular/cdk/clipboard';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  pdfSrc: string = ""
  link: string=""
  copyMessageDisplay = false
  copyMessage = "Copied link to reports"

  constructor(private route: ActivatedRoute, private reportsService: ReportsService, private router: Router) {
    let token = this.route.snapshot.paramMap.get('token')
    if (token != null) {
      this.reportsService.findByToken(token)
        .subscribe((b64String: string): void => {
          const byteArray = new Uint8Array(atob(b64String).split('').map(char => char.charCodeAt(0)));
          
          const file = new Blob([byteArray], {type: 'application/pdf'});
          this.pdfSrc = URL.createObjectURL(file);
          this.link = `${window.location.href}`
      });
    }
  }
  

  ngOnInit(): void {
    
  }
  _copied(element: boolean) {
    this.copyMessageDisplay = element
    setTimeout(() => {this.copyMessageDisplay=false}, 5000)
  }
}
