import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VendorManagementComponent } from './vendor-management.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'vendormanagement',
        component: VendorManagementComponent,
        data: {
          title: 'Vendor Management',
          breadcrumb: 'Vendor Management'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorManagementRoutingModule {}
