import { Component } from '@angular/core';
import {
  MeasurementQuery,
  MeasurementsService,
} from '../services/measurements.service';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { SelectorComponent } from '../selector/selector.component';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-data',
  standalone: true,
  imports: [ 
    MatCardModule,
    MatExpansionModule,
    SelectorComponent],
  templateUrl: './data.component.html',
  styleUrl: './data.component.scss'
})
export class DataComponent {
  measurements$$: Subscription | undefined;
  displayData = false;
  resultsAsString = '';


  constructor(private measurementService: MeasurementsService) {}

  selectorChanged(measurementQuery: MeasurementQuery) {
    console.log('*selectorChanged:', measurementQuery);
    this.getData(measurementQuery);
  }

  getData(measurementQuery: MeasurementQuery) {
    console.log('getData:', measurementQuery);
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
            this.resultsAsString = JSON.stringify(results);
            this.displayData = true;
          });
      } else {
        this.displayData = false;
      }
    }


}
