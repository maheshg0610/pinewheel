import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelfStuffingComponent } from './self-stuffing.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'selfstuffing',
        component: SelfStuffingComponent,
        data: {
          title: 'Install Seal for FCL',
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
export class SelfStuffingRoutingModule {}
