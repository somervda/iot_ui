import { Component, Output, EventEmitter, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DateTime } from 'luxon';

import {
  MeasurementsService,
  Application,
  Device,
  MeasurementQuery,
} from '../services/measurements.service';
import { SelectionsService } from '../services/selections.service';

@Component({
  selector: 'app-selector',
  standalone: true,
  imports: [MatCardModule, MatSelectModule, FormsModule, MatButtonModule],
  templateUrl: './selector.component.html',
  styleUrl: './selector.component.scss',
})
export class SelectorComponent {
  @Input() includeFields: boolean = false;
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
  isSummarized = false;

  measurementQuery: MeasurementQuery = {
    application_id: 0,
    device_id: 0,
    umt: 0,
    rows: 100,
    grouping: 0,
    field: '',
  };

  constructor(
    private measurmentsService: MeasurementsService,
    private selections: SelectionsService
  ) {
    if (this.selections.duration != -1)
      this.duration = this.selections.duration;
    this.loadApplications();
  }

  loadApplications() {
    this.applications = [];
    // get the array of available result files
    this.applications$$ = this.measurmentsService
      .getApplications()
      .subscribe((applications) => {
        console.log(applications);
        if (this.selections.application_id != 0)
          this.application_id = this.selections.application_id;
        this.applications = applications;
        this.applicationSelected();
      });
  }

  applicationSelected() {
    console.log('applicationSelected:', this.application_id);

    if (this.applications) {
      this.application = this.applications.find(
        (application) => application.id == this.application_id
      );

      console.log('applicationSelected :', this.application, this.fields);
    }
    this.loadApplicationDevices();
    if (this.includeFields) {
      this.loadApplicationFields();
    }
    console.log('this.selections.summarize', this.selections.summarize);
    if (this.selections.summarize != -1) {
      this.summarize = this.selections.summarize;
      this.loadApplicationFields();
      this.isSummarized = this.summarize > 0;
    }
  }

  loadApplicationFields() {
    this.fields = [];
    this.field = '';
    if (this.summarize == 0) {
      this.fields = this.application?.fields;
    } else {
      this.application?.fields.forEach((field) => {
        this.fields?.push('avg_' + field);
        this.fields?.push('min_' + field);
        this.fields?.push('max_' + field);
      });
    }
    if (this.selections.field != '') {
      this.field = this.selections.field;
      // this.tryEmitMeasurementQuery();
    }
  }

  fieldSelected() {
    this.tryEmitMeasurementQuery();
  }

  summarySelected() {
    // Only update fields if we are changing between summarized and not summarized
    if (
      (this.isSummarized && this.summarize == 0) ||
      (!this.isSummarized && this.summarize > 0)
    )
      this.loadApplicationFields();

    this.tryEmitMeasurementQuery();
    this.isSummarized = this.summarize > 0;
  }

  tryEmitMeasurementQuery() {
    console.log(
      'tryEmitMeasurementQuery:',
      this.application_id,
      '|',
      this.field,
      '|',
      this.device_id
    );
    // Emit measurement query if values selected
    if (
      this.application_id > 0 &&
      (this.field != '' || this.includeFields == false) &&
      this.device_id > 0
    ) {
      this.measurementQuery.application_id = this.application_id;
      this.measurementQuery.device_id = this.device_id;
      this.setStartUMT();
      this.measurementQuery.rows = 1000;
      this.measurementQuery.grouping = this.summarize;
      if (this.includeFields) {
        this.measurementQuery.field = this.field;
      } else {
        this.measurementQuery.field = '';
      }
      this.selections.clear();
      this.selectorChange.emit(this.measurementQuery);
    } else {
      this.measurementQuery.application_id = -1;
      this.selections.clear();
      this.selectorChange.emit(this.measurementQuery);
    }
  }

  setStartUMT() {
    // Calculate start umt
    let UMT = DateTime.local() // get the current time in local timezone
      .setZone('GMT'); // change time zone back to GMT (zero offset)
    console.log('currentUMT:', UMT.valueOf());
    // set the period start based on duration
    switch (this.duration) {
      case 0: {
        UMT = UMT.minus({ hours: 6 });
        break;
      }
      case 1: {
        UMT = UMT.minus({ hours: 24 });
        break;
      }
      case 2: {
        UMT = UMT.startOf('week');
        break;
      }
      case 3: {
        UMT = UMT.startOf('month');
        break;
      }
      case 4: {
        UMT = UMT.startOf('quarter');
        break;
      }
      case 5: {
        UMT = UMT.startOf('year');
        break;
      }
      case 6: {
        UMT = UMT.minus({ hours: 168 });
        break;
      }
      case 7: {
        UMT = UMT.minus({ hours: 3 });
        break;
      }
    }
    // let monthUMT = DateTime.local() // get the current time in local timezone
    //   .startOf('month') // set the time to the start of the current day
    //   .setZone('GMT'); // change time zone back to GMT (zero offset)
    console.log('UMT:', Math.round(UMT.valueOf() / 1000));
    this.measurementQuery.umt = Math.round(UMT.valueOf() / 1000);
  }

  loadApplicationDevices() {
    this.devices = [];
    this.device_id = -1;
    // get the array of available result files
    this.devices$$ = this.measurmentsService
      .getApplicationDevices(this.application_id)
      .subscribe((applicationdevices) => {
        console.log('loadApplicationDevices:', applicationdevices);
        if (this.selections.device_id != 0) {
          this.device_id = this.selections.device_id;
          this.tryEmitMeasurementQuery();
        }
        this.devices = applicationdevices;
      });
  }
}
