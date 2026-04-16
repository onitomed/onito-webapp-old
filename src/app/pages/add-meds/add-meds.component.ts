import { Component } from '@angular/core';
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
  constructor (private medsService: MedsService) {}
  ngOnInit(): void {
    this.medsService.getPatientMeds().subscribe((meds) => {
      this.meds = meds
    });
    
  }

}
