import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Status } from '../services/measurements.service';

@Component({
  selector: 'app-devicestatus',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './devicestatus.component.html',
  styleUrl: './devicestatus.component.scss',
})
export class DevicestatusComponent implements OnInit {
  @Input() status: Status | undefined;
  latitude = 0;
  longitude = 0;
  measurements: { key: string; value: number }[] = [];

  ngOnInit(): void {
    if (this.status?.data) {
      let data = this.status?.data;
      console.log('constructor', data);
      // var result = Object.keys(data).map((key) => [key, data[key]]);
      for (const [key, value] of Object.entries(data)) {
        console.log(`${key}: ${value}`);
        if (typeof value === 'number') {
          this.measurements.push({ key: key, value: value });
          if (this.status?.name == 'Location') {
            if (key == 'latitude') {
              this.latitude = value;
            }
            if (key == 'longitude') {
              this.longitude = value;
            }
          }
        }
      }
    }
  }

  umtToLocal(umt: number | undefined) {
    if (umt) {
      let date = new Date(umt * 1000);
      return date.toLocaleTimeString();
    } else return 'Unknown';
  }

  toFahrenheit(celsius: number) {
    return Math.round((celsius * 1.8 + 32) * 10) / 10;
  }
}
