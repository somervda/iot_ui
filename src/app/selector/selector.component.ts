import { Component ,Output, EventEmitter } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  MeasurementsService,
  Application,
  Device,
} from '../services/measurements.service';

@Component({
  selector: 'app-selector',
  standalone: true,
  imports: [MatCardModule, MatSelectModule, FormsModule],
  templateUrl: './selector.component.html',
  styleUrl: './selector.component.scss',
})
export class SelectorComponent {

  @Output() selectorChange = new EventEmitter<{application_id:number}>();

  applications$$: Subscription | undefined;
  devices$$: Subscription | undefined;

  applications: Application[] | undefined;
  application: Application | undefined;
  application_id = 1;
  devices: Device[] | undefined;
  device_id = 1;
  fields: string[] | undefined;
  field = '';
  duration = 0;
  end = 0;
  summarize=0;

  constructor(private measurmentsService: MeasurementsService) {
    this.loadApplications();
    this.loadDevices();
  }

  loadApplications() {
    this.applications = [];
    // get the array of available result files
    this.applications$$ = this.measurmentsService
      .getApplications()
      .subscribe((applications) => {
        console.log(applications);
        this.applications = applications;
        this.applicationSelected()
      });
  }

  applicationSelected() {
    console.log('applicationSelected:', this.application_id);
    this.fields = [];
    this.field="";
    if (this.applications) {
      this.application = this.applications.find(
        (application) => application.id == this.application_id
      );
      this.fields = this.application?.fields;
      console.log('applicationSelected :', this.application, this.fields);
      this.selectorChange.emit({"application_id":this.application_id});
    }
  }

  loadDevices() {
    this.applications = [];
    // get the array of available result files
    this.devices$$ = this.measurmentsService
      .getDevices()
      .subscribe((devices) => {
        console.log(devices);
        this.devices = devices;
      });
  }
}
