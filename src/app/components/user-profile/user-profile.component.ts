import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { PatientService } from 'src/app/services/patient.service';
import { PatientSm } from 'src/app/models/Patientsm';
import { Observable } from 'rxjs';
import { Patient } from 'src/app/models/Patient';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { SelectpatientComponent } from '../selectpatient/selectpatient.component';
SelectpatientComponent

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
  user!: User; 
  showAddPatientMenu = false
  


  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe((user) => {
      this.user = user
    });
  }
  addPatientMenu() {
    if (this.showAddPatientMenu == false)
      this.showAddPatientMenu = true
    else
      this.showAddPatientMenu = false
  }

}
