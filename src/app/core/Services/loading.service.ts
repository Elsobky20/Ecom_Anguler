import { Injectable } from '@angular/core';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  requesrCount = 0
  constructor(private _service: NgxSpinnerService) { }
  loding() {
    this.requesrCount++;
    this._service.show(undefined, {
      bdColor: "rgba(0, 0, 0, 0.8)",
      size: "large",
      color: "#fff",
      type: "square-jelly-box",
      fullScreen: true
    })
  }
  hideloader() {
    this.requesrCount--;
    if (this.requesrCount <= 0) {
      this.requesrCount = 0;
      this._service.hide();
    }
  }
}
