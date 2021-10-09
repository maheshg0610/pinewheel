import { Injectable, HostListener, Inject } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { WINDOW } from './windows.service';
// Menu
export interface Menu {
  path?: string;
  title?: string;
  icon?: string;
  type?: string;
  badgeType?: string;
  badgeValue?: string;
  active?: boolean;
  bookmark?: boolean;
  children?: Menu[];
}

@Injectable({
  providedIn: 'root'
})
export class NavService {
  public screenWidth: any;
  public collapseSidebar: boolean = false;

  constructor(@Inject(WINDOW) private window) {
    this.onResize();
    if (this.screenWidth < 991) {
      this.collapseSidebar = true;
    }
  }

  // Windows width
  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenWidth = window.innerWidth;
  }

  MENUITEMS: Menu[] = [
    {
      path: '/dashboard/default',
      title: 'Dashboard',
      icon: 'home',
      type: 'link',
      badgeType: 'primary',
      active: false
    },
    {
      path: '/dashboard/superadmin',
      title: 'Super Admin Dashboard',
      icon: 'home',
      type: 'link',
      badgeType: 'primary',
      active: false
    },
    {
      path: '/vendor-management/vendormanagement',
      title: 'Vendor Management',
      icon: 'box',
      type: 'link',
      active: false
    },
    {
      path: '/user-management/usermanagement',
      title: 'User Management',
      icon: 'box',
      type: 'link',
      active: false
    },
    {
      path: '/user-list/userlist',
      title: 'User List',
      icon: 'box',
      type: 'link',
      active: false
    },
    {
      path: '/vendor-registration/vendorregistration',
      title: 'Vendor Registration',
      icon: 'box',
      type: 'link',
      active: false
    },
    {
      path: '/vendor-list/vendorlist',
      title: 'Vendor List',
      icon: 'box',
      type: 'link',
      active: false
    },
    {
      path: '/vendor-Requested-list/vendorrequestedlist',
      title: 'Vendor Requested List',
      icon: 'box',
      type: 'link',
      active: false
    },
    {
      path: '/self-stuffing/selfstuffing',
      title: 'Self Stuffing',
      icon: 'box',
      type: 'link',
      active: false
    },
    {
      path: '/eseal-repo/esealrepo',
      title: 'Eseal Repo',
      icon: 'box',
      type: 'link',
      active: false
    },
    {
      path: '/eseal-list/eseallist',
      title: 'Eseal List',
      icon: 'box',
      type: 'link',
      active: false
    },
    {
      path: '/install-seal/installseal',
      title: 'Install Seal',
      icon: 'box',
      type: 'link',
      active: false
    },
    {
      path: '/install-seal-list/installseallist',
      title: 'Install Seal List',
      icon: 'box',
      type: 'link',
      active: false
    },
    {
      path: '/eseal-track/esealtrack',
      title: 'Eseal Track',
      icon: 'box',
      type: 'link',
      active: false
    },
    {
      path: '/tampered-seal/tamperedseal',
      title: 'Tampered Seal List',
      icon: 'box',
      type: 'link',
      active: false
    },
    // {
    //   path: '/draft-seal/draftseal',
    //   title: 'Draft Seal',
    //   icon: 'box',
    //   type: 'link',
    //   active: false
    // },
    {
      path: '/requisition/requisition',
      title: 'Requisition',
      icon: 'box',
      type: 'link',
      active: false
    },
    {
      path: '/profile/profile',
      title: 'Profile',
      icon: 'settings',
      type: 'link',
      active: false
    },
    {
      title: 'Logout',
      path: '/auth/login',
      icon: 'log-in',
      type: 'link',
      active: false
    }
  ];
  // Array
  items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
}
