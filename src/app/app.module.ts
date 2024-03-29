import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from './shared/shared.module';
import { AuthInterceptor } from './components/auth/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthModule } from './components/auth/auth.module';
import { RequisitionModule } from './components/requisition/requisition.module';
import { ProfileModule } from './components/profile/profile.module';
import { InstallSealModule } from './components/install-seal/install-seal.module';
import { InstallSealListModule } from './components/install-seal-list/install-seal-list.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MainDashboardModule } from './components/main-dashboards/main-dashboard.module';
import { VendorManagementModule } from './components/vendor-management/vendor-management.module';
import { VendorRegistrationModule } from './components/vendor-registration/vendor-registration.module';
import { VendorListModule } from './components/vendor-list/vendor-list.module';
import { UserManagementModule } from './components/user-management/user-management.module';
import { TampedSealModule } from './components/tamped-seal/tamped-seal.module';
import { EsealTrackModule } from './components/eseal-track/eseal-track.module';
import { EsealrepoModule } from './components/eseal-repo/eseal-repo.module';
import { EsealTransferModule } from './components/eseal-transfer/eseal-transfer.module';
import { EsealListModule } from './components/eseal-list/eseal-list.module';
import { UserListModule } from './components/user-list/user-list.module';
import { VendorDataListModule } from './components/vendordata-list/vendordata-list.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    MainDashboardModule,
    VendorManagementModule,
    VendorRegistrationModule,
    VendorListModule,
    UserListModule,
    VendorDataListModule,
    ProfileModule,
    InstallSealModule,
    InstallSealListModule,
    EsealTrackModule,
    TampedSealModule,
    EsealrepoModule,
    EsealTransferModule,
    EsealListModule,
    UserManagementModule,
    AuthModule,
    SharedModule,
    RequisitionModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule {}
