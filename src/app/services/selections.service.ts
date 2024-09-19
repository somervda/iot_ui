import { Injectable } from '@angular/core';






@Injectable({
  providedIn: 'root'
})

export class SelectionsService {
  _application_id: number = 0;
  _device_id: number = 0;
  _duration: number = -1;
  _rows: number = 0;
  _grouping: number = 0;
  _field: string = '';

  constructor() { }

  public get application_id() {
    return this._application_id;
  }

  public set application_id(application_id: number) {
    this._application_id = application_id;
  }

  public get device_id() {
    return this._device_id;
  }

  public set device_id(device_id: number) {
    this._device_id = device_id;
  }

  public get duration() {
    return this._duration;
  }

  public set duration(duration: number) {
    this._duration = duration;
  }

}
