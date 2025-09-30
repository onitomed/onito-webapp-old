import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-aitp',
  templateUrl: './aitp.component.html',
  styleUrls: ['./aitp.component.css']
})
export class AitpComponent implements OnInit {

  isLoggedIn = false

  constructor(private titleService: Title, private tokenStorageService: TokenStorageService) {
    this.titleService.setTitle("Autoimmune disease treatment planner - ONITO");
  }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
    }
  }

}
