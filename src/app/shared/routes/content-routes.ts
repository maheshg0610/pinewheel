import { Routes } from '@angular/router';

export const content: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('../../components/dashboard/dashboard.module').then(
        m => m.DashboardModule
      )
  },
  {
    path: 'requisition',
    loadChildren: () =>
      import('../../components/requisition/requisition.module').then(
        m => m.RequisitionModule
      ),
    data: {
      breadcrumb: 'Requisition'
    }
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('../../components/profile/profile.module').then(
        m => m.ProfileModule
      ),
    data: {
      breadcrumb: 'profile'
    }
  }
];
