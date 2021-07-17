import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endPoints } from 'src/app/shared/config/endpoint.config';
import { map, catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PinwheelService {

  constructor(private httpService: HttpClient) { }

  saveSelfStuffing(payload) {
    return this.httpService.post(endPoints.install_eseal, payload)
    .pipe(map((response: any) => {
        return response;
      }));
  }

  getIDCList() {
    return this.httpService.get(endPoints.IDC_LIST)
      .pipe(map((response: any) => {
        return response;
      }));
  }


  getPOSTList() {
    return this.httpService.get(endPoints.POST_LIST)
      .pipe(map((response: any) => {
        return response;
      }));
  }
}
