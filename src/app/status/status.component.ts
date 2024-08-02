import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

import { FormsModule } from '@angular/forms';
import {
  MeasurementsService,
  Application,
  Device,
  MeasurementQuery,
} from '../services/measurements.service';

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [MatCardModule, MatSelectModule, FormsModule],
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss'
})
export class StatusComponent {
  devices$$: Subscription | undefined;
  devices: Device[] | undefined;
  device_id = 1;

  constructor(private measurmentsService: MeasurementsService) {
    this.loadDevices();
  }

  loadDevices() {
    // get the array of available result files
    this.devices$$ = this.measurmentsService
      .getDevices()
      .subscribe((devices) => {
        console.log(devices);
        this.devices = devices;
      });
  }

}
