import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EsealrepoComponent } from './eseal-repo.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'esealrepo',
        component: EsealrepoComponent,
        data: {
          title: 'Eseal Repo',
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
export class EsealrepoRoutingModule {}
