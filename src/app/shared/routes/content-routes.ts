import { Routes } from '@angular/router';

export const content: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('../../components/main-dashboards/main-dashboard.module').then(
        m => m.MainDashboardModule
      )
  },
  {
    path: 'vendor-management',
    loadChildren: () =>
      import(
        '../../components/vendor-management/vendor-management.module'
      ).then(m => m.VendorManagementModule)
  },
  {
    path: 'vendor-registration',
    loadChildren: () =>
      import(
        '../../components/vendor-registration/vendor-registration.module'
      ).then(m => m.VendorRegistrationModule)
  },
  {
    path: 'vendor-list',
    loadChildren: () =>
      import(
        '../../components/vendor-list/vendor-list.module'
      ).then(m => m.VendorListModule)
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
    path: 'install-seal',
    loadChildren: () =>
      import('../../components/install-seal/install-seal.module').then(
        m => m.InstallSealModule
      ),
    data: {
      breadcrumb: 'Install Seal'
    }
  },
  {
    path: 'install-seal-list',
    loadChildren: () =>
      import('../../components/install-seal-list/install-seal-list.module').then(
        m => m.InstallSealListModule
      ),
    data: {
      breadcrumb: 'Install Seal List'
    }
  },
  {
    path: 'eseal-track',
    loadChildren: () =>
      import('../../components/eseal-track/eseal-track.module').then(
        m => m.EsealTrackModule
      ),
    data: {
      breadcrumb: 'Eseal Track'
    }
  },
  {
    path: 'tampered-seal',
    loadChildren: () =>
      import('../../components/tamped-seal/tamped-seal.module').then(
        m => m.TampedSealModule
      ),
    data: {
      breadcrumb: 'Tamped Seal'
    }
  },
  {
    path: 'draft-seal',
    loadChildren: () =>
      import('../../components/draft-seal/draft-seal.module').then(
        m => m.DraftSealModule
      ),
    data: {
      breadcrumb: 'Draft Seal'
    }
  },
  {
    path: 'self-stuffing',
    loadChildren: () =>
      import('../../components/self-stuffing/self-stuffing.module').then(
        m => m.SelfSuffingModule
      ),
    data: {
      breadcrumb: 'Self Stuffing'
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
