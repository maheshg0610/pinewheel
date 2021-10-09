import { Component, } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NavService, Menu } from '../../service/nav.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  public menuItems: Menu[];
  public url: any;
  public fileurl: any;
  public user:any

  constructor(private router: Router, public navServices: NavService) {
    this.navServices.items.subscribe(menuItems => {
      this.menuItems = menuItems
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          menuItems.filter(items => {
            if (items.path === event.url)
              this.setNavActive(items)
            if (!items.children) return false
            items.children.filter(subItems => {
              if (subItems.path === event.url)
                this.setNavActive(subItems)
              if (!subItems.children) return false
              subItems.children.filter(subSubItems => {
                if (subSubItems.path === event.url)
                  this.setNavActive(subSubItems)
              })
            })
          })
        }
      })
    })
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user.roleName === 'SuperAdmin') {
      this.menuItems = this.menuItems.filter(x => x.title !== 'Dashboard' && x.title !== 'Self Stuffing'
        && x.title !== 'Install Seal' && x.title !== 'Install Seal List' && x.title !== 'Eseal Track' &&
        x.title !== 'Tampered Seal List' && x.title !== 'Draft Seal' && x.title !== 'Requisition' && x.title !==  'Vendor Registration')
    } else {
      this.menuItems = this.menuItems.filter(x => x.title !== 'Super Admin Dashboard' && x.title !== 'Vendor Registration' && x.title !=='Vendor Management'
        && x.title !== 'Vendor Requested List' && x.title !== 'Install Seal' && x.title !== 'Eseal Repo' && x.title !== 'User List' && x.title !== 'User Management' && x.title !== 'Vendor List' )
    }
  }

  // Active Nave state
  setNavActive(item) {
    this.menuItems.filter(menuItem => {
      if (menuItem != item)
        menuItem.active = false
      if (menuItem.children && menuItem.children.includes(item))
        menuItem.active = true
      if (menuItem.children) {
        menuItem.children.filter(submenuItems => {
          if (submenuItems.children && submenuItems.children.includes(item)) {
            menuItem.active = true
            submenuItems.active = true
          }
        })
      }
    })
  }

  // Click Toggle menu
  toggletNavActive(item) {
    if (!item.active) {
      this.menuItems.forEach(a => {
        if (this.menuItems.includes(item))
          a.active = false
        if (!a.children) return false
        a.children.forEach(b => {
          if (a.children.includes(item)) {
            b.active = false
          }
        })
      });
    }
    item.active = !item.active
  }

  //Fileupload
  readUrl(event: any) {
    if (event.target.files.length === 0)
      return;
    //Image upload validation
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    // Image upload
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.url = reader.result;
    }
  }

}
