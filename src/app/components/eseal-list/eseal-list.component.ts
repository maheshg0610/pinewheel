import { Component, OnInit, ViewChild } from '@angular/core';
import { categoryDB } from '../../shared/tables/category';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { vendorlistDB } from '../../shared/tables/vendor-list';
import { Router } from '@angular/router';
import { PinwheelService } from 'src/app/shared/service/pinwheel.service';
export class Page {
  // The number of elements in the page
  size: number = 0;
  // The total number of elements
  totalElements: number = 0;
  // The total number of pages
  totalPages: number = 0;
  // The current page number
  pageNumber: number = 0;
}
@Component({
  selector: 'app-eseal-list',
  templateUrl: './eseal-list.component.html',
  styleUrls: ['./eseal-list.component.scss']
})
export class EsealListComponent implements OnInit {
  public order = [];
  public temp = [];
  public closeResult:string;


  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  page = new Page();
  constructor(private modalService: NgbModal, private router: Router, private service:PinwheelService) {
    this.page.pageNumber = 0;
    this.page.size = 6;
  }
  

  ngOnInit() {
    this.getinstallSealList(this.page.pageNumber, this.page.size)
    this.setPage({ offset: 0 });
  }

  getinstallSealList(pageNo, size) {
    this.service.esealList(pageNo,size).subscribe((res) => {
      if (res) {
        this.order = res.seaList;
        this.page.totalPages = res.totalPages;
        this.page.totalElements = res.totalItems;
      }
    },
      (err) => {
        console.log(err)
      })
  }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.order = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  openDetails(event) {
    this.service.updateSearchResults.next(event);
    this.router.navigate(['/vendor-registration/vendorregistration']);
  }

  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;
    this.getinstallSealList(this.page.pageNumber, this.page.size)
  }

}
