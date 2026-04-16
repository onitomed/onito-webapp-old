import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Meds } from 'src/app/models/Meds';
import { MedsService } from 'src/app/services/meds.service';


@Component({
  selector: 'app-add-meds',
  imports: [],
  templateUrl: './add-meds.component.html',
  styleUrl: './add-meds.component.css',
})
export class AddMedsComponent {
  meds!:Meds
  constructor (private medsService: MedsService, private titleService: Title) {
    this.titleService.setTitle("Your Medicines - ONITO");
  }
  ngOnInit(): void {
    this.medsService.getPatientMeds().subscribe((meds) => {
      this.meds = meds
    });
    
  }

}
