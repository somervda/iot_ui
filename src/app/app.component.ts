import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChartComponent } from './chart/chart.component';
import { MatTabsModule } from '@angular/material/tabs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    ChartComponent,
    MatTabsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'iot_ui';
}
