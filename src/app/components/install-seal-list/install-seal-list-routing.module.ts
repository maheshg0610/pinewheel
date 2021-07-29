import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstallSealListComponent } from './install-seal-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'installseallist',
        component: InstallSealListComponent,
        data: {
          title: 'Install Seal List',
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
export class InstallSealListRoutingModule {}
