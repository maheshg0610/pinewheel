import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TampedSealComponent } from './tamped-seal.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'tamperedseal',
        component: TampedSealComponent,
        data: {
          title: 'Tampered Seal List',
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
