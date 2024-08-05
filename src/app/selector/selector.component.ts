import { Component, Output, EventEmitter } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DateTime } from 'luxon';

import {
  MeasurementsService,
  Application,
  Device,
  MeasurementQuery,
} from '../services/measurements.service';

@Component({
  selector: 'app-selector',
  standalone: true,
  imports: [MatCardModule, MatSelectModule, FormsModule],
  templateUrl: './selector.component.html',
  styleUrl: './selector.component.scss',
})
export class SelectorComponent {
  @Output() selectorChange = new EventEmitter<MeasurementQuery>();

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
  summarize = 0;

  measurementQuery: MeasurementQuery = {
    application_id: 0,
    device_id: 0,
    startUMT: 0,
    rows: 100,
    grouping: 0,
    field: '',
  };

  constructor(private measurmentsService: MeasurementsService) {
    this.loadApplications();

  }

  loadApplications() {
    this.applications = [];
    // get the array of available result files
    this.applications$$ = this.measurmentsService
      .getApplications()
      .subscribe((applications) => {
        console.log(applications);
        this.applications = applications;
        this.applicationSelected();
      });
  }

  applicationSelected() {
    console.log('applicationSelected:', this.application_id);

    this.fields = [];
    this.field = '';
    if (this.applications) {
      this.application = this.applications.find(
        (application) => application.id == this.application_id
      );
      this.fields = this.application?.fields;
      console.log('applicationSelected :', this.application, this.fields);
      this.emitMeasurementQuery();
    }
    this.loadApplicationDevices();
  }

  emitMeasurementQuery() {
    this.setStartUMT();
    // Emit measurement query if values available
    if (this.application_id > 0 && this.field != '' && this.device_id >0) {
      this.measurementQuery.application_id = this.application_id;
      this.measurementQuery.device_id = this.device_id;
      this.measurementQuery.startUMT = 0;
      this.measurementQuery.rows = 100;
      this.measurementQuery.grouping = this.summarize;
      this.measurementQuery.field = this.field;
      this.selectorChange.emit(this.measurementQuery);
    }
  }

  setStartUMT() {
    // Calculate start umt
    // <mat-option [value]="0">6 hours</mat-option>
    // <mat-option [value]="1">24 Hours</mat-option>
    // <mat-option [value]="2">Week</mat-option>
    // <mat-option [value]="3">Month</mat-option>
    // <mat-option [value]="4">3 Months</mat-option>
    // <mat-option [value]="5">Year</mat-option>
    let UMT = DateTime.local() // get the current time in local timezone
      .setZone('GMT'); // change time zone back to GMT (zero offset)
    console.log('currentUMT:', UMT.valueOf());
    // set the period start based on duration
    switch(this.duration) { 
      case 0: { 
        UMT = UMT.minus({"hours":6});
        break;
      }
      case 1: { 
        UMT = UMT.minus({"hours":24})
        break;
      }
      case 2: { 
        UMT = UMT.startOf('week');
        break;
      }
    }
    // let monthUMT = DateTime.local() // get the current time in local timezone
    //   .startOf('month') // set the time to the start of the current day
    //   .setZone('GMT'); // change time zone back to GMT (zero offset)
    console.log('UMT:', UMT.valueOf());
  }

  loadApplicationDevices() {
    this.devices = [];
    // get the array of available result files
    this.devices$$ = this.measurmentsService
      .getApplicationDevices(this.application_id)
      .subscribe((applicationdevices) => {
        console.log("loadApplicationDevices:",applicationdevices);
        this.devices = applicationdevices;
      });
  }
}
