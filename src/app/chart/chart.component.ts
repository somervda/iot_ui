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

  displayChart = false;
  // options
  multi = [
    {
      name: 'Germany',
      series: [
        {
          name: '2024-08-08T08:14:42',
          value: 24,
        },
        {
          name: '2024-08-08T09:14:42',
          value: 27,
        },
      ],
    },

    {
      name: 'USA',
      series: [
        {
          name: '2024-08-08T08:14:42',
          value: 32,
        },
        {
          name: '2024-08-08T09:14:42',
          value: 31,
        },
      ],
    },
  ];

  // Note: the ngx-charts-line-chart only supports multi mode.
  // Also I had to go back to basics to get it working then added attributes
  // e.g.
  // <ngx-charts-line-chart [results]="multi"></ngx-charts-line-chart>

  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  yScaleMin = 0;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Date/Time';
  yAxisLabel: string = 'Value';
  timeline: boolean = true;
  field = '';

  constructor(private measurementService: MeasurementsService) {}

  selectorChanged(measurementQuery: MeasurementQuery) {
    console.log('*selectorChanged:', measurementQuery);
    if (measurementQuery.application_id != -1) {
      this.field = measurementQuery.field;
      this.yAxisLabel = measurementQuery.field;
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
          results.forEach((result, idx: number) => {
            // Set yScaleMin to minimum value
            if (result.value < this.yScaleMin || idx == 0)
              this.yScaleMin = result.value;
          });
          this.multi = [{ name: this.field, series: results }];
          this.displayChart = true;
        });
    } else {
      this.displayChart = false;
    }
  }

  toMyDate(isoDate: string) {
    let myDate = new Date(isoDate);
    return myDate.toLocaleString('en-US');
  }
}
