import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'userlist',
        component: UserListComponent,
        data: {
          title: 'User List',
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
export class UserListRoutingModule {}
