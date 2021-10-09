import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VendorDataListComponent } from './vendordata-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'vendorlist',
        component: VendorDataListComponent,
        data: {
          title: 'Vendor List',
          breadcrumb: ''
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorDataListRoutingModule {}
