import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../app.config';

export interface Device {
  id: number;
  name: string;
  description: string;
}

export interface Application {
  id: number;
  name: string;
  description: string;
  fields: string[];
}

export interface MeasurementQuery {
  application_id: number;
  device_id: number;
  startUMT: number;
  endUMT: number;
  rows: number;
  grouping: number;
  field: string;
}

@Injectable({
  providedIn: 'root',
})
export class MeasurementsService {
  constructor(private http: HttpClient) {}

  getMeasurements(
    application_id: number,
    device_id: number,
    startUMT: number,
    rows: number,
    grouping: number
  ) {
    // returns an observable
    let result = this.http.get<any>(
      'http://' +
        Globals.HOSTANDPORT +
        '/measurements/' +
        application_id.toString() +
        '/' +
        device_id.toString() +
        '/' +
        startUMT.toString() +
        '/' +
        rows.toString() +
        '/' +
        grouping.toString()
    );
    return result;
  }

  getApplications() {
    let result = this.http.get<Application[]>(
      'http://' + Globals.HOSTANDPORT + '/applications'
    );
    return result;
  }

  getApplication(application_id: number) {
    let result = this.http.get<Application>(
      'http://' +
        Globals.HOSTANDPORT +
        '/application/' +
        application_id.toString()
    );
    return result;
  }

  getDevices() {
    let result = this.http.get<any>(
      'http://' + Globals.HOSTANDPORT + '/devices'
    );
    return result;
  }

  getDevice(device_id: number) {
    let result = this.http.get<any>(
      'http://' + Globals.HOSTANDPORT + '/device/' + device_id.toString()
    );
    return result;
  }
}
