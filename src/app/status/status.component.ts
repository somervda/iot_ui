import { Component } from '@angular/core';
import { Subscriber, Subscription } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { DevicestatusComponent } from '../devicestatus/devicestatus.component';

import { FormsModule } from '@angular/forms';
import {
  MeasurementsService,
  Application,
  Device,
  Status,
  MeasurementQuery,
} from '../services/measurements.service';
import { SelectionsService } from '../services/selections.service';

// Note https://www.google.com/maps/search/?api=1&query=40.46985%2C-75.22369

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [MatCardModule, MatSelectModule, FormsModule, DevicestatusComponent],
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss',
})
export class StatusComponent {
  devices$$: Subscription | undefined;
  status$$: Subscription | undefined;
  devices: Device[] | undefined;
  device_id = -1;
  statuses: Status[] | undefined;
  url = '';

  constructor(
    private measurementsService: MeasurementsService,
    private selections: SelectionsService
  ) {
    this.loadDevices();
  }

  loadDevices() {
    this.devices$$ = this.measurementsService
      .getDevices()
      .subscribe((devices) => {
        console.log(devices);
        if (this.selections.device_id != 0) {
          this.device_id = this.selections.device_id;
          this.updateURL();
          this.selections.clear();
          this.deviceSelected();
        }
        this.devices = devices;
      });
  }

  deviceSelected() {
    console.log('deviceSelected');
    this.updateURL();
    this.status$$ = this.measurementsService
      .getDeviceApplicationsStatus(this.device_id)
      .subscribe((statuses) => {
        console.log('deviceSelected1', statuses);

        this.statuses = statuses;
      });
  }

  updateURL() {
    let url = window.location.href;
    console.log('url', url);
    let paramValue;
    this.url = url;
    if (url.includes('?')) {
      this.url = url.split('?')[0];
    }
    this.url += '?tab=status';
    if (this.device_id != -1)
      this.url += '&device_id=' + this.device_id.toString();
  }
}
