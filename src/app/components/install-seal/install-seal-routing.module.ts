import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstallSealComponent } from './install-seal.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'installseal',
        component: InstallSealComponent,
        data: {
          title: 'Installed Seal',
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
export class InstallSealRoutingModule {}
