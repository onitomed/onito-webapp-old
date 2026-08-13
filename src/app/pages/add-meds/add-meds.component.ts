import { DatePipe, TitleCasePipe, WeekDay } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AddbtnComponent } from 'src/app/components/addbtn/addbtn.component';


import { Meds } from 'src/app/models/Meds';
import { PatientSm } from 'src/app/models/Patientsm';
import { User } from 'src/app/models/User';
import { MedsService } from 'src/app/services/meds.service';
import { PatientService } from 'src/app/services/patient.service';
import { UserService } from 'src/app/services/user.service';

interface timeMap {
  [key: string]: string
}


@Component({
  selector: 'app-add-meds',
  
  templateUrl: './add-meds.component.html',
  styleUrl: './add-meds.component.css',
  standalone: false
  
})
export class AddMedsComponent {
  meds!:Meds
  user!: User
  patients!: [PatientSm];
  patientSm!: string;
  timezone!: any;
  medTimeStrings!: timeMap
  showAddMed = false
  frequency:string = 'Daily'
  medSchedule = []
  form: any = {
    medicineName: null,
    medicineTime: null,
    
  };
  errorMessage = '';
  isAddFailed = false;

  options = {
    weekStart: WeekDay.Monday,
    inactiveColor: "#f6f6f6",
    inactiveBgColor: '#d9534f',
    inactiveBorderColor: '#f6f6f6',
    daysNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    selected: [WeekDay.Saturday, WeekDay.Sunday, WeekDay.Monday, WeekDay.Tuesday, WeekDay.Wednesday, WeekDay.Thursday, WeekDay.Friday ],
    dayWidth: '60px',
    fontSize: "20px",
    activeColor:"#f6f6f6",
    activeBgColor:"#7ED958",
    activeBorderColor: '#f6f6f6',

  };

  constructor (private medsService: MedsService, private titleService: Title, private userService: UserService, private patientService: PatientService) {
    this.titleService.setTitle("Your Medicines - ONITO");
  }
  ngOnInit(): void {
    this.timezone =  -(new Date().getTimezoneOffset() / 60);
    
    this.medsService.getPatientMeds().subscribe((meds) => {
      this.meds = meds
      this.medTimeStrings = {}
      // ISO8601 string for every medicine time
      // stored in medTimeStrings object
      for (let i=0; i<this.meds.medicines.length; i++) {
        const timeH = Math.floor(this.meds.medicines[i].time/100)
        const timeM = (this.meds.medicines[i].time%100)
        let timeHHStr = ''
        let timeMMStr = ''
        if (timeH<10)
          timeHHStr = '0'+timeH.toString()
        else
          timeHHStr = timeH.toString()
        if (timeM<10)
          timeMMStr = '0'+timeM.toString()
        else
          timeMMStr = timeM.toString()
        let timezoneOffset = this.meds.timezoneOffset
        let sym=''
        if (timezoneOffset >= 0)
          sym = "+"
        else
          sym = "-"
        const tzo = Math.floor(Math.abs(this.meds.timezoneOffset)/1)
        const tzd = (Math.abs(this.meds.timezoneOffset)%1)
        let timeZOStr = ''
        let timeZDStr = ''
        if (Math.abs(tzo)<10)
          timeZOStr = '0'+tzo.toString()
        else
          timeZOStr = tzo.toString()
        if (tzd == 0.5)
          timeZDStr = '30'
        else
          timeZDStr = '00'
        let timeStr = "2026-01-01T"+timeHHStr+":"+timeMMStr+sym+timeZOStr+":"+timeZDStr
        // this.medTimeStrings[this.meds.medicines[i]._id][0] = timeStr
        const timeString = timeHHStr+":"+timeMMStr+":00"
        const t = new Date('1970-01-01T' + timeString + 'Z')
        .toLocaleTimeString('en-US',
          {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}
        ).toString()
        this.medTimeStrings[this.meds.medicines[i]._id] = t
        
        
      }

    });
    this.userService.getUser().subscribe((user) => {
      this.user = user
      this.patientService.getAllPatients().subscribe((obj:[PatientSm]) => {
        this.patients=obj
          
        if (this.patients.length!=null) {
          const p = this.patients.find((patient)=> patient.id==this.user.patientId)
          if (p!=null) {
            this.patientSm = p.name
            
          }
          else {
            this.patientSm = this.patients[0].name
            
          }
        }
      })
    })
  }
  addMedMenu() {
    this.showAddMed = !this.showAddMed
    this.frequency = "Daily";
  }
  hello(hell:any) {
    
    this.medSchedule = hell
    switch (this.medSchedule.length) {
      case 0:
        this.frequency = "None";
        break;
      case 1:
        this.frequency = "Once a week";
        break;
      case 2:
        this.frequency = "Twice a week";
        break;
      case 3:
        this.frequency = "Thrice a week";
        break;
      case 4:
        this.frequency = "4 times a week";
        break;
      case 5:
        this.frequency = "5 times a week";
        break;
      case 6:
        this.frequency = "6 times a week";
        break;
      case 7:
        this.frequency = "Daily";
    }
  }
  onSubmit(): void {
    //this.isLoading = true
    const { medicineName, medicineTime } = this.form;
    console.log(medicineName, medicineTime, this.medSchedule)
    // this.authService.register(name, email, password).subscribe(
    //   data => {
    //     this.tokenStorage.saveToken(data.token);
    //     this.tokenStorage.saveUser(data);
    //     this.reportsService.uploadFirst().subscribe({next: () => {
       
    //       //this.isLoading = false
    //       //this.isSuccessful = true;
    //       this.isAddFailed = false;
    //       t//his.firstUploaded = true
          
    //     },
    //     error: () => {
    //       //this.isLoading = false
    //     //this.isSuccessful = true;
    //     this.isAddFailed = false;
          
    //     }})
        
    //   },
    //   err => {
    //     //this.isLoading = false
    //     this.errorMessage = err.error.message;
    //     this.isAddFailed = true;
    //   }
    // );
  }
}
