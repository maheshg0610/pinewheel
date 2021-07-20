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
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MainDashboardModule } from './components/main-dashboards/main-dashboard.module';
import { VendorManagementModule } from './components/vendor-management/vendor-management.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    MainDashboardModule,
    VendorManagementModule,
    ProfileModule,
    InstallSealModule,
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
