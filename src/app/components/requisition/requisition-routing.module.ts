import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequisitionComponent } from './requisition.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'requisition',
        component: RequisitionComponent,
        data: {
          title: 'Requisition Details',
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
export class RequisitionRoutingModule {}
