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
  device_id = 1;
  statuses: Status[] | undefined;

  constructor(private measurementsService: MeasurementsService) {
    this.loadDevices();
  }

  loadDevices() {
    this.devices$$ = this.measurementsService
      .getDevices()
      .subscribe((devices) => {
        console.log(devices);
        this.devices = devices;
      });
  }

  deviceSelected() {
    console.log('deviceSelected');
    this.status$$ = this.measurementsService
      .getDeviceApplicationsStatus(this.device_id)
      .subscribe((statuses) => {
        console.log('deviceSelected1', statuses);
        this.statuses = statuses;
      });
  }
}
