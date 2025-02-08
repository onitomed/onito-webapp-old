import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false

  public href: string = "";

  constructor(private router: Router, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.href = this.router.url;
    if (this.tokenStorage.getToken())
      this.isLoggedIn = true
    else
      this.isLoggedIn = false  
  }

  

}
