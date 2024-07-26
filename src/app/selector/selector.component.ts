import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MeasurementsService } from '../services/measurements.service';

@Component({
  selector: 'app-selector',
  standalone: true,
  imports: [
    MatCardModule,
    MatSelectModule,
    FormsModule
  ],
  templateUrl: './selector.component.html',
  styleUrl: './selector.component.scss'
})
export class SelectorComponent {

  applications$$ : Subscription | undefined;
  devices$$ : Subscription | undefined;

  applications=[];
  application_id = -1;
  devices=[];
  device_id = 1;
  measurement="";


  constructor(private measurmentsService: MeasurementsService) {
    this.loadApplications();
    this.loadDevices();
  }

  loadApplications() {
    this.applications = [];
    // get the array of available result files
    this.applications$$ = this.measurmentsService.getApplications().subscribe((applications) => {
      console.log(applications);
      this.applications= applications;
    });
  }

  applicationSelected() {
    console.log("applicationSelected:",this.application_id,this.applications[this.application_id])
  }

  loadDevices() {
    this.applications = [];
    // get the array of available result files
    this.devices$$ = this.measurmentsService.getDevices().subscribe((devices) => {
      console.log(devices);
      this.devices= devices;
    });
  }

}
