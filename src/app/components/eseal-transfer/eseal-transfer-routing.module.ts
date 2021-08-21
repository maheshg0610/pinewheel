import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EsealTransferComponent } from './eseal-transfer.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'esealtransfer',
        component: EsealTransferComponent,
        data: {
          title: 'Eseal Transfer',
          breadcrumb: ''
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), NgMultiSelectDropDownModule],
  exports: [RouterModule, NgMultiSelectDropDownModule]
})
export class EsealTransferRoutingModule {}
