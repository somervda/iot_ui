import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChartComponent } from './chart/chart.component';
import { DataComponent } from './data/data.component';
import { MatTabsModule } from '@angular/material/tabs';
import { StatusComponent } from "./status/status.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    ChartComponent,
    MatTabsModule,
    StatusComponent,
    DataComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'iot_ui';
}
