import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EsealTrackComponent } from './eseal-track.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'esealtrack',
        component: EsealTrackComponent,
        data: {
          title: 'Eseal Track',
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
export class EsealTrackRoutingModule {}
