import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EsealListComponent } from './eseal-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'eseallist',
        component: EsealListComponent,
        data: {
          title: 'Eseal List',
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
export class EsealListRoutingModule {}
