import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MeasurementsService } from '../services/measurements.service';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent {
  constructor(private measurementService: MeasurementsService) {
  }

  getData() {
    this.measurementService.getMeasurements(1,1,0,5,0).subscribe((results) => {
      // results.forEach((result) => {
      //   let resultName = result.replace('results/', '').replace('.json', '');
      //   this.results.push(resultName);
      // });
      // this.results.sort();
      console.log(results)
    });
  }

}
