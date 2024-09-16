import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChartComponent } from './chart/chart.component';
import { DataComponent } from './data/data.component';
import { MatTabsModule } from '@angular/material/tabs';
import { StatusComponent } from './status/status.component';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ChartComponent,
    MatTabsModule,
    StatusComponent,
    DataComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'iot_ui';
  tabIndex = 0;
  constructor() {
    let url = window.location.href;
    console.log('url', url);
    let paramValue;
    if (url.includes('?')) {
      const httpParams = new HttpParams({ fromString: url.split('?')[1] });
      console.log('httpParams', httpParams, httpParams.get('tab'));
      if (httpParams.get('tab')) {
        let tab = httpParams.get('tab');
        console.log('tab:', tab);
        switch (tab) {
          case 'status': {
            this.tabIndex = 0;
            break;
          }
          case 'chart': {
            this.tabIndex = 1;
            break;
          }
          case 'data': {
            this.tabIndex = 2;
            break;
          }
          default: {
            this.tabIndex = 0;
            break;
          }
        }
      }
    }
  }
}
