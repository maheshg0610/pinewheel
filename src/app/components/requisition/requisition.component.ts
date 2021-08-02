import { Component, OnInit, ViewChild } from '@angular/core';
import { categoryDB } from '../../shared/tables/category';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { requisitionDB } from '../../shared/tables/requisition';
import { PinwheelService } from 'src/app/shared/service/pinwheel.service';
import { status } from 'src/app/shared/config/endpoint.config';

@Component({
  selector: 'app-requisition',
  templateUrl: './requisition.component.html',
  styleUrls: ['./requisition.component.scss']
})
export class RequisitionComponent implements OnInit {
  public order = [];
  public temp = [];
  public closeResult:string;
  public user:any;


  counter = 0;
  increment() {
    this.counter++;
  }
  decrement() {
    this.counter--;
  }




  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  constructor(private modalService: NgbModal, private service: PinwheelService) {
    this.order = requisitionDB.list_order;
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

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getVendorList()
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

  onAction(row, type) {
    console.log(row)
    let payload = { "adminUserId": this.user.userId, "eSealRequestId": row['eSealRequestId'], "status": type }
    this.service.adminAccept(payload).subscribe((res) => {
      if (res.status == "success") {
        this.getVendorList()
        alert(res.statusText);
      } else {
        alert(res.statusText);
      }
    },
      (err) => {
        console.log(err)
      })
  }

  submit() {
    let payload = {
      "vendorId": this.user.vendorId,
      "noOfEsealRequested": this.counter
    }
    this.service.newRequisition(payload).subscribe((res) => {
      if (res.status === status.SUCCESS) {
        //TODO:pop-up
        alert(res.statusText)
      } else {
        alert(res.statusText)
      }
    },
      (err) => {
        console.log(err)
      })

  }
}
