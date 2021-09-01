import { Component, OnInit, ViewChild } from '@angular/core';
import * as chartData from '../../../shared/data/chart';
import { doughnutData, pieData } from '../../../shared/data/chart';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { orderDB } from '../../../shared/tables/vendor-eseal-request-list';
import { PinwheelService } from 'src/app/shared/service/pinwheel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-super-admin-dashboard',
  templateUrl: './super-admin-dashboard.component.html',
  styleUrls: ['./super-admin-dashboard.component.scss']
})
export class SuperAdminDashboardComponent implements OnInit {
  public order = [];
  public temp = [];
  public user:any;
  public details:any;
  showDropdown: boolean = false;

  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  constructor(private service: PinwheelService, private router: Router) {
    this.order = orderDB.list_order;
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.order = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getVendorList();
    this.getdashboardList();
  }

  onAction(row, type) {
    let payload = { "adminUserId": this.user.userId, "eSealRequestId": row['eSealRequestId'],"status" : type }
    this.service.adminAccept(payload).subscribe((res) => {
      if (res.status =="success") {
        this.getVendorList()
        this.getdashboardList()
        alert(res.statusText);
      } else {
        alert(res.statusText);
      }
    },
      (err) => {
        console.log(err)
      })
  }

  onTransfer(row) {
    this.service.rowDataTransfer = row;
    this.router.navigate(['eseal-transfer/esealtransfer']);
  }

  getVendorList() {
    this.service.vendoeListForActivation(this.user.userId).subscribe((res) => {
      if (res) {
        this.order = res.data;
      } else {
        alert(res.statusText);
      }
    },
      (err) => {
        console.log(err)
      })
  }

  getdashboardList() {
    this.service.adminDashboard(this.user.userId).subscribe((res) => {
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

  toggle() {
    this.showDropdown = !this.showDropdown;
  }

  action(val) {
    this.toggle() 
    if (val === 'installed') {
    //  this.this.order 
    }
    if (val === 'vendor') {

    }
    if (val === 'health') {

    }

  }
}
