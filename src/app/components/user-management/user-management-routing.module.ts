import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserMangementComponent } from './user-management.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'usermanagement',
        component: UserMangementComponent,
        data: {
          title: 'User Management',
          breadcrumb: 'User Management'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule {}
