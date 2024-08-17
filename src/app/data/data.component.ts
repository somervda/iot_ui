import { Component } from '@angular/core';
import {
  MeasurementQuery,
  MeasurementsService,
} from '../services/measurements.service';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { SelectorComponent } from '../selector/selector.component';
import { Subscription } from 'rxjs';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-data',
  standalone: true,
  imports: [
    MatCardModule,
    MatExpansionModule,
    SelectorComponent,
    MatTableModule,
  ],
  templateUrl: './data.component.html',
  styleUrl: './data.component.scss',
})
export class DataComponent {
  measurements$$: Subscription | undefined;
  displayData = false;
  measurementQuery: MeasurementQuery | undefined;

  results: {}[] = [];
  columns: string[] = [];

  constructor(private measurementService: MeasurementsService) {}

  selectorChanged(measurementQuery: MeasurementQuery) {
    console.log('*selectorChanged:', measurementQuery);
    this.getData(measurementQuery);
  }

  getData(measurementQuery: MeasurementQuery) {
    console.log('getData:', measurementQuery);
    this.measurementQuery = measurementQuery;
    if (measurementQuery) {
      this.measurements$$ = this.measurementService
        .getFlatMeasurements(
          measurementQuery.application_id,
          measurementQuery.device_id,
          measurementQuery.umt,
          measurementQuery.rows,
          measurementQuery.grouping
        )
        .subscribe((results) => {
          console.log('getFlatMeasurements', results);
          if (results.length > 0) {
            // get a array of columns we want to display
            this.columns = Object.keys(results[0]);
            this.columns.forEach((column, index) => {
              if (column == 'id') this.columns.splice(index, 1);
            });
            this.columns.forEach((column, index) => {
              if (column == 'device_id') this.columns.splice(index, 1);
            });
            this.columns.forEach((column, index) => {
              if (column == 'application_id') this.columns.splice(index, 1);
            });
            this.columns.forEach((column, index) => {
              if (column == 'umt') this.columns.splice(index, 1);
            });
            console.log('columns:', this.columns);
            this.results = results;
            this.displayData = true;
          }
        });
    } else {
      this.displayData = false;
    }
  }

  downloadResults() {
    if (this.measurementQuery) {
      const file = new window.Blob([JSON.stringify(this.results)], {
        type: 'application/json',
      });

      const downloader = document.createElement('a');
      downloader.style.display = 'none';

      const fileURL = URL.createObjectURL(file);
      downloader.href = fileURL;
      downloader.download =
        'iot_' +
        this.measurementQuery.application_id.toString() +
        '_' +
        this.measurementQuery.device_id.toString() +
        '.json';
      downloader.click();
    }
  }
}
