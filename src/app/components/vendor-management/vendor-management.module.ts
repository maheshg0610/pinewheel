import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CountToModule } from 'angular-count-to';
import { ChartsModule } from 'ng2-charts';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartistModule } from 'ng-chartist';
import { SharedModule } from '../../shared/shared.module';
import { VendorManagementComponent } from './vendor-management.component';
import { VendorManagementRoutingModule } from './vendor-management-routing.module';

@NgModule({
  declarations: [VendorManagementComponent],
  imports: [
    CommonModule,
    VendorManagementRoutingModule,
    CountToModule,
    SharedModule,
    ChartsModule,
    Ng2GoogleChartsModule,
    NgxChartsModule,
    ChartistModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class VendorManagementModule {}
