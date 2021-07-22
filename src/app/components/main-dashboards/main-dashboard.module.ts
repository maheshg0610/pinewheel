import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountToModule } from 'angular-count-to';
import { ChartsModule } from 'ng2-charts';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ChartistModule } from 'ng-chartist';
import { SharedModule } from '../../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainDashboardRoutingModule } from './main-dashboard-routing.module';
import { SuperAdminDashboardComponent } from './super-admin-dashboard/super-admin-dashboard.component';

@NgModule({
  declarations: [DashboardComponent, SuperAdminDashboardComponent],
  imports: [
    CommonModule,
    MainDashboardRoutingModule,
    CountToModule,
    SharedModule,
    ChartsModule,
    Ng2GoogleChartsModule,
    NgxChartsModule,
    ChartistModule,
    NgxDatatableModule,
    Ng2SmartTableModule
  ]
})
export class MainDashboardModule {}
