import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MeasurementsService } from '../services/measurements.service';
import { MatCardModule } from '@angular/material/card';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatExpansionModule } from '@angular/material/expansion';
import { SelectorComponent } from '../selector/selector.component';

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
  constructor(private measurementService: MeasurementsService) {}

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

  getData() {
    // this.measurementService.getMeasurements(1, 1, 0, 5, 0).subscribe((results) => {
    //   // results.forEach((result) => {
    //   //   let resultName = result.replace('results/', '').replace('.json', '');
    //   //   this.results.push(resultName);
    //   // });
    //   // this.results.sort();
    //   console.log(results)
    // });
    this.measurementService.getDevices().subscribe((results) => {
      // results.forEach((result) => {
      //   let resultName = result.replace('results/', '').replace('.json', '');
      //   this.results.push(resultName);
      // });
      // this.results.sort();
      console.log(results);
    });
  }

  selectorChanged(event: any) {
    console.log('*selectorChanged:', event);
  }
}
