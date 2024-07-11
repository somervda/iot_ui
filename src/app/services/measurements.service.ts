import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class MeasurementsService {

  constructor(private http: HttpClient) {}

  getMeasurements(application_id: number, device_id: number, startUMT: number, rows: number,grouping: number) {
    // returns an observable
    let result = this.http.get<any>(
      'http://' + Globals.HOSTANDPORT + '/measurements/' + application_id.toString() +
      '/' + device_id.toString() + '/' + startUMT.toString() + 
      '/' + rows.toString() + '/' + grouping.toString() 
    );
    return result;
  }
}
