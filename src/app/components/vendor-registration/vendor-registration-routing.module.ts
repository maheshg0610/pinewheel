import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VendorRegistrationComponent } from './vendor-registration.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'vendorregistration',
        component: VendorRegistrationComponent,
        data: {
          title: 'Vendor Registration',
          breadcrumb: 'Vendor Registration'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorRegistrationRoutingModule {}
