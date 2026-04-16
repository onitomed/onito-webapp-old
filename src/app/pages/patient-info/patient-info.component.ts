import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-patient-info',
  imports: [],
  templateUrl: './patient-info.component.html',
  styleUrl: './patient-info.component.css',
})
export class PatientInfoComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle("Your Info - ONITO");
  }
}
