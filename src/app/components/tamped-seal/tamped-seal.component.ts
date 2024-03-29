import { Component, OnInit, ViewChild } from '@angular/core';
import { categoryDB } from '../../shared/tables/category';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { vendorlistDB } from '../../shared/tables/vendor-list';
import { Router } from '@angular/router';
import { PinwheelService } from 'src/app/shared/service/pinwheel.service';

@Component({
  selector: 'app-tamped-seal',
  templateUrl: './tamped-seal.component.html',
  styleUrls: ['./tamped-seal.component.scss']
})
export class TampedSealComponent implements OnInit {
  public order = [];
  public temp = [];
  public closeResult:string;


  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  constructor(private modalService: NgbModal, private router: Router, private service:PinwheelService) {
    //this.order = vendorlistDB.list_order;
  }
  

  ngOnInit() {
    this.getTemperedList()
  }

  getTemperedList() {
    this.service.notificationDetails('Tempered', 'all').subscribe((res) => {
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


}
