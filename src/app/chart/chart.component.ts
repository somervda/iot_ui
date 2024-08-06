import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MeasurementQuery,
  MeasurementsService,
} from '../services/measurements.service';
import { MatCardModule } from '@angular/material/card';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatExpansionModule } from '@angular/material/expansion';
import { SelectorComponent } from '../selector/selector.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    NgxChartsModule,
    MatExpansionModule,
    SelectorComponent,
  ],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
})
export class ChartComponent {
  measurements$$: Subscription | undefined;
  
  // options
  multi: any;
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Hz';
  timeline: boolean = false;
  view: [number, number] = [800, 400];
  
  constructor(private measurementService: MeasurementsService) {}

  selectorChanged(measurementQuery: MeasurementQuery) {
    console.log('*selectorChanged:', measurementQuery);
    this.measurements$$ = this.measurementService
      .getSeriesMeasurements(
        measurementQuery.application_id,
        measurementQuery.device_id,
        measurementQuery.umt,
        measurementQuery.rows,
        measurementQuery.grouping,
        measurementQuery.field
      )
      .subscribe((results) => {
        console.log('getSeriesMeasurements', results);
      });
  }
}
