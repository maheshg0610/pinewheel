import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DashboardModule } from './components/dashboard/dashboard.module';
import { SharedModule } from './shared/shared.module';

import { AuthModule } from './components/auth/auth.module';
import { RequisitionModule } from './components/requisition/requisition.module';
import { ProfileModule } from './components/profile/profile.module';
import { InstallSealModule } from './components/install-seal/install-seal.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    DashboardModule,
    ProfileModule,
    InstallSealModule,
    AuthModule,
    SharedModule,
    RequisitionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
