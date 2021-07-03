import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DraftSealComponent } from './draft-seal.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'draftseal',
        component: DraftSealComponent,
        data: {
          title: 'Seal Detail',
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
export class DraftSealRoutingModule {}
