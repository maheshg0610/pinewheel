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
      path: '/self-stuffing/selfstuffing',
      title: 'Self Stuffing',
      icon: 'box',
      type: 'link',
      active: false
    },
    {
      path: '/requisition/requisition',
      title: 'Requisition',
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
      path: '/draft-seal/draftseal',
      title: 'Draft Seal',
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
