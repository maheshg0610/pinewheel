import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endPoints } from 'src/app/shared/config/endpoint.config';
import { map, catchError, switchMap } from 'rxjs/operators';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PinwheelService {
  public updateSearchResults: BehaviorSubject<any>;
  public updateSearchResults$: Observable<any>
  public user:any;

  constructor(private httpService: HttpClient) { 
    this.updateSearchResults = new BehaviorSubject<any>({ loadTerms: false });
    this.updateSearchResults$ = this.updateSearchResults.asObservable();
    this.user = JSON.parse(localStorage.getItem('user'));
  }

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

  getPORTList() {
    return this.httpService.get(endPoints.POST_LIST)
      .pipe(map((response: any) => {
        return response;
      }));
  }


  getCHAList() {
    return this.httpService.get(endPoints.CHA_LIST)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  getCFSList() {
    return this.httpService.get(endPoints.CFS_LIST)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  registerEseal(payload) {
    return this.httpService.post(endPoints.ESEAL_REGISTER, payload)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  vendorList() {
    return this.httpService.get(endPoints.vendor_LIST)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  activateVendor(payload) {
    return this.httpService.post(endPoints.activate, payload)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  healthStatusCheck(payload) {
    return this.httpService.put(endPoints.health_status, payload)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  newRequisition(payload) {
    return this.httpService.post(endPoints.VENDOR_REQUEST, payload)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  vendoeListForActivation(param) {
    return this.httpService.get(endPoints.userList+param)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  adminAccept(param) {
    return this.httpService.post(endPoints.superAdminAccept, param)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  vendorDashboard() {
    return this.httpService.get(endPoints.vendorDashboard + this.user.userId )
      .pipe(map((response: any) => {
        return response;
      }));
  }

  adminDashboard(param) {
    return this.httpService.get(endPoints.adminDashboard + param)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  searchEseal( searchVal){
    return this.httpService.get(endPoints.searchEseal + this.user.userId +'&sealNo=Seal'+ searchVal)
      .pipe(map((response: any) => {
        return response;
      }));
  } 
  
  trackEseal(param) {
    return this.httpService.get(endPoints.trackSeal+ param)
      .pipe(map((response: any) => {
        return response;
      }));
  }
  
  notificationDetails(condition, status) {
    return this.httpService.get(endPoints.notification + this.user.userId + '&sealStatus=' + condition +'&viewStatus='+ status)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  updateNotificationDetails(notification) {
    return this.httpService.get(endPoints.updateNotification + notification+"&userId="+ this.user.userId)
    .pipe(map((response: any) => {
      return response;
    }));
  }

  getReveserCode(lat, long){
    return this.httpService.get(endPoints.geoloc +lat+'&longitude='+long+'&localityLanguage=en')
      .pipe(map((response: any) => {
        return response;
      }));
  }
}
