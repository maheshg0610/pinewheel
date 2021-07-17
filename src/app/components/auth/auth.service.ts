import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, empty, throwError, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { endPoints } from 'src/app/shared/config/endpoint.config';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpService: HttpClient) {}



  login(user_obj: any) {
    const headers = new HttpHeaders().set('content-type', 'text');
    return this.httpService.post(endPoints.auth_user, user_obj, {headers: headers})
      .pipe(map((data: any) => {
        let user = data;
        if (user){
          localStorage.setItem('user', JSON.stringify(user));
        }
        return user;
      }), catchError((err) => {
        return throwError(err.error);
      }));
  }

  
  logout(obj) {
    // remove user from local storage to log user out
    return this.httpService.post(endPoints.logout, obj)
      // .pipe(
      //   switchMap(res => res.status === 204 ? of('no content') : of(res.body)),
      //   catchError((err) => {
      //     return throwError(err.error);
      //   })
      // );
  }

  forgotPassword(payload) {
    // return this.httpService.post(endPoints.forgot_password, payload)
    //   .pipe(
    //     switchMap(res => res.status === 204 ? of('no content') : of(res.body)),
    //     catchError((err) => {
    //       return throwError(err.error);
    //     })
    //   );
  }

  resetPassword(payload, params) {
    // return this.httpService.post(endPoints.reset_password, payload, params)
    //   .pipe(
    //     switchMap(res => res.status === 204 ? of('no content') : of(res.body)),
    //     catchError((err) => {
    //       return throwError(err.error);
    //     })
    //   );
  }

  checkForResetLink(payload) {
    // return this.httpService.post(endPoints.checkForResetLinkExpiry, payload)
    //   .pipe(
    //     switchMap(res => res.status === 204 ? of('no content') : of(res.body)),
    //     catchError((err) => {
    //       return throwError(err.error);
    //     })
    //   );
  }
}
