import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TampedSealComponent } from './tamped-seal.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'tampedseal',
        component: TampedSealComponent,
        data: {
          title: 'Tamped Seal',
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
export class TampedSealRoutingModule {}
