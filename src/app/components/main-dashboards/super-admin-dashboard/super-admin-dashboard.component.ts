import { Component, OnInit, ViewChild } from '@angular/core';
import * as chartData from '../../../shared/data/chart';
import { doughnutData, pieData } from '../../../shared/data/chart';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { orderDB } from '../../../shared/tables/vendor-eseal-request-list';

@Component({
  selector: 'app-super-admin-dashboard',
  templateUrl: './super-admin-dashboard.component.html',
  styleUrls: ['./super-admin-dashboard.component.scss']
})
export class SuperAdminDashboardComponent implements OnInit {
  public order = [];
  public temp = [];

  @ViewChild(DatatableComponent, { static: true }) table: DatatableComponent;
  constructor() {
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

  ngOnInit() {}
}
