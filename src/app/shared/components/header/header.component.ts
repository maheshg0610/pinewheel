import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NavService } from '../../service/nav.service';
import { PinwheelService } from '../../service/pinwheel.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public right_sidebar: boolean = false;
  public open: boolean = false;
  public openNav: boolean = false;
  public isOpenMobile : boolean;
  details:any;

  @Output() rightSidebarEvent = new EventEmitter<boolean>();

  constructor(public navServices: NavService, private service: PinwheelService) { }

  ngOnInit() {
    this.getnotificationdetails('Tempered', 'unseen')
  }

  collapseSidebar() {
    this.open = !this.open;
    this.navServices.collapseSidebar = !this.navServices.collapseSidebar
  }
  right_side_bar() {
    this.right_sidebar = !this.right_sidebar
    this.rightSidebarEvent.emit(this.right_sidebar)
  }

  openMobileNav() {
    this.openNav = !this.openNav;
  }

  
  getnotificationdetails(val1,val2) {
    this.service.notificationDetails(val1,val2).subscribe((res) => {
      if (res) {
        this.details = res.data;
      } else {
        alert(res.statusText);
      }
    },
      (err) => {
        console.log(err)
      })
  }

  updateStatus(val){
    this.service.updateNotificationDetails(val.nitificationId).subscribe((res) => {
      if (res) {

      } else {
        alert(res.statusText);
      }
    },
      (err) => {
        console.log(err)
      })

  }

  showAll() {
    this.getnotificationdetails('all','all')
  }


}
